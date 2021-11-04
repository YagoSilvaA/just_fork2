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
    resId: number = -1; 

    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(){
        this.getRestaurantData();
        this.searchPermission(); 
        this.getMyResId(); 
        let timerId = setInterval(() => {
            if(this.resId == 0){
                alert("No hay restaurante a su nombre, vamos a crear uno!");
                window.location.href= window.location.origin + "#/admin/postR"; 
                clearInterval (timerId)
            } else {
                if(this.restaurants != undefined){
                    this.isRegx = true; 
                    clearInterval (timerId)
                } else {
                    console.log("No carga")
                }
            }
        }, 500);
    }

    getRestaurantData(){
        this.intranetService.getRestaurantsData().subscribe(
            response => this.restaurants = response,
            error => console.log(error),
        )
    }

    getMyResId(){
        this.intranetService.getMyResId().subscribe(
            response => this.resId = response.id, 
            error => console.log(error), 
        )
    }
    
    searchPermission(){
        this.intranetService.getPermission().subscribe(result => {
        }, err => {
            alert("No tiene los permisos requeridos para entrar a la pagina"); 
            window.location.href= window.location.origin + "#/home"; 
        })
    }
}