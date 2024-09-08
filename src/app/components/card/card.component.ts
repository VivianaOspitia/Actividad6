import { Component, Input } from '@angular/core';
import { UsersData } from '../../interfaces/users-data';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() datos: UsersData = { id: 0, first_name: '', last_name: '',username: '',email: '', image: ''};
}
