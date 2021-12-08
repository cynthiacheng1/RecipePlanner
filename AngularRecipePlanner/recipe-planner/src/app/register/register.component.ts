import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  secondpassword: string;
  same: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  register(){
    if (this.user.password != this.secondpassword){
      this.same = false;
      console.log("False")
    }
  }

}
