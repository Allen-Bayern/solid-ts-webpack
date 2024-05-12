import { createSignal } from 'solid-js';

export function createSet<T>(initSet: Set<T> | null = null) {
    const initValue = initSet ? initSet : new Set<T>();

    const [setValue, setSetValue] = createSignal(initValue);

    const methods = {
        add(v: T) {
            setSetValue(oldSet => {
                const newSet = new Set(oldSet);
                newSet.add(v);
                return newSet;
            });
        },
        remove(v: T) {
            setSetValue(oldSet => {
                const newSet = new Set(oldSet);
                newSet.delete(v);
                return newSet;
            });
        },
        delete(v: T) {
            setSetValue(oldSet => {
                const newSet = new Set(oldSet);
                newSet.delete(v);
                return newSet;
            });
        },
        has(v: T) {
            return setValue().has(v);
        },
        toggle(v: T) {
            const val = setValue();

            if (val.has(v)) {
                setSetValue(oldSet => {
                    const newSet = new Set(oldSet);
                    newSet.delete(v);
                    return newSet;
                });
            } else {
                setSetValue(oldSet => {
                    const newSet = new Set(oldSet);
                    newSet.add(v);
                    return newSet;
                });
            }
        },
        reset() {
            setSetValue(new Set(initValue));
        },
        clear() {
            setSetValue(new Set<T>());
        },
    };

    return [setValue, methods] as const;
}
