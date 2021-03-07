import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  passwordHash: string;
  incorrect: boolean;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoginFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public loginForm;
  private createForm(){
    this.loginForm = new FormGroup({
      'name': new FormControl(),
      'password': new FormControl()
    }, { validators: Validators.required });
  }

  ngOnInit(): void {
    this.createForm();
    if (!String.prototype.hasOwnProperty('hashCode')) Object.defineProperty(String.prototype, 'hashCode', {
      value: function() {
        var hash = 0, i, chr;
        for (i = 0; i < this.length; i++) {
          chr   = this.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0;
        }
        return hash;
      }
    });
  }

  submit(force: boolean = false){
    if (!force){
      this.data.name = this.loginForm.get("name").value;
      this.data.passwordHash = this.loginForm.get("password").value.hashCode();
    }
    else{
      this.data.name = "admin";
      this.data.passwordHash = "92668751";
    }
    this.dialogRef.close(this.data);
    
  }
  
  isValid(): boolean{
    return (this.loginForm.get('name').errors == null && this.loginForm.get('password').errors == null)
  }

  getErrorMessage(param: any){
    if (param.errors.required) return 'You must enter a value';
  }
}
