import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
    public btn_bool = true;
    public usedBtnUs = true;
    public usedBtnAdm = false;
    constructor() {}

    ngOnInit(){}

    changeLogin(){
        if (this.btn_bool == true){
            this.usedBtnUs = false; 
            this.usedBtnAdm = true; 
            this.btn_bool = false; 
        } else {
            this.usedBtnUs = true; 
            this.usedBtnAdm = false; 
            this.btn_bool = true; 
        }
    }
}