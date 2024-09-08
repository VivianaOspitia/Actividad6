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
}

interface ApiResponse {
  results: any[]; // Adjust the type here based on what the array contains
  [key: string]: any; // In case there are other fields in the response
}
