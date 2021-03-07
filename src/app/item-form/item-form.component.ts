import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
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
  constructor(public dialogRef: MatDialogRef<ItemFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public itemForm;
  private createForm(){
    this.itemForm = new FormGroup({
      'name': new FormControl(),
      'price': new FormControl('', [Validators.pattern("^[0-9]*$")])
    }, { validators: Validators.required });
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit(){
    this.data.name = this.itemForm.get("name").value;
    this.data.price = this.itemForm.get("price").value;
    this.dialogRef.close(this.data);
  }
  
  isValid(): boolean{
    return (this.itemForm.get("name").errors == null && this.itemForm.get("price").errors == null);
  }

  getErrorMessage(param: any){
    if (param.errors.required) return 'You must enter a value';
    if (param.errors.pattern) return 'You must enter a numeric value';
  }
}
