import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public pass: string;
  private url: 'http/localhost:3000/login';

  constructor(private http: HttpClient) { }
}


/*@Injectable({
            
})
export class LoginService {

    public pass: string;
    private url= 'localhost:3000/login';

    constructor(private http: HttpClient) {
        const currentUser = JSON.parse(localStorage.getItem ('currentUser'));
        this.pass = currentUser && currentUser.pass;

    }

login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.url, { username: username, password: password})
       .pipe(
            map(user => {
                if (user && user.pass) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            })
        );
     } 
}