import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { IntranetService } from "../../intranet.service";

@Component({
    selector: 'app-post-restaurant',
    templateUrl: './post-restaurant.component.html',
    styleUrls: ['./post-restaurant.component.scss']
})

export class PostRestaurantComponent implements OnInit {
    isRegVisible = true;
    isRegx = false;
    selectedFile: File | any = null;
    formGroup: FormGroup | any;
    patchGroup: FormGroup | any;
    restaurants: any;
    private imageUrl: string = ""; 
    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(){
        this.initForm();
        this.searchPermission();
    }

    initForm(){
        this.formGroup = new FormGroup({
            restaurant_name: new FormControl('', [Validators.required]),
            ubication: new FormControl('', [Validators.required])
        })
    }

    patchForm(){
        this.patchGroup = new FormGroup({
            restaurant_name: new FormControl(this.restaurants.restaurant_name),
            ubication: new FormControl(this.restaurants.ubication),
            imageUrl: new FormControl('') 
        })
    }

    postRestaurant(){
        if(this.formGroup.valid){ 
            this.intranetService.postRestaurants(this.formGroup.value).subscribe(result => {
                if(result){
                    window.location.href= window.location.origin + "#/auth"; 
                    console.log(result);
                    this.delCookie(); 
                }
            })
        }
    }

    patchRestaurant(){
        if(this.patchGroup.valid){
            this.patchGroup.value.imageUrl = this.imageUrl; 
            this.intranetService.patchRestaurant(this.patchGroup.value).subscribe(result => {
                if(result){
                    console.log(result);
                }
            })
        }
    }

    onFileSelected(event: any){
        this.selectedFile = <File>event.target.files[0];
    }

    postImage(){
        const fd = new FormData;
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.intranetService.postImage(fd).subscribe(result => {
            if(result){
                console.log(result.url)
                this.imageUrl = "localhost:7899/uploads/" + result.url; 
            }
        })
    }

    delCookie(){
        const value: string = this.cookieService.get('token');
        this.cookieService.delete('token');
        console.log(value); 
    }

    getRestaurantData(){
        this.intranetService.getRestaurantsData().subscribe(
            response => this.restaurants = response,
            error => console.log(error),
        )
    }
    mostrarData(){
        console.log(this.restaurants.restaurant_name);
        console.log(this.restaurants);
    }
    actualizarForm(){
        this.isRegx = true; 
        this.patchForm(); 
    }

    searchPermission(){
        this.intranetService.getPermission().subscribe(result => {
        }, err => {
            alert("No tiene los permisos requeridos para entrar a la pagina"); 
            window.location.href= window.location.origin + "#/admin"; 
        })
    }
}