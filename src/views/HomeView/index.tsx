import { createEffect, type ParentComponent } from 'solid-js';
import { createImmer, createTitle, createInterval } from '@/utils';
import styles from './_style.module.scss';

const HomeView: ParentComponent = () => {
    createTitle('Solid.js测试', 'Solid.js starter');

    const [clearInter] = createInterval(() => {
        console.log('Hello World!');
    }, 1000);

    const [obj, updateObj] = createImmer({
        hello: 0,
    });

    const toAddHello = () => {
        updateObj(draft => {
            draft.hello += 1;
        });

        clearInter();
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
