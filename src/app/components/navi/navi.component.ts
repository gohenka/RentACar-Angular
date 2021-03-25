import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  loginUser:LoginModel;
  loginForm:FormGroup;
  authenticated:boolean =false;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router) { }

    ngOnInit(): void {
      this.createLoginForm();
    }
    createLoginForm(){
      this.loginForm = this.formBuilder.group({
        email:["",Validators.required],
        password:["",Validators.required]
      })
  
    }

    login(){
      if(this.loginForm.valid){
        console.log(this.loginForm.value)
        let loginModel = Object.assign({},this.loginForm.value)
  
        this.authService.login(loginModel).subscribe(response=>{
          this.toastrService.info(response.messages)
          localStorage.setItem("token",response.data.token)
          this.authenticated = true
        },responseError=>{
          this.toastrService.error(responseError.error)
        }
        )
      }
    }

    logOut(){
      this.authService.logOut();
    }

  isAuthenticated(){
    this.authenticated= this.authService.isAuthenticated();
  }

}
