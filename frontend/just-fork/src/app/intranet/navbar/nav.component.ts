import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { PublicService } from "src/app/public/public.service";
import { IntranetService } from "../intranet.service";


@Component({
    selector: 'app-navI',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})

export class NavComponentIntra implements OnInit {
    visible: boolean = false; 
    islog: boolean = false;
    userLog: boolean = false;
    adminLog: boolean = false;  
    userName: string = ""; 
    notlog: boolean = false; 


    constructor(private intranetService: IntranetService, private cookieService: CookieService) {}

    ngOnInit(){
        this.getPermissionUser(); 
        let timerId = setInterval(() => {
            if(this.notlog == true){
                this.visible = true; 
                clearInterval (timerId)
            }
          if(this.userName != ""){
              this.visible = true; 
              console.log(this.adminLog); 
              clearInterval (timerId)
          }
      }, 100);
      }
    
      getPermissionUser(){
        const value: string = this.cookieService.get('token');
        console.log("ad")
        console.log(value)
        if(value){
            this.intranetService.getPermissionAdmin().subscribe(
                result => {
                    this.adminLog = true; 
                    this.userName = result; 
                }, err => {
                }
            )
            this.intranetService.getPermissionUser().subscribe(
                result => {
                    this.userLog = true; 
                    this.userName = result; 
                }, err => {
                }
            )
        }else {
            this.notlog = true; 
        }
      }
      logOut(){
        const value: string = this.cookieService.get('token');
        this.cookieService.delete('token');
      }
}