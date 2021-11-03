import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { IntranetService } from "src/app/intranet/intranet.service";

@Component({
    selector: 'app-post-menu',
    templateUrl: './post-menu.component.html',
    styleUrls: ['./post-menu.component.scss']
})

export class PostMenusComponent implements OnInit {
    form = true;
    selectedFile: File | any = null;
    formGroup: FormGroup | any;
    
    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}

    ngOnInit(){
        this.initForm();
    }

    initForm(){
        this.formGroup = new FormGroup({
            menu_name: new FormControl('', [Validators.required]),
            precio: new FormControl('', [Validators.required])
        })
    }

    postMenus(){
        console.log(this.formGroup.value)
        if(this.formGroup.valid){ 
            this.intranetService.postMenus(this.formGroup.value).subscribe(result => {
                if(result){
                    alert("Se agrego el menu satisfactoriamente"); 
                    this.initForm(); 
                    console.log(result);
                    window.location.href= window.location.origin + "#/admin/all-menus"; 
                }
            }, err => {
                alert("Parece que hubo un problema, intentelo de nuevo más tarde"); 
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
                    this.postMenus();
                }
            })
        }
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