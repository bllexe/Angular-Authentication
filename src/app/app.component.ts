import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{

  title = 'Angular-Authentication';

  ismenurequired=false;
  isAdminUser=false;

  constructor(private router:Router,private service:AuthService){

   // sessionStorage.clear();

  }

  ngDoCheck(): void {
   let currenturl=this.router.url
   if(currenturl=='/login' || currenturl=='/register'){
    this.ismenurequired=false;

   }else{
    this.ismenurequired=true;
   }

   if(this.service.getUserRole()==='admin'){
    this.isAdminUser=true;
   }else{
    this.isAdminUser=false;
   }
  }
  
}
