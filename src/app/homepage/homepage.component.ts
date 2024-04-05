import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from '../load-service/auth.service';
import { CommonServiceService } from '../load-service/common-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [MessageService]

})
export class HomepageComponent implements OnInit {
  token: string;
  details: any[] = [];
  mode: any;
  searchQuery: string = '';
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private messageservice: MessageService,
    private active: ActivatedRoute,
    private auth: AuthService,
    private cs:CommonServiceService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('session_token')
    const headers = {'Authorization': this.token }
    this.mode = this.active.snapshot.params['mode']
    this.getall(headers);
  }

  getall(headers) {
    // const headers = {'Authorization': this.token }
    this.cs.getemplist(headers).subscribe(
      (response) => {
        // console.log(response)
        this.details = (response['employees']);
        this.details.sort((a, b) => a.id - b.id);
        // console.log(this.details)
      },
      (error => {
        console.log(error)
        if(error.status === 401){
          // this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Session expiered', 'life': 2000 });
        }
      })
    )
  }

  logout() {
    this.messageservice.add({ severity: 'warn', summary: 'User', detail: 'Logout', life: 3000 })
    setTimeout(() => {
      this.auth.logout()
    },2000);
    
    // sessionStorage.clear();
    // localStorage.clear()
    // this.router.navigateByUrl('/login')
  }

  deleteemployee(employee_id: number) {
    const headers = { 'Authorization': this.token }
    this.cs.deleteemp(employee_id,headers).subscribe(
      (response) => {
        console.log(response)
        this.getall(headers);
        // this.messageservice.add({ severity: 'success', summary: 'success', detail: 'Employee data deleted successfully', life: 3000 })
      }, (error) => {
        // this.messageservice.add({ severity: 'error', summary: 'error', detail: 'Something went wrong', life: 3000 })

      }
    )
  }
  
  filterDetails() {
    if (!this.searchQuery) {
      return this.details;
    }

    const query = this.searchQuery.trim().toLowerCase();
    const query2 = parseInt(query);

    return this.details.filter(data => {
      if (query2) {
        return data.id.toString().startsWith(query);
      } else {
        return Object.values(data).some(value =>
          typeof value === 'string' && value.toLowerCase().includes(query)
        );
      }
    });
  }
}

