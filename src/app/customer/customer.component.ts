import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UpdatepopupComponent } from '../updatedialog/updatepopup.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {

  constructor(private service: AuthService,private toastr:ToastrService,private router: Router,private dialog:MatDialog) {
   
    this.SetAccesspermission();

  }
  customerlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;

  ngAfterViewInit(): void {

  }
  LoadCustomer() {
    this.service.getAllCustomer().subscribe(res => {
      this.customerlist = res;
      this.dataSource = new MatTableDataSource(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  SetAccesspermission() {
    this.service.getAccessByRole(this.service.getUserRole(), 'customer').subscribe(res => {
      this.accessdata = res;
      //console.log(this.accessdata);

      if(this.accessdata.length>0){
        this.haveadd=this.accessdata[0].haveadd;
        this.haveedit=this.accessdata[0].haveedit;
        this.havedelete=this.accessdata[0].havedelete;
        this.LoadCustomer();
      }else{
        alert('you are not authorized to access.');
        this.router.navigate(['']);
      }

    });
  }
  displayedColumns: string[] = ['code', 'name', 'creditlimit', 'action'];

  updateCustomer(code: any) {

    if(this.haveedit){
       this.toastr.success('Success');
       //update islemleri
    }else{
      this.toastr.warning("You don't have access for Edit");
    }

  }
  removeCustomer(code: any) {
    if(this.havedelete){
      this.toastr.success('Success');
      //silme islemleri
   }else{
     this.toastr.warning("You don't have access for Delete");
   }
  }
  addCustomer() {
    if(this.haveadd){
      this.toastr.success('Success');
      // this.dialog.open(UpdatepopupComponent,{
      //   width:'60%',
      //   height:'400px'
      // })
      //ekleme islemleri
   }else{
     this.toastr.warning("You don't have access for Create")
   }
  }


}
