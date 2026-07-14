export interface ChanceResult {
  percentage: number;        // 0-100
  label: 'AMAN' | 'BERSAING' | 'PELUANG_CUKUP' | 'SULIT' | 'SANGAT_SULIT';
  deficit: number;           // Selisih skor (positif = di atas, negatif = di bawah)
  weakSubjects: string[];    // Subject yang perlu diperbaiki
  recommendation: string;    // AI-generated advice
}

/**
 * Sigmoid-based chance calculator.
 *
 * Instead of hard linear buckets, we use a logistic (sigmoid) function
 * centered around the major's estimatedScore. This creates smooth,
 * realistic probability transitions.
 *
 * The competitiveness ratio is integrated directly into the curve
 * steepness — higher competition = steeper drop-off around the threshold.
 */
export function calculateChance(
  studentScore: number,       // Skor IRT scaled (200-800)
  majorEstimated: number,     // estimatedScore dari DB
  competitiveness: number     // applicants / quota
): ChanceResult {
  const deficit = studentScore - majorEstimated;

  // --- Sigmoid-based percentage ---
  // k = steepness factor, influenced by competitiveness
  // Higher competition → steeper curve → small score differences matter more
  const baseK = 0.04; // Base steepness
  const compFactor = 1 + Math.log10(Math.max(1, competitiveness)) * 0.5;
  const k = baseK * compFactor;

  // Logistic function: P(x) = 1 / (1 + e^(-k*(x - threshold)))
  // We shift the midpoint so that scoring exactly at estimatedScore ≈ 40%
  // (because even matching the score doesn't guarantee admission)
  const midpointShift = majorEstimated * 0.02; // Shift midpoint slightly above estimated
  const rawProbability = 1 / (1 + Math.exp(-k * (studentScore - majorEstimated - midpointShift)));

  // Scale to percentage (5-95 range, never 0% or 100%)
  let percentage = 5 + rawProbability * 90;

  // Additional penalty for extreme competition (>20:1)
  if (competitiveness > 20) {
    const extremePenalty = Math.min(0.3, (competitiveness - 20) * 0.01);
    percentage *= (1 - extremePenalty);
  }

  // Clamp to realistic range
  percentage = Math.round(Math.min(95, Math.max(3, percentage)));

  // --- Label assignment based on actual percentage ---
  // Labels are derived FROM percentage, not the other way around
  // This ensures consistency: 15% can never be "AMAN"
  let label: ChanceResult['label'];

  if (percentage >= 65) {
    label = 'AMAN';
  } else if (percentage >= 45) {
    label = 'BERSAING';
  } else if (percentage >= 30) {
    label = 'PELUANG_CUKUP';
  } else if (percentage >= 15) {
    label = 'SULIT';
  } else {
    label = 'SANGAT_SULIT';
  }

  return {
    percentage,
    label,
    deficit: Math.round(deficit),
    weakSubjects: [], // Populated by analytics service
    recommendation: '' // Populated by AI service
  };
}

/**
 * Validate that a recommendation's chance result matches the expected type.
 * Returns true if the result is appropriate for the given AI recommendation type.
 */
export function isValidForType(
  aiType: 'Aman' | 'Sesuai' | 'Tantangan',
  chance: ChanceResult
): boolean {
  switch (aiType) {
    case 'Aman':
      return chance.percentage >= 40;
    case 'Sesuai':
      return chance.percentage >= 10 && chance.percentage <= 70;
    case 'Tantangan':
      return chance.percentage >= 3 && chance.percentage <= 35;
    default:
      return true;
  }
}
