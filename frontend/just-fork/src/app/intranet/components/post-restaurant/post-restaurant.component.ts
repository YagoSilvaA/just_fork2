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
    form = true;
    selectedFile: File | any = null;
    formGroup: FormGroup | any;
    restaurants: any;
    
    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(){
        this.initForm();
        this.searchPermission();
    }

    initForm(){
        this.formGroup = new FormGroup({
            restaurant_name: new FormControl('', [Validators.required]),
            ubication: new FormControl('', [Validators.required]),
            imageUrl: new FormControl(''),
        })
    }

    postRestaurant(){
        if(this.formGroup.valid){ 
            this.intranetService.postRestaurants(this.formGroup.value).subscribe(result => {
                if(result){
                    alert("Su restaurante fue creado con exito, por favor vuelva a logearse")
                    window.location.href= window.location.origin + "#/auth"; 
                    this.delCookie(); 
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
                    console.log(result.url)
                    this.formGroup.value.imageUrl = "localhost:7899/uploads/" + result.url; 
                    this.postRestaurant();
                }
            })
        }
    }

    delCookie(){
        const value: string = this.cookieService.get('token');
        this.cookieService.delete('token');
        console.log(value); 
    }

    searchPermission(){
        this.intranetService.getPermission().subscribe(result => {
        }, err => {
            alert("No tiene los permisos requeridos para entrar a la pagina"); 
            window.location.href= window.location.origin + "#/admin"; 
        })
    }
    moverForm(){
        if(this.formGroup.valid){     
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