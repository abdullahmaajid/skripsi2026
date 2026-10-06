import { estimateTheta } from "./src/lib/irt/scoring";

const inputs = [];
for (let i = 0; i < 17; i++) inputs.push({ difficulty: 0.0, correct: true }); 
for (let i = 0; i < 1; i++) inputs.push({ difficulty: 0.0, correct: false }); 

console.log("Theta 17/18:", estimateTheta(inputs));
