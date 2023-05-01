import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUserModel } from 'src/app/models/app-user-model';
import { JwtAuthenticationRequest } from 'src/app/models/jwt-authentication-request';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators'
import { of } from 'rxjs/internal/observable/of';
import { SocialUser } from '@abacritt/angularx-social-login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token   :string = null;

  private appUser: AppUserModel;
  

  logout(){
    this.token    = null ;
  }

  servUrl = environment.apiUrl + '/api/auth/login';
  httpOptions = {headers:new HttpHeaders(
                                        {'content-type': 'application/json'}
                                        //{'content-type':'*'}
                                        )
                };
  constructor(private httpCli:HttpClient) { }

  public isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  getLoggedUser() : AppUserModel{
    return this.appUser;
  }

  doPostLogin(authRequest: JwtAuthenticationRequest): Observable<AppUserModel> {
    return this.httpCli.post<AppUserModel>(this.servUrl, authRequest).pipe(
      map((resp:AppUserModel) => {
        console.log(resp);
        this.appUser = resp;
        this.successLogin();
        return this.appUser;
      }),
      catchError((error:any) => {
        console.log(error);
        this.errorLogin();
        return of(this.appUser); // envolver AppUserModel en un observable
      })
    );
  }

  doGetSocialUserLogin(socialLogin: SocialUser):Observable<AppUserModel>{
    if (!socialLogin.idToken || !socialLogin.provider) {
      console.error('SocialAuthorization o SocialProvider no tienen valores válidos.');
      this.errorLogin();
      return of(this.appUser);
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'SocialAuthorization': socialLogin.idToken,
        'SocialProvider': socialLogin.provider
      })
    };
    console.log("headers: "+this.httpOptions);
    return this.httpCli.get(this.servUrl, this.httpOptions).pipe(
      map((resp:any) => {
        console.log(resp);
        this.appUser = resp;
        this.successLogin();
        return this.appUser;
      }),
      catchError((error:any) => {
        console.log(error);
        this.errorLogin();
        return of(this.appUser);
      })
    );
  }

  logOut(){
    if(!this.isLoggedIn()) return;
    this.loggedIn.next(false);
    this.appUser = new AppUserModel();
  }


  private errorLogin():void{
    this.appUser = new AppUserModel();
    this.loggedIn.next(false);
  }

  private successLogin():void{
    this.appUser.loggedIn = true;
    this.token = 'Bearer ' + this.appUser.token;
    this.loggedIn.next(true);
  }

  /*
  getBrokers():Observable<BrokerModel[]>{
    console.log("entorno: "+environment.envStr);
    console.log(this.servUrl);
    return this.httpCli.get<BrokerModel[]>(this.servUrl);
  }
  getBroker(idBroker:number):Observable<BrokerModel>{
    return this.httpCli.get<BrokerModel>(this.servUrl+`/${idBroker}`);
  }
  */
}
