import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUserModel } from 'src/app/models/app-user-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  servUrl = environment.apiUrl + '/api/auth/register';
  httpOptions = {headers:new HttpHeaders(
                                        {'content-type': 'application/json'}
                                        //{'content-type':'*'}
                                        )
                                      };
  constructor(private httpCli:HttpClient) { }

  public createUser(user: AppUserModel): Observable<AppUserModel> {
    return this.httpCli.post<AppUserModel>(this.servUrl, user, this.httpOptions);
  }

}
