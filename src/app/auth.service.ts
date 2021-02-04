import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { LoginFormComponent } from '../app/login-form/login-form.component'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'api/users';
  public user: User;

  constructor(public dialog: MatDialog, private http: HttpClient) { this.showLoginForm(false); }

  showLoginForm(incorrect: boolean){
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '250px', data: {incorrect: incorrect}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUser(result.name).subscribe(user => this.tryLogin(result.name, result.passwordHash, user[0]));
    });
  }

  tryLogin(name: string, passwordHash: string, user: User){
    if (user === undefined) this.showLoginForm(true);
    else if (passwordHash != user.passwordHash) this.showLoginForm(true);
    else this.user = user;
  }

  getUser(name: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/?userName=${name}`);
  }

  isAdmin(): boolean{
    if (this.user == undefined) return false;
    return this.user.privilages > 1;
  }

  getName(): string{
    if (this.user == undefined) return "";
    return this.user.userName;
  }
}
