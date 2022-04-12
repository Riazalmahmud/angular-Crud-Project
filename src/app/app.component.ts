import { Component } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular3crud';

  constructor(private dialog: MatDialog, private api: ApiService) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
     width: "30%"
    });
    
  }

  allAddProduct() {
    this.api.getProdut()
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          alert('erro while the fatching the api ')
        }
      })
    
  }
}
