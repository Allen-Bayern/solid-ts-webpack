import { createEffect, type ParentComponent } from 'solid-js';
import { createTitle, createSet } from '@/utils';
import styles from './_style.module.scss';

const HomeView: ParentComponent = () => {
    createTitle('HomeView', 'solid-ts-webpack-starter');

    const [testSet, testSetMethods] = createSet<number>();

    const addToSet = () => {
        const { random, floor } = Math;

        const randomInt = floor(100 * random());
        testSetMethods.add(randomInt);
    };

    createEffect(() => {
        console.log(testSet());
    });

    return (
        <div class={styles.homeView}>
            <p class={styles.homeViewValLabel}>
                <span class={styles.homeViewValLabel}>The current value of set is: </span>
                <span class={styles.homeViewValValue}>{String(Array.from(testSet()))}</span>
            </p>
            <button
                class={styles.homeViewBtn}
                type="button"
                onClick={addToSet}
            >
                Add Set
            </button>
        </div>
    );
};

export default HomeView;
