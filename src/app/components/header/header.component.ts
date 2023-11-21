import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  todoService = inject(TodoService);

  text: string = '';

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement
    this.text = target.value;
  }

  addTodo(): void{
    this.todoService.addTodo(this.text);
    console.log(this.text)
    this.text = ''
 }
}
