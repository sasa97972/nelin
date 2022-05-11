import { evaluate } from "mathjs";

export const createFrequencyArray = (start, end, step) => {
    const result = [];
    for (let i = start; i <= end; i = evaluate(`${i} + ${step}`)) {
        result.push(Number.parseFloat(i.toPrecision(3)));
    }
    return result;
}
