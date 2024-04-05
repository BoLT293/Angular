import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService) { }

  login(login_id, password): Observable<any> {
    return this.http.post("http://192.168.2.16:8000/login", { login_id, password }, { observe: 'response' })
  }

  isloggedin(): boolean {
    return !!localStorage.getItem('session_token')
  }

  logout() {
    localStorage.removeItem('session_token')
    this.router.navigateByUrl('/login')
  }
}
