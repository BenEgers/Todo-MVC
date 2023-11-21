import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';
import { FilterEnum } from 'src/app/types/filter.enum';
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    imports: [CommonModule, TodoItemComponent]
})
export class MainComponent {
  todoService = inject(TodoService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todoService.todosSign()
    const filter = this.todoService.filterSign()
    if(filter === FilterEnum.active){
      return todos.filter((todo) => !todo.isCompleted)
    } else if(filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  })

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  noTodosClass = computed(() => {
    return this.todoService.todosSign().length === 0;
  })
  
  isAllTodoSelected = computed(() => this.todoService.todosSign().every((todo) => todo.isCompleted));

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }


}
