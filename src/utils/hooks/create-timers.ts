import { createEffect, onCleanup } from 'solid-js';

/**
 * @description A hook for `setTimeout`
 * @param method The function inside the `setTimeout`
 * @param wait The wait time of `setTimeout`
 * @returns An array, the first element is the timer cleaner function, the second one is the timer self
 */
export const createTimeout = (method: () => void, wait = 0) => {
    /** @description timer self */
    let timer: ReturnType<typeof setTimeout> = 0;

    /** @description clear function */
    const cleaner = () => {
        if (timer) {
            clearTimeout(timer);
        }
    };

    createEffect(() => {
        timer = setTimeout(method, wait);
    });
    onCleanup(cleaner);

    return [cleaner, timer] as const;
};

/**
 * @description A hook for `setInterval`
 * @param method The function inside the `setInterval`
 * @param wait The wait time of `setInterval`
 * @returns An array, the first element is the timer cleaner function, the second one is the timer self
 */
export const createInterval = (method: () => void, wait = 0) => {
    /** @description timer self */
    let timer: ReturnType<typeof setTimeout> = 0;

    /** @description clear function */
    const cleaner = () => {
        if (timer) {
            clearInterval(timer);
        }
    };

    createEffect(() => {
        timer = setInterval(method, wait);
    });
    onCleanup(cleaner);

    return [cleaner, timer] as const;
};
