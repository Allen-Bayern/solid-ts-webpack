import { type ParentComponent } from 'solid-js';
import { HashRouter } from '@solidjs/router';
import { routerList } from './views/router';

/**
 * @description Main component.
 * If you are using TypeScript to write component,
 * take this as a best practice.
 * The type of the component should be `ParentComponent`.
 */
const App: ParentComponent = () => {
    return <HashRouter>{routerList}</HashRouter>;
};

export default App;
