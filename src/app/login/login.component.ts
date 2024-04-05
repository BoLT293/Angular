import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../load-service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  error_message!: string
  logged_in: boolean = true
  msgs: any[] = [];
  token!: string;


  constructor(
    private lf: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private auth: AuthService) { }

  get login_id() {
    return this.loginform.get('login_id')
  }
  get password() {
    return this.loginform.get('password')
  }
  get confirmpassword() {
    return this.loginform.get('confirmpassword')
  }

  ngOnInit() {
    this.loginform = this.lf.group({
      login_id: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  formReset() {
    this.loginform.reset();
  }

  login() {
    let login_id = this.loginform.value['login_id']
    let password = this.loginform.value['password']

    // const fd = new FormData()
    // fd.append('login_id', login_id),
    // fd.append('password', password),

    this.auth.login(login_id, password).subscribe((response) => {
      console.log(response)

      let body = response['body']['access-token']
      localStorage.setItem('session_token', body)
      console.log("body data", body)
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful', 'life': 1700 });
      // setTimeout(() => {
        this.router.navigateByUrl('/emp-list');
      // }, 2000);
    },
      (error) => {
        console.log(error)
        if (error) //['status']==!200)
        {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Login id and Password', 'life': 1700 })
        }
      }
    )


    // this.http.post("http://192.168.2.16:8000/login" ,fd,{observe: 'response'})
    // .subscribe(response => {
    //     console.log(response)

    //     let body = response['body']['access-token']
    //     localStorage.setItem('session_token',body)
    //     console.log("body data",body)         
    //     this.messageService.add({severity:'success', summary:'Success', detail:'Login Successful', 'life': 1700});
    //     setTimeout(() => {
    //       this.router.navigateByUrl('/emp-list');
    //     }, 2000);
    // },
    // (error=>{
    //   console.log(error)
    //   if(error) //['status']==!200)
    //   {
    //     this.logged_in = false
    //     this.messageService.add({severity:'error', summary:'Error', detail:'Invalid Login id and Password', 'life': 1700})
    //   }
    // })
    // )

  }
}
