export interface ChanceResult {
  percentage: number;        // 0-100
  label: 'AMAN' | 'BERSAING' | 'SULIT' | 'SANGAT_SULIT';
  deficit: number;           // Selisih skor
  weakSubjects: string[];    // Subject yang perlu diperbaiki
  recommendation: string;    // AI-generated advice
}

export function calculateChance(
  studentScore: number,       // Skor IRT scaled (200-800)
  majorEstimated: number,     // estimatedScore dari DB
  competitiveness: number     // applicants / quota
): ChanceResult {
  const deficit = studentScore - majorEstimated;
  const ratio = studentScore / majorEstimated;

  let percentage: number;
  let label: ChanceResult['label'];

  if (ratio >= 1.1) {
    percentage = Math.min(95, 80 + (ratio - 1.1) * 100);
    label = 'AMAN';
  } else if (ratio >= 1.0) {
    percentage = 60 + (ratio - 1.0) * 200;
    label = 'BERSAING';
  } else if (ratio >= 0.9) {
    percentage = 30 + (ratio - 0.9) * 300;
    label = 'SULIT';
  } else {
    percentage = Math.max(5, ratio * 30);
    label = 'SANGAT_SULIT';
  }

  // Faktor keketatan: semakin ketat, peluang turun
  const ketatFactor = Math.max(0.5, 1 - (competitiveness - 5) * 0.05);
  percentage *= ketatFactor;

  return {
    percentage: Math.round(Math.min(95, Math.max(5, percentage))),
    label,
    deficit: Math.round(deficit),
    weakSubjects: [], // To be populated by analytics service
    recommendation: '' // To be populated by AI service
  };
}
