import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUserModel } from 'src/app/models/app-user-model';
import { JwtAuthenticationRequest } from 'src/app/models/jwt-authentication-request';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators'
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedIn:boolean     = false;
  private token   :string = null;

  private appUser: AppUserModel;
  

  logout(){
    this.loggedIn = false;
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
    return this.isLoggedInSubject.getValue();
  }

  isLogged():Observable<boolean>{
    return this.isLoggedInSubject.asObservable();
  }

  getLoggedUser() : AppUserModel{
    return this.appUser;
  }

  doPostLogin(authRequest: JwtAuthenticationRequest): Observable<AppUserModel> {
    return this.httpCli.post<AppUserModel>(this.servUrl, authRequest).pipe(
      map((resp:AppUserModel) => {
        console.log(resp);
        this.appUser = resp;
        this.appUser.loggedIn = true;
        this.token = 'Bearer ' + this.appUser.token;
        this.loggedIn = true;
        this.isLoggedInSubject.next(true);
        return this.appUser;
      }),
      catchError((error:any) => {
        console.log(error);
        return of(new AppUserModel()); // envolver AppUserModel en un observable
      })
    );
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
