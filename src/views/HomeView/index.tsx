import { type Component } from 'solid-js';
import { createTitle } from '@/utils';

const HomeView: Component = () => {
    createTitle('HomeView', 'solid-ts-webpack-starter');
    return <div>hello world</div>;
};

export default HomeView;
