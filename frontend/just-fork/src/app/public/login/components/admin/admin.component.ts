import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PublicService } from "src/app/public/public.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminLogComponent implements OnInit {
    public isLogVisible = true;
    formGroupRegister: FormGroup | any;
    formGroupLogin: FormGroup | any;
    
    constructor(
        private publicService: PublicService, private cookieService: CookieService
    ) {}
    
    ngOnInit(){
        this.initForm();
    }

    changeLogin(){
        this.isLogVisible = !this.isLogVisible;
    }

    initForm(){
        this.formGroupRegister = new FormGroup({
            user_name: new FormControl('', [Validators.required]),
            user_lname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            ubication: new FormControl('', [Validators.required])
        })
        this.formGroupLogin = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        })
    }

    registerProcessAdmin(){
        if(this.formGroupRegister.valid){ 
            this.publicService.postAdmin(this.formGroupRegister.value).subscribe(result => {
                if(result){
                    console.log(result);
                    location.reload();
                }
            })
        }
    }

    loginProcessAdmin(){
        if(this.formGroupLogin.valid){ 
            this.publicService.loginAdmin(this.formGroupLogin.value).subscribe(result => {
                if(result.token){
                    console.log(result.token);
                    this.cookieService.set('token', result.token);
                    window.location.href= window.location.origin + "#/home"; 
                }
            }, err => {
                alert("Los datos dados no estan registrados");
            })
        }
    }
}
