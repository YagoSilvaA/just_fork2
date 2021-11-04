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
    image_default: string = `${baseUrl}uploads/1635281441424.jpg`; 

    constructor(private publicService: PublicService, private cookieService: CookieService) {}

    ngOnInit(){
        this.getRestaurants();
    }

    getRestaurants(){
        this.publicService.getRestaurants().subscribe(
            response => this.restaurants = response,
            error => console.log(error)
        ) 
    }

    getId(data: number){
        console.log(data);
        window.location.href= window.location.origin + "#/menu/"+data; 
    }
}