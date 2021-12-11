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
  }

  logout(){
    localStorage.removeItem(this.email)
    localStorage.removeItem(this.pass)
    localStorage.removeItem(this.token)
    localStorage.setItem("logged", "false")    
  }

  getEmail(){
    return localStorage.getItem(this.email);
  }

  getPass(){
    return localStorage.getItem(this.pass);
  }

  getToken(){
    return localStorage.getItem(this.token);
  }
}
