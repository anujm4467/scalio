import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const Observable$ = this.authService.isLoggedInAsync;
    const data = Observable$.valueOf();
    this.isLoggedIn = data ? true : false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
