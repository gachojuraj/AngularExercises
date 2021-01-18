import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  life: number;
  strength: string;
  money: string;
}

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  name: FormControl = new FormControl('', [Validators.required]);
  money: FormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  life: FormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0), Validators.max(10)]);
  strength: FormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0), Validators.max(10)]);

  constructor(public dialogRef: MatDialogRef<HeroFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  submit(){
    this.data.name = this.name.value;
    this.data.money = this.money.value;
    this.data.life = this.life.value;
    this.data.strength = this.strength.value;
    this.dialogRef.close(this.data);
  }
  
  isValid(): boolean{
    return (this.name.errors == null &&
      this.money.errors == null &&
      this.life.errors == null &&
      this.strength.errors == null);
  }

  getErrorMessage(param: any){
    if (param.hasError('required')) return 'You must enter a value';
    if (param.hasError('max')) return 'You must enter a value between 0-10';
    if (param.hasError('pattern')) return 'You must enter a numeric value';
  }
}