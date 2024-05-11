/**
 * @description The best comparison method of two numbers.
 * @param num1 number 1
 * @param num2 number 2
 * @returns The comparison result of the two numbers.
 */
export function numberEqual(num1: number, num2: number): boolean {
    if (Number.isNaN(num1) && Number.isNaN(num2)) {
        return true;
    }

    return num1 === num2;
}
