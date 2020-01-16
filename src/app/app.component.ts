import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from './todo/todo.model';
import { add } from './todo/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Todolist';

  constructor(private store: Store<{ todos: Array<Todo> }>) {
  }

  add(text: string) {
    this.store.dispatch(add({ text: text }));
  }
}
