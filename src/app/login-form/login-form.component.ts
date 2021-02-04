import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
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
  name: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<LoginFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
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

  submit(){
    this.data.name = this.name.value;
    this.data.passwordHash = this.password.value.hashCode();
    this.dialogRef.close(this.data);
  }
  
  isValid(): boolean{
    return (this.name.errors == null && this.password.errors == null)
  }

  getErrorMessage(param: any){
    if (param.hasError('required')) return 'You must enter a value';
  }
}
