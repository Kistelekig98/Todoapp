import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { perform, myDelete, edit } from './todo.actions';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {
  todos$: Observable<Array<Todo>>;

  constructor(private store: Store<{ todos: Array<Todo> }>) {
    this.todos$ = store.pipe(select('todos'));
  }

  perform(id: number) {
  	this.store.dispatch(perform({ id: id }));
  }

  delete(id: number) {
    this.store.dispatch(myDelete({ id: id }));
  }

  edit(id: number, text: string) {
    this.store.dispatch(edit({ id: id, text: text }));
  }
}
