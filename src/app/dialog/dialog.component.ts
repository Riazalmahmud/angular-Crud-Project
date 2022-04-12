import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['BrandNew', 'secoundHand', 'reuse'];
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categories: ['', Validators.required],
      choiceDate: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comments: ['', Validators.required],
    });
    
  }
  addProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
        .subscribe({
          next: (res) => {
            console.log('added successfully');
            alert('product added successfully')
            this.productForm.reset();
            this.dialogRef.close();
          },
          error: () => {
            alert('error while adding the product')
          }
          
      })
    }

    console.log(this.productForm.value);
  }
}
