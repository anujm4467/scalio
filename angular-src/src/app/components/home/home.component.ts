import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const Observable$ = this.authService.isLoggedInAsync;
    const data = Observable$.valueOf();
    this.isLoggedIn = data ? true : false;
  }


}
