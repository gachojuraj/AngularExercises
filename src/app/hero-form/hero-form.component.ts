import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
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
  constructor(public dialogRef: MatDialogRef<HeroFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public heroForm;
  private createForm(){
    this.heroForm = new FormGroup({
      'name': new FormControl(),
      'money': new FormControl('', [Validators.pattern("^[0-9]*$")]),
      'life': new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.min(0), Validators.max(10)]),
      'strength': new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.min(0), Validators.max(10)])
    }, { validators: Validators.required });
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit(){
    this.data.name = this.heroForm.get("name").value;
    this.data.money = this.heroForm.get("money").value;
    this.data.life = this.heroForm.get("life").value;
    this.data.strength = this.heroForm.get("strength").value;
    this.dialogRef.close(this.data);
  }
  
  isValid(): boolean{
    return (this.heroForm.get("name").errors == null &&
      this.heroForm.get("money").errors == null &&
      this.heroForm.get("life").errors == null &&
      this.heroForm.get("strength").errors == null);
  }

  getErrorMessage(param: FormControl){     
    if (param.errors.required) return 'You must enter a value';
    if (param.errors.max) return 'You must enter a value between 0-10';
    if (param.errors.pattern) return 'You must enter a numeric value';
  }
}