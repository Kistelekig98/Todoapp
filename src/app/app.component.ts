import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from './todo/todo.model';
import { add } from './todo/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  title = 'Todolist';
  mobileQuery: MediaQueryList;
  
  private _mobileQueryListener: () => void;

  constructor(private store: Store<{ todos: Array<Todo> }>, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  add(text: string) {
    this.store.dispatch(add({ text: text }));
  }
}
