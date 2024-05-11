import { onMount, onCleanup } from 'solid-js';

/**
 * @description to use `document.title`
 * @param title the title you want to set
 * @param defaultTitle the default title
 */
export const createDocumentTitle = (title = '', defaultTitle = ''): void => {
    let isSetTitle = false;

    onMount(() => {
        if (title) {
            document.title = title;
            isSetTitle = true;
        }
    });

    onCleanup(() => {
        if (isSetTitle) {
            document.title = defaultTitle;
        }
    });
};

/** @description to use `document.title`, an alias of `createDocumentTitle` */
export const createTitle = createDocumentTitle;
