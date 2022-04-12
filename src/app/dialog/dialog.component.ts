import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['BrandNew', 'secoundHand', 'reuse'];
  productForm!: FormGroup;
  actionBtn: string = 'Submit';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categories: ['', Validators.required],
      choiceDate: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comments: ['', Validators.required],
    });
    if (this.editData) {
        this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['categories'].setValue(
        this.editData.categories
      );
      this.productForm.controls['choiceDate'].setValue(
        this.editData.choiceDate
      );
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['price'].setValue(this.editData.comments);
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            console.log('added successfully');
            alert('product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('error while adding the product');
          },
        });
      }
    } else {
      this.updateData();
    }

    console.log(this.productForm.value);
  }
  updateData() {
    this.api.putProduct(this.productForm.value, this.editData)
      .subscribe({
        next: (res) => {
          alert('successfully updated data')
          this.productForm.reset()
          this.dialogRef.close("update")
        },
        error() {
          alert('Unsuccessfull updated data');
        }
    })
  }
}
