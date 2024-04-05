import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { passwordValidator } from '../Validators/password-validators';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from '../load-service/auth.service';
import { CommonServiceService } from '../load-service/common-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  RegistrationForm!: FormGroup

  constructor(
    private RFB: FormBuilder,
    private auth: AuthService,
    private router: Router, 
    private http: HttpClient,
    private messageservice: MessageService,
    private cs: CommonServiceService) { }

  get firstname() {
    return this.RegistrationForm.get('firstname')
  }

  get lastname() {
    return this.RegistrationForm.get('lastname')
  }

  get email() {
    return this.RegistrationForm.get('email')
  }
  get phone() {
    return this.RegistrationForm.get('phone')
  }
  get login_id() {
    return this.RegistrationForm.get('login_id')
  }
  get password() {
    return this.RegistrationForm.get('password')
  }
  get confirmpassword() {
    return this.RegistrationForm.get('confirmpassword')
  }

  ngOnInit() {

    this.RegistrationForm = this.RFB.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      login_id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required]
    }, { validator: passwordValidator });
  }


  submitdata() {
    let firstname = this.RegistrationForm.value['firstname']
    let lastname = this.RegistrationForm.value['lastname']
    let email = this.RegistrationForm.value['email']
    let phoneno = this.RegistrationForm.value['phone']
    let login_id = this.RegistrationForm.value['login_id']
    let password = this.RegistrationForm.value['password']
    let confirmpassword = this.RegistrationForm.value['confirmpassword']

    const fd = new FormData()
    fd.append('firstname', firstname),
      fd.append('lastname', lastname),
      fd.append('email', email),
      fd.append('phoneno', phoneno),
      fd.append('login_id', login_id),
      fd.append('password', password),
      fd.append('confirmpassword', confirmpassword)

    this.cs.register(fd).subscribe(response => {
      console.log(response)
      // this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Registration Successful' })
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2500);
    },
      (error => {
        console.log(error)
      }))

  }
  clearform() {
    this.RegistrationForm.reset()
    this.router.navigateByUrl('/login')
  }
}
