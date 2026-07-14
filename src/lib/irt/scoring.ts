export function estimateTheta(responses: {difficulty: number, correct: boolean}[]): number {
  if (responses.length === 0) return 0.0;
  
  let theta = 0.0; // Initial estimate
  const MAX_ITER = 50;
  const TOLERANCE = 0.001;

  // Handle edge cases (all correct or all incorrect)
  const allCorrect = responses.every(r => r.correct);
  const allIncorrect = responses.every(r => !r.correct);
  
  if (allCorrect) return 5.0; // Special value for max ability
  if (allIncorrect) return -5.0; // Special value for min ability

  for (let i = 0; i < MAX_ITER; i++) {
    let sumResidual = 0;  // First derivative
    let sumInfo = 0;      // Fisher information (second derivative)

    for (const r of responses) {
      const p = 1 / (1 + Math.exp(-(theta - r.difficulty)));
      sumResidual += (r.correct ? 1 : 0) - p;   // observed - expected
      sumInfo += p * (1 - p);                     // information
    }

    if (sumInfo === 0) break; // Avoid division by zero

    const delta = sumResidual / sumInfo;
    theta += delta;

    if (Math.abs(delta) < TOLERANCE) break;
  }

  return Math.max(-3, Math.min(3, theta)); // Clamp normal scores to [-3, 3]
}

export function scaleToSNBT(theta: number, config?: { mean: number, sd: number }): number {
  if (theta === -5.0) return 0;
  if (theta === 5.0) return 1000;
  
  // Linear transform: θ ∈ [-3, 3] → score ∈ [200, 800]
  const mean = config?.mean ?? 500;
  const sd = config?.sd ?? 100;
  
  const score = mean + (theta * sd);
  return Math.max(0, Math.min(1000, Math.round(score)));
}
