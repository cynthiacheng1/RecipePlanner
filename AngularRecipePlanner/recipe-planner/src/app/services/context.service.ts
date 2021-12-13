import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor() { }

  private email = "email";
  private pass = "pass";
  private token = "token";

  store(user:User) {
    localStorage.setItem(this.email, user.email)
    localStorage.setItem(this.pass, user.password)
    localStorage.setItem(this.token, user.token)
    localStorage.setItem("logged", "true")

    console.log(localStorage.getItem("token"))

  }

  logout(){
    localStorage.removeItem(this.email)
    localStorage.removeItem(this.pass)
    localStorage.removeItem(this.token)
    localStorage.setItem("logged", "false")    
  }

  getEmail(): string{
    return localStorage.getItem(this.email) as string;
  }

  getPass(): string{
    return localStorage.getItem(this.pass) as string;
  }

  getToken(): string{
    return localStorage.getItem(this.token) as string;
  }
}
