import { createSignal, type SignalOptions } from 'solid-js';
import { isEqual, uniq } from 'lodash';
import { produce, freeze as immerFreeze } from 'immer';

type Updater<T> = (draft: T) => void;

/** @description Rewrite the equal function of number */
const numberEqual = (num1: number, num2: number): boolean => {
    if (Number.isNaN(num1) && Number.isNaN(num2)) {
        return true;
    }

    return num1 === num2;
};

/** @description shallow equal comparator inspired by React */
const shallowEqual = <T>(prev: T, nextValue: T): boolean => {
    if (typeof prev === 'number' && typeof nextValue === 'number') {
        return numberEqual(prev, nextValue);
    }

    if (typeof prev === 'object' && typeof nextValue === 'object') {
        if (prev !== null && nextValue !== null) {
            const prevKeys = [...Object.keys(prev), ...Object.getOwnPropertySymbols(prev)];
            const nextKeys = [...Object.keys(nextValue), ...Object.getOwnPropertySymbols(nextValue)];

            const publicKeys = uniq([...prevKeys, ...nextKeys]);
            if (publicKeys.length !== prevKeys.length || prevKeys.length !== nextKeys.length) {
                return false;
            }

            let res = true;

            // iter the keys
            for (const currentKey of publicKeys) {
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

            return res;
        }
    }

    return Object.is(prev, nextValue);
};

interface CreateImmerOptions<T = unknown> extends SignalOptions<T> {
    isDeep?: boolean;
}

/**
 * @description translate a hook used by `React` -- `useImmer`,  to `createImmer` for `Solid.js`
 * @param v the value
 */
export function createImmer<T = unknown>(
    v: T,
    opts: CreateImmerOptions<T> = {
        isDeep: false,
    }
) {
    const { isDeep = false, ...restOpts } = opts;

    const { equals: selfEquals } = restOpts;
    /** @description to decide which equal function to take */
    const getEquals = () => {
        if (selfEquals) {
            return selfEquals;
        }

        if (isDeep) {
            return isEqual;
        }

        return shallowEqual;
    };

    const [state, setState] = createSignal(immerFreeze(v), {
        ...restOpts,
        equals: getEquals(),
    });

    const updater = (updater: T | Updater<T>) => {
        if (typeof updater === 'function') {
            setState(oldState => produce(oldState, updater as Updater<T>));
        } else {
            setState(oldState => (updater === oldState ? oldState : updater));
        }
    };

    return [state, updater] as const;
}
