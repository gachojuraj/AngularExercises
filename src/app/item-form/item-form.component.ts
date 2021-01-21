import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  price: number;
}

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  name: FormControl = new FormControl('', [Validators.required]);
  price: FormControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);

  constructor(public dialogRef: MatDialogRef<ItemFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  submit(){
    this.data.name = this.name.value;
    this.data.price = this.price.value;
    this.dialogRef.close(this.data);
  }
  
  isValid(): boolean{
    return (this.name.errors == null && this.price.errors == null);
  }

  getErrorMessage(param: any){
    if (param.hasError('required')) return 'You must enter a value';
    if (param.hasError('max')) return 'You must enter a value between 0-10';
    if (param.hasError('pattern')) return 'You must enter a numeric value';
  }
}
