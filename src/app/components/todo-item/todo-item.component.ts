import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInterface } from 'src/app/types/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0)
    }
  }
  todoService = inject(TodoService);
  @Input({required: true}) todo!: TodoInterface;
  @Input({required: true}) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('textInput') textInput? : ElementRef

  editingText: string = '';
  
  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }
  
  changeTodo():void {
    this.todoService.changeTodo( this.todo.id ,this.editingText);
    this.setEditingId.emit(null)
  };
  removeTodo(): void {
    this.todoService.removeTodo(this.todo.id);
  }
  
  setTodoEditMode():void {
    this.setEditingId.emit(this.todo.id)
    
  }
  
  ngOnInit(): void {
    this.editingText = this.todo.text; 
  }
  
  toggleTodo(): void {
  this.todoService.toggleTodo(this.todo.id);
  }
}
