import { Component, Input, inject } from '@angular/core';
import { UsersData } from '../../interfaces/users-data';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() datos: UsersData = { id: 0, first_name: '', last_name: '',username: '',email: '', image: ''};

  usersService : UsersService = inject(UsersService);

  startDelete(id: number) {
    Swal.fire({
      title: '¿Quieres borrar a '+this.datos?.email+'?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `No borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usersService.deleteUserById(id).then(res =>{
          if (res.error === undefined || res.error ===null){
            Swal.fire('Se borro!', '', 'success')
          }else{
            Swal.fire('Error!', res.error, 'error')
          }    
        })
      } else if (result.isDenied) {
        Swal.fire('No se va a borrar', '', 'info');
      }
    });
  }
}
