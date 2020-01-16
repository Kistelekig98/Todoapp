import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo } from './todo.model';

export const initialState: Array<Todo> = [
  { id: 0, isCompleted: false, text: "Lorem ipsum" },
  { id: 1, isCompleted: false, text: "Dolor sit amet" },
  { id: 2, isCompleted: false, text: "Consectetur" }
];

const _todoReducer = createReducer(initialState,
  on(TodoActions.perform, (state, { id }) => {
    var newState = state;

    if(state[state.findIndex(todo => todo.id == id)].isCompleted == true) {
      newState[newState.findIndex(todo => todo.id == id)].isCompleted = false;
    }
    else {
      newState[newState.findIndex(todo => todo.id == id)].isCompleted = true;
    }

    return sortTodos(newState);
  }),

  on(TodoActions.add, (state, { text }) => {
    var newState = state;
    var nextId = 0;

    if(newState.length > 0) {
      nextId = newState.sort((a, b) => b.id - a.id)[0].id + 1;
    }

    newState.push({ id: nextId, isCompleted: false, text: text });

    return sortTodos(newState);
  }),

  on(TodoActions.myDelete, (state, { id }) => {
    var newState = state.filter(todo => todo.id != id);
    return sortTodos(newState);
  }),

  on(TodoActions.edit, (state, { id, text }) => {
    var newState = state;
    var id = newState.findIndex(todo => todo.id == id);
    
    newState[id].text = text;

    return state;
  })
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}

function sortByCompletion(array: Array<Todo>): Array<Todo> {
  return array.sort((a, b) => {
    if(a.isCompleted == b.isCompleted) {
      return 0;
    }
    if(a.isCompleted == false && b.isCompleted == true) {
      return -1;
    }
    return 1;
  });
}

function sortTodos(array: Array<Todo>): Array<Todo> {
  return sortByCompletion(array).sort((a, b) => {
    if(a.isCompleted == b.isCompleted) {
      return a.id - b.id;
    }
    return 0;
  });
}
