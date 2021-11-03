import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { IntranetService } from "src/app/intranet/intranet.service";

@Component({
    selector: 'app-intranet-menu',
    templateUrl: './intranet-menu.component.html',
    styleUrls: ['./intranet-menu.component.scss']
})


export class IntranetMenusComponent implements OnInit {
    public btn_bool = true;

    
    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(){
    }

    changeBtn(){
        if(this.btn_bool == true){
            this.btn_bool = false; 
        }else {
            this.btn_bool = true;
        }
    }
}