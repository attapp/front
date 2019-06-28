import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

    constructor (public router: Router, private http: HttpClient) {}

    /*metodo login*/  
    public login() {
      this.http.post<any>('http://localhost:3000/login',{user: this.correo, password: this.password})
    .subscribe
    (data => {
      console.log(data);
      if (data['validacion']===true){
        this.router.navigateByUrl('/project');
        /* if (data[''])*/

      }
      else {
        error => console.log(error);
        
      }
    })
  }  
      /*console.log(data);*/
  ngOnInit() {
  }

}
