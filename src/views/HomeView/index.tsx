import { createEffect, type ParentComponent } from 'solid-js';
import { createTitle } from '@/utils';
import styles from './style.module.less';

const HomeView: ParentComponent = () => {
    createTitle('HomeView', 'solid-ts-webpack-starter');

    createEffect(() => {
        console.log(styles);
    });

    return <div>hello world</div>;
};

export default HomeView;
