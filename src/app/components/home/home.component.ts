import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { UsersService } from '../../services/users.service';
import { UsersData } from '../../interfaces/users-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userList : UsersData[] = []
  usersService : UsersService = inject(UsersService) 

  constructor(){
    this.usersService.getAllUsers().then((userList : UsersData[])=>this.userList = userList);
  }
}