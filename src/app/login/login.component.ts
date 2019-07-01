import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'ATT';

    /*variables login*/
    //public islogin=false;
    private correo;
    private password;
    public errores=false;

    constructor (public router: Router, private http: HttpClient) {}

    /*metodo login*/  
    public login() {
      this.http.post<any>('http://localhost:3000/login',{user: this.correo, password: this.password})
      .subscribe
      (data => {
        console.log(data);
        if (data['perfil'] === 4 || data['perfil'] === 2){
          this.router.navigateByUrl('/dashboard');
        } //else if ()
      }, (err) => {
        this.errores=true;
      }
      )
    }
      /*console.log(data);*/
  ngOnInit() {
  }

}
