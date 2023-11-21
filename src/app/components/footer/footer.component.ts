import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';
import { FilterEnum } from 'src/app/types/filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  todoService = inject(TodoService);
  filter = this.todoService.filterSign();
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.todoService.todosSign().filter((todo) => !todo.isCompleted).length
  });

  noTodosClass = computed(() => {
    return this.todoService.todosSign().length === 0;
  })

  itemsLeftText = computed(() => {
    return `item${this.activeCount() !== 1 ? 's' : ''} left`
  })

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filterName);
  }


}
