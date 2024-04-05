import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  token: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService) 
    { }

  register(fd: FormData):Observable<any>{
    return this.http.post("http://192.168.2.16:8000/register" ,fd,{observe: 'response'})
  }

  login(login_id,password):Observable<any>{
    return this.http.post("http://192.168.2.16:8000/login" ,{login_id,password},{observe: 'response'})
  }

  getemplist(headers):Observable<any>{
      return this.http.get('http://192.168.2.16:8000/listemployees',{headers});
  }

  deleteemp(employee_id,headers):Observable<any>{
    return this.http.delete(`http://192.168.2.16:8000/deleteemployee/${employee_id}`, { headers })
  }

  addemp(fd : FormData, headers):Observable<any>{
    return this.http.post("http://192.168.2.16:8000/addemployee", fd, { headers, observe: 'response' })
  }

  singleemp(employee_id:number, headers):Observable<any>{
    return this.http.get(`http://192.168.2.16:8000/employee/${employee_id}`, { headers })
  }

  updateemp(employee_id:number, updatedData:any, headers):Observable<any>{
    return this.http.put(`http://192.168.2.16:8000/updateemployee/${employee_id}`, updatedData, { headers })
  }

  logout(){
    localStorage.removeItem('session_token')
    this.router.navigateByUrl('/login')
  }
}
