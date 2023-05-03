import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatedialog/updatepopup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor(private service: AuthService,private dialog:MatDialog) {
    this.loadUser();
  }

  loadUser() {
    this.service.getAll().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];

  updateUser(code: any) {
    const popup=this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width:'50%',
      data:{
        usercode:code
      }
    })
    popup.afterClosed().subscribe(res=>{
    this.loadUser();
    });
  }

  openDialog(){
    
  }
}
