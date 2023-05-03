import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:3000/user';
  apiurlRole='http://localhost:3000/role';
  apiurlCustomer=' http://localhost:3000/customer';
  apiurlRoleAccess='http://localhost:3000/roleaccess?role=admin&menu=customer';

  getAll(){
    return this.http.get(this.apiurl);
  }

  getByCode(code:any){
    return this.http.get(this.apiurl + '/' + code);

  }

  proceedRegister(inputdata:any){
    return this.http.post(this.apiurl,inputdata);
  }

  updateUser(code:any,inputdata:any){
   return this.http.put(this.apiurl + '/' + code,inputdata);
  }

  isLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  getUserRole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }

  getAllRole(){
    return this.http.get(this.apiurlRole);
  }

  getAllCustomer(){

    return this.http.get(this.apiurlCustomer);
  }

  getAccessByRole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu);
  }
}
