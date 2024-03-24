import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  public dialogRef = inject(MatDialogRef);
  private categoryService = inject(CategoryService);
  public data = inject(MAT_DIALOG_DATA);


  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if(this.data != null){
      this.categoryService.deleteCategorie(this.data.id)
      .subscribe((data: any)=> {
        this.dialogRef.close(1);
      }, (eror: any) => {
        this.dialogRef.close(2);
      })
    }else{
      this.dialogRef.close(2);
    }
  }
}
