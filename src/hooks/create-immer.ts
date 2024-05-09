import { createSignal } from 'solid-js';
import { produce, freeze as immerFreeze } from 'immer';

type Updater<T> = (draft: T) => void;

/** @description translate `useImmer` (React) to `crateImmer` for updating object  */
export function createImmer<T = unknown>(v: T) {
    const [state, setState] = createSignal(immerFreeze(v));

    const updater = (updater: T | Updater<T>) => {
        if (typeof updater === 'function') {
            setState(() => produce(state(), updater as Updater<T>));
        } else {
            setState(() => updater);
        }
    };

    return [state, updater] as const;
}
