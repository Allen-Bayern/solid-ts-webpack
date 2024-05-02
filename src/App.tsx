import { type ParentComponent } from 'solid-js';
import './_App.scss';

/**
 * @description Main component.
 * If you are using TypeScript to write component,
 * take this as a best practice.
 * The type of the component should be `ParentComponent`.
 */
const App: ParentComponent = () => {
    return <div class="hello">hello world</div>;
};

export default App;
