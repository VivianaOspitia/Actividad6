import { Component, Input, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersData } from '../../interfaces/users-data';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  user : UsersData |undefined;
  usersService : UsersService = inject(UsersService) 

  @Input()
  set id(heroId: number) {
     console.log("*********************ingresa al input")
     this.usersService.getUserFromList(this.id).then((fetchUser=> this.user= fetchUser);
  }

  startDelete(id: number) {
    Swal.fire({
      title: '¿Quieres borrar a '+this.user?.email+'?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
