import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  constructor(public authService: AuthService){};
  ngOnInit(): void {

  }
}
