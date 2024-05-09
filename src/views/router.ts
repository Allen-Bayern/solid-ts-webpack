import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

/** @description router list */
export const routerList: RouteDefinition[] = [
    {
        path: '/',
        component: lazy(() => import('./HomeView/index')),
    },
];
