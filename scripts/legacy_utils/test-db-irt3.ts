import { estimateTheta } from "./src/lib/irt/scoring";

export function estimateThetaFixed(responses: {difficulty: number, correct: boolean}[]): number {
  if (responses.length === 0) return 0.0;
  
  let theta = 0.0; // Initial estimate
  const MAX_ITER = 50;
  const TOLERANCE = 0.001;

  const allCorrect = responses.every(r => r.correct);
  const allIncorrect = responses.every(r => !r.correct);
  
  if (allCorrect) return 5.0; 
  if (allIncorrect) return -5.0; 

  for (let i = 0; i < MAX_ITER; i++) {
    let sumResidual = 0;
    let sumInfo = 0;

    for (const r of responses) {
      const p = 1 / (1 + Math.exp(-(theta - r.difficulty)));
      sumResidual += (r.correct ? 1 : 0) - p;
      sumInfo += p * (1 - p);
    }

    if (sumInfo === 0) break;

    let delta = sumResidual / sumInfo;
    delta = Math.max(-1.0, Math.min(1.0, delta)); // CAPPED
    theta += delta;

    if (Math.abs(delta) < TOLERANCE) break;
  }

  return Math.max(-3, Math.min(3, theta));
}

import fs from "fs";
const irtInputs = JSON.parse(fs.readFileSync("inputs.json", "utf-8"));
console.log("Fixed Theta:", estimateThetaFixed(irtInputs));
