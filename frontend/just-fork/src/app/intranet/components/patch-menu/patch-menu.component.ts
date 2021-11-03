import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { IntranetService } from "src/app/intranet/intranet.service";

@Component({
    selector: 'app-patch-menu',
    templateUrl: './patch-menu.component.html',
    styleUrls: ['./patch-menu.component.scss']
})

export class PatchMenusComponent implements OnInit {
    form = true;
    visible: boolean = false;
    myGroup: FormGroup | any; 
    menu_str: string | any;
    menuId: number | any;
    restaurants: any; 
    menu: any; 
    selectedFile: File | any = null;
    
    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService,
        private activateRouter: ActivatedRoute, private router: Router) {}

    ngOnInit(){
        this.getRestaurantData();
        this.getMenuId(); 
        setTimeout(() => {
            this.getMenuData();
        }, 1000);
        setTimeout(() => {
            this.initForm();
            this.visible = true; 
        }, 2000);

    }

    initForm(){
        this.myGroup = new FormGroup({
            menu_name: new FormControl(this.menu.menu_name, [Validators.required]),
            precio: new FormControl(this.menu.precio, [Validators.required]),
            imageUrl: new FormControl(this.menu.imageUrl),
        });
    }

    show(){
        this.visible = true; 
    }

    getMenuId(){
        this.menu_str =  this.activateRouter.snapshot.paramMap.get('id');
        this.menuId =  this.menu_str; 
        this.menuId = parseInt(this.menuId); 
    }

    getRestaurantData(){
        this.intranetService.getRestaurantsData().subscribe(
            response => {
                this.restaurants = response;
            },
            error => console.log(error),
        )
    }

    patchMenu(){
        if(this.myGroup.valid){ 
            this.intranetService.patchMenu(this.myGroup.value, this.menuId).subscribe(result => {
                if(result){
                    window.location.href= window.location.origin + "#/admin/all-menus"; 
                }
            })
        }
    }

    getMenuData(){
        this.intranetService.getMenuData(this.restaurants.id, this.menuId).subscribe(result => {
            this.menu = result; 
            console.log(this.menu.menu_name)
        })
    }

    moverForm(){
        if(this.myGroup.valid){     
            if(this.form == false){
                this.form = true; 
            } else {
                this.form = false;  
            }
        } else {
            alert("Por favor complete el formulario")
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
                    this.myGroup.value.imageUrl = "localhost:7899/uploads/" + result.url; 
                    this.patchMenu();
                }
            })
        }
    }
    
}