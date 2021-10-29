import { Component, OnInit } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PublicService } from "src/app/public/public.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    public isLogVisible = true;
    formGroup: FormGroup | any;
    constructor(private publicService: PublicService, private cookieService: CookieService) {}

    ngOnInit(){
        this.initForm();
    }

    changeLogin(){
        if (this.isLogVisible == true){
            this.isLogVisible = false; 
        } else {
            this.isLogVisible = true; 
        }
    }

    initForm(){
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        })
    }
    loginProcessUser(){
        if(this.formGroup.valid){ 
            this.publicService.loginUser(this.formGroup.value).subscribe(result => {
                if(result.token){
                    console.log(result.token);
                    this.cookieService.set('token', result.token);
                }
            }, err => {
                alert("Los datos dados no estan registrados");
            })
        }
    }
    loginProcessAdmin(){
        if(this.formGroup.valid){ 
            this.publicService.loginAdmin(this.formGroup.value).subscribe(result => {
                if(result.token){
                    console.log(result.token);
                    this.cookieService.set('token', result.token);
                }
            }, err => {
                alert("Los datos dados no estan registrados");
            })
        }
    }
}