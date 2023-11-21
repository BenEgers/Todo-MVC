import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from '../main/main.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

}
