import { createSignal } from 'solid-js';
import { produce, freeze as immerFreeze } from 'immer';

type Updater<T> = (draft: T) => void;

/**
 * @description translate a hook used by `React` -- `useImmer`,  to `createImmer` for `Solid.js`
 * @param v the value
 */
export function createImmer<T = unknown>(v: T) {
    const [state, setState] = createSignal(immerFreeze(v));

    const updater = (updater: T | Updater<T>) => {
        if (typeof updater === 'function') {
            setState(oldState => produce(oldState, updater as Updater<T>));
        } else {
            setState(oldState => (updater === oldState ? oldState : updater));
        }
    };

    return [state, updater] as const;
}
