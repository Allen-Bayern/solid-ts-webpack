import { createEffect, type ParentComponent } from 'solid-js';
import { createImmer } from '@/hooks';
import styles from './_style.module.scss';

const HomeView: ParentComponent = () => {
    const [obj, updateObj] = createImmer({
        hello: 0,
    });

    const toAddHello = () => {
        updateObj(draft => {
            draft.hello += 1;
        });
    };

    createEffect(() => {
        console.log(obj());
    });

    return (
        <div class={styles.homeView}>
            <p>Hello world</p>
            <button
                type="button"
                onClick={toAddHello}
            >
                +1
            </button>
            <p>{obj().hello}</p>
        </div>
    );
};

export default HomeView;
