import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _contextService:ContextService, private _routerService:Router, private toastr: ToastrService) { }

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
    this.toastr.success("Logged out successfully")
    this._routerService.navigate(['home']);
  }
}
