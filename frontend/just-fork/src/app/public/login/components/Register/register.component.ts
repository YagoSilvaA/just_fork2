import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PublicService } from "src/app/public/public.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    public isRegVisible = true;
    formGroup: FormGroup | any;
    constructor(private publicService: PublicService) {}

    ngOnInit(){
        this.initForm();
    }

    changeLogin(){
        if (this.isRegVisible == true){
            this.isRegVisible = false; 
        } else {
            this.isRegVisible = true; 
        }
    }

    initForm(){
        this.formGroup = new FormGroup({
            user_name: new FormControl('', [Validators.required]),
            user_lname: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            ubication: new FormControl('', [Validators.required])
        })
    }
    registerProcessUser(){
        if(this.formGroup.valid){ 
            this.publicService.postUser(this.formGroup.value).subscribe(result => {
                if(result){
                    console.log(result);
                }
            })
        }
    }
    registerProcessAdmin(){
        if(this.formGroup.valid){ 
            this.publicService.postAdmin(this.formGroup.value).subscribe(result => {
                if(result){
                    console.log(result);
                }
            })
        }
    }
}