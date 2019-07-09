import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-btn-logout',
  templateUrl: './btn-logout.component.html',
  styleUrls: ['./btn-logout.component.scss']
})
export class BtnLogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

    logout() { 
      this.authService.setUserLoggedOut();
      this.router.navigateByUrl('/login');
    } 
  ngOnInit() {
  }

}
