import { render } from 'solid-js/web';
import App from './App';

/** @description main function */
function main() {
    const dom = document.getElementById('app');
    const injectedDom = dom ? dom : document.body;

    return render(() => <App />, injectedDom);
}

main();
