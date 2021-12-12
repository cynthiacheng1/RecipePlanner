import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _contextService:ContextService) { }

  ngOnInit(): void {

  }

  ifLogged(){
    if (localStorage.getItem("logged") == "true"){
      return true;
    }
    return false;
  }

  logout(){
    this._contextService.logout();
  }
}
