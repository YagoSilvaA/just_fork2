import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Pedido } from "src/app/core/models/models";
import { IntranetService } from "src/app/intranet/intranet.service";
import { baseUrl } from "src/environments/environment";

@Component({
    selector: 'app-get-menu',
    templateUrl: './get-menu.component.html',
    styleUrls: ['./get-menu.component.scss']
})

export class GetMenusComponent implements OnInit {
    menus: any;
    visual: boolean = false; 
    public restaurant: number | any; 
    image_default: string = `${baseUrl}uploads/1635281441424.jpg`; 

    constructor(private intranetService: IntranetService, private cookieService: CookieService) {}

    ngOnInit(){
        this.getRestaurantId();
        let timerId = setInterval(() => {
            if(this.restaurant != undefined){
                this.getMenuofRestaurant();  
                this.visual = true; 
                clearInterval (timerId)
            } else {
                console.log("No carga")
            }
        }, 500);
    }

    getRestaurantId(){
        this.intranetService.getRestaurantsData().subscribe(result => {
            this.restaurant = result.id        
        })
    }

    getMenuofRestaurant(){
        this.intranetService.getMenuofRestaurant(this.restaurant).subscribe(result => {
            this.menus = result; 
            }, error => {
                console.log(error);
            }
        )
    }

    getId(data: number){
        window.location.href= window.location.origin + "#/admin/patch-menus/"+data; 
    }
}