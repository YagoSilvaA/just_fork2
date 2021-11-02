import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { PublicService } from "src/app/public/public.service";
import { baseUrl } from "src/environments/environment";



@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    menus: any;
    restaurantId: string | any; 
    image_default: string = `${baseUrl}uploads/1635281441424.jpg`; 
    cantidad: number = 0;  
    visualCompra: boolean = false; 
    pedido: string | any; 
    constructor(private publicService: PublicService, private cookieService: CookieService, 
        private activateRouter: ActivatedRoute, private router: Router) {}

    ngOnInit(){
        this.getRestaurantId();
        this.getMenuofRestaurant();  
        this.pedido = ""; 
    }

    getRestaurantId(){
        this.restaurantId =  this.activateRouter.snapshot.paramMap.get('id');
    }

    getMenuofRestaurant(){
        this.publicService.getMenuofRestaurant(this.restaurantId).subscribe(result => {
            this.menus = result; 
            }, error => {
                console.log(error);
            }
        )
    }


    aumentar(data: number){
        this.cantidad += 1; 
        console.log(data);
        this.pedido += data; 
        console.log(this.pedido); 

    }

    descartar(data: number){
        if(!this.pedido.includes(data)){
            alert("Este elemento no fue previamente seleccionado")
        } else {
            this.cantidad -= 1; 
            console.log(data);
            this.pedido = this.pedido.replace(data, '') 
            console.log(this.pedido); 
        }
    }

}