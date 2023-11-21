import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  
  constructor() { }
  
  todosSign = signal<TodoInterface[]>([]);
  filterSign = signal<FilterEnum>(FilterEnum.all);
  
  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16)
    }
    
    this.todosSign.update(prevTodos => [...prevTodos, newTodo]);
  }
  
  changeFilter(filterName: FilterEnum): void {
    this.filterSign.set(filterName);
  }
  
  changeTodo(id: string, text: string): void {
    this.todosSign.update(todos => todos.map(todo => todo.id === id ? {...todo, text} : todo))
  }
  removeTodo(id: string): void {
    this.todosSign.update(todos => todos.filter(todo => todo.id !== id))

  }

  toggleTodo(id: string): void{
    this.todosSign.update((todos) => 
      todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
    )
  }

  toggleAll(isCompleted: boolean) : void {
    this.todosSign.update((todos) => 
      todos.map(todo => ({...todo, isCompleted}))
    )
  }
}
