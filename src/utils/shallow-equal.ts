import { numberEqual } from './number-equal';

/** @description shallow equal comparator inspired by React */
export const shallowEqual = <T>(prev: T, nextValue: T): boolean => {
    if (typeof prev === 'number' && typeof nextValue === 'number') {
        return numberEqual(prev, nextValue);
    }

    // Comparison of two arrays
    const { isArray } = Array;
    if (isArray(prev) && isArray(nextValue)) {
        if (prev.length !== nextValue.length) {
            return false;
        }

        let res = true;

        const { length: listLength } = prev;
        for (let i = 0; i < listLength; i++) {
            const currentPrev = prev[i];
            const currentNext = nextValue[i];

            if (typeof currentPrev === 'number' && typeof currentNext === 'number') {
                res = numberEqual(currentPrev, currentNext);
            } else {
                res = Object.is(currentPrev, currentNext);
            }

            if (!res) {
                break;
            }
        }

        return res;
    }

    if (typeof prev === 'object' && typeof nextValue === 'object') {
        if (prev !== null && nextValue !== null) {
            const prevKeys = [...Object.keys(prev), ...Object.getOwnPropertySymbols(prev)];
            const nextKeys = [...Object.keys(nextValue), ...Object.getOwnPropertySymbols(nextValue)];

            const publicKeys = Array.from(new Set([...prevKeys, ...nextKeys]));

            let res = true;

            if (prevKeys.length === publicKeys.length && nextKeys.length === publicKeys.length) {
                // iter the keys
                for (const currentKey of prevKeys) {
                    const currentPrev = prev[currentKey as keyof T];
                    const currentNext = nextValue[currentKey as keyof T];

                    if (typeof currentPrev === 'number' && typeof currentNext === 'number') {
                        res = numberEqual(currentPrev, currentNext);
                    } else {
                        res = Object.is(currentPrev, currentNext);
                    }

                    // If `false` is met, break the iteration.
                    if (!res) {
                        break;
                    }
                }
            } else {
                res = false;
            }

            return res;
        }
    }

    return Object.is(prev, nextValue);
};
