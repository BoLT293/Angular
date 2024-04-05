import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../load-service/auth.service';
import { CommonServiceService } from '../load-service/common-service.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css'],
  providers: [MessageService]

})
export class AddemployeeComponent implements OnInit {

  Addemployee!: FormGroup
  departmentname: any[] = ['Frontend', 'Backend', 'Testing', 'Finance'];
  education_details: any[] = ['10th', '12th', 'Diploma', 'Graduate', 'Post Graduate', 'Phd']
  token: any


  constructor(
    private AFB: FormBuilder,
    private http: HttpClient,
    private messageservice: MessageService,
    private router: Router,
    private auth: AuthService,
    private cs: CommonServiceService) { }

  get firstname() {
    return this.Addemployee.get('firstname')
  }

  get lastname() {
    return this.Addemployee.get('lastname')
  }

  get email() {
    return this.Addemployee.get('email')
  }
  get phone() {
    return this.Addemployee.get('phone')
  }
  get login_id() {
    return this.Addemployee.get('login_id')
  }
  get password() {
    return this.Addemployee.get('password')
  }
  get confirmpassword() {
    return this.Addemployee.get('confirmpassword')
  }
  // get gender(){
  //   return this.Addemployee.get('gender')
  // }
  // get departmentname()
  // {
  //   return this.Addemployee.get('departmentname')
  // }
  // get educationdetails()
  // {
  //   return this.Addemployee.get('edu_details')
  // }


  ngOnInit() {
    this.token = localStorage.getItem('session_token')
    this.Addemployee = this.AFB.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      login_id: ['', [Validators.required,]],
      gender: ['', [Validators.required]],
      departmentname: ['', [Validators.required]],
      edu_details: new FormArray([], [Validators.required])
    });
  }

  onChange(e: any) {
    const checkedvalue = e.target.value;
    const checked = e.target.checked;
    console.log(checkedvalue, checked)

    const checkedarray = this.Addemployee.get('edu_details') as FormArray;
    if (checked) {
      checkedarray.push(new FormControl(checkedvalue))
    }
    else {
      let i: number = 0;
      checkedarray.controls.forEach((item) => {
        if (item.value == checkedvalue) {
          checkedarray.removeAt(i);
        }
        i++
      });
    }
  }


  submitdata() {
    const headers = { 'Authorization': this.token }
    let firstname = this.Addemployee.value['firstname']
    let lastname = this.Addemployee.value['lastname']
    let email = this.Addemployee.value['email']
    let phoneno = this.Addemployee.value['phone']
    let login_id = this.Addemployee.value['login_id']
    let gender = this.Addemployee.value['gender']
    let departmentname = this.Addemployee.value['departmentname']
    let edu_details = this.Addemployee.value['edu_details']

    const fd = new FormData()
    fd.append('firstname', firstname),
      fd.append('lastname', lastname),
      fd.append('email', email),
      fd.append('phoneno', phoneno),
      fd.append('login_id', login_id),
      fd.append('gender', gender)
      fd.append('departmentname', departmentname),
      fd.append('edu_details', edu_details)


    this.cs.addemp(fd, headers).subscribe(response => {
      console.log(response)
      if (response.status === 200) {
        // this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Employee added successfully', 'life': 2000 });
        setTimeout(() => {
          this.router.navigateByUrl('/emp-list')
        }, 2000)
      }
      
    },
      (error => {
        console.log(error)
        // if (error.status === 500) //['status']==!200)
        // {
        //   this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Login ID already exist, Choose different ID', 'life': 2000 })
        //   this.error_message = "Invalid Username or password"
        // }
      })
    )
  }
  cancel() {
    this.router.navigateByUrl('/emp-list')
  }
}
