import { createSignal, type SignalOptions } from 'solid-js';
import { isEqual } from 'lodash';
import { produce, freeze as immerFreeze, enableMapSet } from 'immer';
import { shallowEqual } from '../shallow-equal';

type Updater<T> = (draft: T) => void;

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
    enableMapSet();
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
