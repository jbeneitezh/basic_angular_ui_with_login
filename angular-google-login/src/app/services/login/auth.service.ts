import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn:boolean     = false;
  private tokenSrc:string|null = null;
  private token   :string|null = null;
  

  constructor() { }

  logout(){
    this.loggedIn = false;
    this.tokenSrc = null ;
    this.token    = null ;
  }

  isLoggedIn():boolean{
    return this.loggedIn;
  }

}
