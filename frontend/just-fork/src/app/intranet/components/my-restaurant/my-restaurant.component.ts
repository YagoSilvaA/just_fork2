import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { baseUrl } from "src/environments/environment";
import { IntranetService } from "../../intranet.service";

@Component({
    selector: 'app-my-restaurant',
    templateUrl: './my-restaurant.component.html',
    styleUrls: ['./my-restaurant.component.scss']
})

export class MyRestaurantComponent implements OnInit {
    isRegVisible = true;
    isRegx = false;
    selectedFile: File | any = null;
    formGroup: FormGroup | any;
    patchGroup: FormGroup | any;
    restaurants: any;
    image_default: string = `${baseUrl}uploads/1635281441424.jpg`; 

    private imageUrl: string = ""; 
    
    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(){
        this.getRestaurantData();
        setTimeout(() => {
            this.isRegx = true; 
        }, 3000);
        this.searchPermission(); 
    }

    getRestaurantData(){
        this.intranetService.getRestaurantsData().subscribe(
            response => this.restaurants = response,
            error => console.log(error),
        )
    }
    
    mostrarData(){
        console.log(this.restaurants);
    }

    searchPermission(){
        this.intranetService.getPermission().subscribe(result => {
        }, err => {
            alert("No tiene los permisos requeridos para entrar a la pagina"); 
            window.location.href= window.location.origin + "#/home"; 
        })
    }
}