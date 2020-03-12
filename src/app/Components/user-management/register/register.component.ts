import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { CommonModulesService } from 'src/app/Services/common-modules.service';
import { ApiService } from 'src/app/Services/api.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private service : ApiService, private common : CommonModulesService, private auth : AuthenticationService) { }

  ngOnInit(){
   
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d*(?:\.\d{1,2})?$/)]),
      fullName: new FormControl('', [Validators.required])
    });
  }

  register(){
    let data = {
      type : 'POST',
      url : 'http://localhost:3001/user/register',
      data : {
        name: this.form.get('fullName').value,
        phone: this.form.get('phoneNumber').value,
        email: this.form.get('email').value,
        password: this.form.get('password').value
      },
    }

    this.service.apiService(data).subscribe((res)=>{
      if(res.status == 200){
        this.common.setData('token', res.body.token);
        this.common.setData('userInfo', res.body.user);
        this.common.setData('role', 'User');

        this.auth.setUserLoggedIn();
        this.router.navigate(['/dashboard']);
      }
      else{
        this.common.showErr("Something Went Wrong");
      }
    },err => {
      this.common.showErr(err.error.message);
    })
  }

}
