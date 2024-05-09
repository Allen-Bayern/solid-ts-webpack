import { type ParentComponent } from 'solid-js';
import styles from './_style.module.scss';

const HomeView: ParentComponent = () => {
    return <div class={styles.homeView}>Hello world</div>;
};

export default HomeView;
