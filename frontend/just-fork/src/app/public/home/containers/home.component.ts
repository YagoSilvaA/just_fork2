import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { PublicService } from "../../public.service";
import { baseUrl } from "src/environments/environment";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    
    restaurants: any;
    userLog: boolean = false;
    adminLog: boolean = false;  
    userName: string = ""; 
    logged: boolean = false; 
    image_default: string = `${baseUrl}uploads/1635281441424.jpg`; 

    constructor(private publicService: PublicService, private cookieService: CookieService) {}

    ngOnInit(){
        this.getPermissionUser();
        this.getRestaurants();
        this.itsLog();
    }

    getRestaurants(){
        this.publicService.getRestaurants().subscribe(
            response => this.restaurants = response,
            error => console.log(error)
        ) 
    }

    getPermissionUser(){
        const value: string = this.cookieService.get('token');
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
        }
    }

    itsLog(){
        const value: string = this.cookieService.get('token');
        if(value){
            this.logged = true; 
        }
    }

    delCookie(){
        console.log("probar")
        const value: string = this.cookieService.get('token');
        this.cookieService.delete('token');
        console.log(value); 
        location.reload();
    }

    getId(data: number){
        console.log(data);
        window.location.href= window.location.origin + "#/menu/"+data; 
    }
}