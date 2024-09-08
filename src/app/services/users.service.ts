import { Injectable } from '@angular/core';
import { UsersData } from '../interfaces/users-data';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'https://peticiones.online/api/users';
  
  constructor() { }

  async getAllUsers(): Promise<UsersData[]>{
    const response = await fetch(this.url);
    const data: ApiResponse = await response.json();

    return await data.results ?? [];
  }

  async getUserById(id : number){
    const response = await fetch(this.url+'/'+id)
  }

  async getUserFromList(id : number): Promise<UsersData | undefined>{
    //como no funciona el servicio getUser/IDUSUARIO, 
    const response = await fetch(this.url);
    const data: ApiResponse = await response.json();

    return await data.results.find(user => user.id ===id) ?? {};
  }

  async createUser(user : UsersData){
    const response = await fetch(this.url,{
      method : 'POST',
      body: JSON.stringify(user)
    })
    return await response.json();

  }

  async deleteUserById(id : number){
    //el servicio user/IDUSUARIO, siempre devuelve el mismo mensaje
    const response = await fetch(this.url+'/'+id,{
      method : 'DELETE'
    })
    return await response.json();
  }
}

interface ApiResponse {
  results: any[]; // Adjust the type here based on what the array contains
  [key: string]: any; // In case there are other fields in the response
}
