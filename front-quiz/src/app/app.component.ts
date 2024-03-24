import { Component, OnInit } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';
import { UserService } from './services/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'front-quiz';
  spinerType= SPINNER.foldingCube;

  isAdmin: boolean= false;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe(event=> {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/admin')) {
          this.isAdmin= true;
        } else {
          this.isAdmin= false;
        }
      }
    })
  }
}
