import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { PublicService } from "../public.service";


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
    visible: boolean = false; 
    islog: boolean = false;
    userLog: boolean = false;
    adminLog: boolean = false;  
    userName: string = ""; 
    notlog: boolean = false; 


    constructor(private publicService: PublicService, private cookieService: CookieService) {}

    ngOnInit(){
        this.userName = ""; 
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
      }, 400);
      }
    
      getPermissionUser(){
        const value: string = this.cookieService.get('token');
        console.log(value)
        if(value){
            this.publicService.getPermissionAdmin().subscribe(
                result => {
                    this.adminLog = true; 
                    this.userName = result; 
                }, err => {
                }
            )
            this.publicService.getPermissionUser().subscribe(
                result => {
                    this.userLog = true; 
                    this.userName = result; 
                }, err => {
                }
            )
        }else {
            console.log("asew")
            this.notlog = true; 
        }
      }

      logOut(){
        console.log("adas");
        const value: string = this.cookieService.get('token');
        this.cookieService.delete('token');
      }
}