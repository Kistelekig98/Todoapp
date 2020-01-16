import { createAction, props } from '@ngrx/store';

export const perform = createAction(
    '[Todos Component] Perform', 
    props<{ id: number }>()
);

export const add = createAction(
    '[Todos Component] Add',
    props<{ text: string }>()
);

export const myDelete = createAction(
    '[Todos Component] myDelete',
    props<{ id: number }>()
);

export const edit = createAction(
    '[Todos Component] Edit',
    props<{ id: number, text: string }>()
)
