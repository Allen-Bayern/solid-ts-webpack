import { onMount, onCleanup } from 'solid-js';

/** @description to use `document.title` */
export const createDocumentTitle = (title = ''): void => {
    let isSetTitle = false;

    onMount(() => {
        if (title) {
            document.title = title;
            isSetTitle = true;
        }
    });

    onCleanup(() => {
        if (isSetTitle) {
            document.title = '';
        }
    });
};

/** @description to use `document.title`, an alias of `createDocumentTitle` */
export const createTitle = createDocumentTitle;
