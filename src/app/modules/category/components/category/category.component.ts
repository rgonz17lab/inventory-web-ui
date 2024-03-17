import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{


  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns : string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(): void {

    this.categoryService.getCategories()
      .subscribe( (data:any) => {
        console.log("respuesta categories: ", data);
        this.processCategoriesResponse(data);
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processCategoriesResponse (resp: any){
    const dataCategory: CategoryElement[] = [];
    if (resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }
}

export interface CategoryElement {
  description : string;
  id: number;
  name: string;
}
