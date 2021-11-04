import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { IntranetService } from "../../intranet.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class MyComponent implements OnInit {
    
    visual : boolean = false;
    form : boolean = false;
    cambiar: boolean = true; 
    formGroup: FormGroup | any;
    user: any = 0;
    permiso: number = 0;
    email: string = ""; 
    
    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(){
        this.searchPermission();
        this.getUserData(); 
        let timerId = setInterval(() => {
            if(this.user != 0){
                this.email = this.user.email; 
                this.patchForm(); 
                this.visual = true; 
                clearInterval (timerId)
            }
        }, 500);
    }

    patchForm(){
        this.formGroup = new FormGroup({
            email: new FormControl(this.user.email),
            ubication: new FormControl(this.user.ubication),
            password: new FormControl('', [Validators.required]),
            cpassword: new FormControl('', [Validators.required]) 
        })
    }

    patchUser(){
        if(this.formGroup.valid){
            if(this.formGroup.value.email == this.email){
                this.formGroup.value.email = undefined
            }
            if(this.formGroup.value.password == this.formGroup.value.cpassword){
                if(this.permiso == 0){
                    this.intranetService.PatchUserData(this.formGroup.value).subscribe(result => {
                        if(result){
                            console.log(result);
                            window.location.href= window.location.origin + "#/home"; 
                        }
                    }, err => console.log(err))
                }else {
                    this.intranetService.PatchAdminData(this.formGroup.value).subscribe(result => {
                        if(result){
                            console.log(result);
                            window.location.href= window.location.origin + "#/home"; 
                        }
                    }, err => console.log(err))
                }
            } else {
                alert("Las contraseñas no son las mismas")
            }
        } else {
            alert("Por favor si hara cambios complete el formulario")
        }
    }

    getUserData(){
        this.intranetService.getUserData().subscribe(
            response => this.user = response,
            error => console.log(error),
        )
        if(this.user == 0){
            this.intranetService.getAdminData().subscribe(
                response => this.user = response,
                error => console.log(error),
            )
        }
    }

    searchPermission(){
        this.intranetService.getMyPermiso().subscribe(result => {
            this.permiso = result; 
        }, err => {
            alert("No tiene los permisos requeridos para entrar a la pagina"); 
            window.location.href= window.location.origin + "#/home"; 
        })
    }

    permitirCambio(){
        if(this.form == true){
            this.form = false; 
            this.cambiar = true;
        } else {
            this.form = true; 
            this.cambiar = false; 
        }
    }

    logOut(){
        const value: string = this.cookieService.get('token');
        this.cookieService.delete('token');
        window.location.href= window.location.origin + "#/home"; 
      }
}