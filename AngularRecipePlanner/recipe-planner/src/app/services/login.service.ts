import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from './endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private _httpService: HttpClient, private endpoints: EndpointsService) { }

  login(user:User): Observable<any>{
    let body = JSON.parse(JSON.stringify(user));
    console.log(body);

    return this._httpService.post(this.endpoints.LOGIN_USER, body)
  }

  register(user:User): Observable<any>{
    let body = JSON.parse(JSON.stringify(user));
    console.log(body);

    return this._httpService.post(this.endpoints.REGISTER_USER, body)
  }

  getInfo(user: User): Observable<any>{
    let body = JSON.parse(JSON.stringify(user));
    console.log(body);

    return this._httpService.post(this.endpoints.GET_USER_INFO, body, {headers: new HttpHeaders({'Authorization' : user.token})})
  }
}
