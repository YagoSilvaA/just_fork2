import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { IntranetService } from "../../intranet.service";

@Component({
    selector: 'app-patch-restaurant',
    templateUrl: './patch-restaurant.component.html',
    styleUrls: ['./patch-restaurant.component.scss']
})

export class PatchRestaurantComponent implements OnInit {
    visual : boolean = false;
    form : boolean = true;
    selectedFile: File | any = null;
    patchGroup: FormGroup | any;
    restaurants: any;
    
    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(){
        this.searchPermission();
        this.getRestaurantData();
        let timerId = setInterval(() => {
            if(this.restaurants != undefined){
                this.patchForm(); 
                this.visual = true; 
                clearInterval (timerId)
            } else {
                console.log("No carga")
            }
        }, 500);
    }

    patchForm(){
        this.patchGroup = new FormGroup({
            restaurant_name: new FormControl(this.restaurants.restaurant_name),
            ubication: new FormControl(this.restaurants.ubication),
            imageUrl: new FormControl('') 
        })
    }

    patchRestaurant(){
        if(this.patchGroup.valid){
            this.intranetService.patchRestaurant(this.patchGroup.value).subscribe(result => {
                if(result){
                    console.log(result);
                    window.location.href= window.location.origin + "#/admin/mi-restaurante"; 
                }
            })
        }
    }

    onFileSelected(event: any){
        this.selectedFile = <File>event.target.files[0];
    }

    postImage(){
        const fd = new FormData;
        if(this.selectedFile == null){
            alert("No se selecciono ninguna imagen"); 
        } else {
            fd.append('image', this.selectedFile, this.selectedFile.name);
            this.intranetService.postImage(fd).subscribe(result => {
                if(result){
                    this.patchGroup.value.imageUrl = "localhost:7899/uploads/" + result.url; 
                    this.patchRestaurant(); 
                } 
            })
        }
    }


    getRestaurantData(){
        this.intranetService.getRestaurantsData().subscribe(
            response => this.restaurants = response,
            error => console.log(error),
        )
    }

    searchPermission(){
        this.intranetService.getPermission().subscribe(result => {
        }, err => {
            alert("No tiene los permisos requeridos para entrar a la pagina"); 
            window.location.href= window.location.origin + "#/admin"; 
        })
    }
    moverForm(){
        if(this.patchGroup.valid){     
            if(this.form == false){
                this.form = true; 
            } else {
                this.form = false;  
            }
        } else {
            alert("Por favor complete el formulario")
        }
    }
}