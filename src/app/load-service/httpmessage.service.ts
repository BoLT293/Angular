import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class HttpmessageService implements HttpInterceptor {

  constructor(private messageservice: MessageService,
    private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.error(error)
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("ErrorEvent")
          }
          else {
            console.log(`error status: ${error.status} ${error.statusText}`)
            switch (error.status) {
              case 401:
                if (req.url.includes('http://192.168.2.16:8000/login')) {
                  this.messageservice.add({ severity: "error", summary: "Invalid", detail: "Invalid Login id or Password", life: 2000 });
                }
                else {
                  this.messageservice.add({ severity: "error", summary: "Unauthorized", detail: "You are not a valid to make this request", life: 3000 })
                  this.router.navigateByUrl('/login')
                }
                break;

              case 500:
                if (req.url.includes('http://192.168.2.16:8000/addemployee')) {
                  this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Login ID already exist,Please choose different ID', 'life': 2000 })
                }
                else if(req.url.includes('http://192.168.2.16:8000/updateemployee/')){
                  this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Login ID already exist,Please choose different ID', 'life': 2000 })
                }
                else {
                  this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error', 'life': 2000 })
                }
                break;

              case 403:
                this.messageservice.add({ severity: "error", summary: "Forbidden Request", life: 3000 })
                break;
            }
          }
        }
        return throwError(error)
      }),
      map((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse && event.status === 200) {
          if (req.url.includes('http://192.168.2.16:8000/login')) {
            this.messageservice.add({ severity: "success", summary: "Success", detail: "Login Successful", life: 2000 });
          }
          else if (req.url.includes('http://192.168.2.16:8000/register')) {
            this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Registration Successful' })
          }
          else if (req.url.includes('http://192.168.2.16:8000/updateemployee/')) {
            this.messageservice.add({ severity: "success", summary: "Success", detail: "Employee details updated", life: 2000 });
          }
          else if (req.url.includes('http://192.168.2.16:8000/addemployee')) {
            this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Employee added successfully', 'life': 2000 });
          }
          else if (req.url.includes('http://192.168.2.16:8000/deleteemployee/')) {
            this.messageservice.add({ severity: 'success', summary: 'success', detail: 'Employee data deleted successfully', life: 3000 })
          }
        }
        return event;
      }),
    )
  }
}
