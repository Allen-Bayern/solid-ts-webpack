import { createSignal, type SignalOptions } from 'solid-js';
import { isEqual } from 'lodash';
import { produce, freeze as immerFreeze } from 'immer';
import { numberEqual } from '../number-equal';

type Updater<T> = (draft: T) => void;

/** @description shallow equal comparator inspired by React */
const shallowEqual = <T>(prev: T, nextValue: T): boolean => {
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

            let res = true;

            if (isEqual(prevKeys, nextKeys)) {
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

export interface CreateImmerOptions<T = unknown> extends SignalOptions<T> {
    isDeep?: boolean;
}

/**
 * @description translate a hook used by `React` -- `useImmer`,  to `createImmer` for `Solid.js`
 * @param v the value
 * @param opts the options of `createImmer`.
 * Besides the options of `createSignal`, another one `isDeep` is also supported,
 * which means that you can decide to use the deep equality function.
 *
 * - If you realise the `equals` method by yourself, this option will not be effect.
 * - If the `isDeep` is `false`, which is by default, the `equal` will be the shallow equal function inspired by `React`.
 * - If the option is `true`, the `isEqual` from `lodash` will be taken as the deep equal method.
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

    const [state, setState] = createSignal(immerFreeze(v, true), {
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
