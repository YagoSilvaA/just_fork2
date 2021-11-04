import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { PublicService } from "src/app/public/public.service";
import { baseUrl } from "src/environments/environment";
import { Pedido } from "src/app/core/models/models";



@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    menus: any;
    restaurant_str: string | any; 
    restaurantId: number | any;
    image_default: string = `${baseUrl}uploads/1635281441424.jpg`; 
    cantidad: number = 0;  
    visualCompra: boolean = true; 
    pedido: string | any; 
    monto: number = 0; 
    dividir: string | any; 
    lista: string[] = []; 
    visual: boolean = false;
    noMenu: boolean = false; 
    menu_compilado: boolean = false; 
    compilador: any = [];

    private result_pedido: Pedido | any;

    constructor(private publicService: PublicService, private cookieService: CookieService, 
        private activateRouter: ActivatedRoute, private router: Router) {}

    ngOnInit(){
        this.getRestaurantId();
        this.getMenuofRestaurant();  
        this.pedido = ""; 
        let timerId = setInterval(() => {
            if(this.noMenu == true){
                alert("Este restaurante no tiene un menu disponible por el momento"); 
                window.location.href= window.location.origin + "#/home"; 
                clearInterval (timerId)
            } else {
                if(this.restaurantId != undefined && this.menus != undefined){
                    this.visual = true; 
                    clearInterval (timerId)
                } else {
                    console.log("cargando")
                }
            }
        }, 500);
    }

    canBuy(){
        this.visual = false; 
        const value: string = this.cookieService.get('token');
        if(!value){
            var opcion = confirm("Al parecer no estar registrado o no estar logeado, ¿quieres hacerlo?")
            if(opcion == true)window.location.href= window.location.origin + "#/auth"; 
        } else {
            this.monto = Math.round((this.monto + Number.EPSILON) * 100) / 100;
            this.result_pedido = {
                monto: this.monto,
                pedidosId: this.pedido,
                restaurantId: this.restaurantId,
            }
            this.dividir = this.pedido; 
            this.lista = Array.from(this.dividir); 
            this.lista.sort(); 
            this.visualCompra = false; 
            this.showPedidos(); 
        }
    }

    getMenuData(idR: number, idM: number){
        this.publicService.getMenuData(idR, idM).subscribe(result => {
            this.compilador.push(result); 
            if(this.compilador.length == this.lista.length){
                this.visual = true; 
                this.menu_compilado = true;
            }
        }, error => console.log(error))
    }

    showPedidos(){
        for (let i=0; i < this.lista.length; i++) {
            let id = parseInt(this.lista[i])
            setTimeout(() => {
                this.getMenuData(this.restaurantId, id)
            }, 100*i);
        }
    }

    getRestaurantId(){
        this.restaurant_str =  this.activateRouter.snapshot.paramMap.get('id');
        this.restaurantId =  this.restaurant_str; 
        this.restaurantId = parseInt(this.restaurantId); 
    }

    getMenuofRestaurant(){
        this.publicService.getMenuofRestaurant(this.restaurantId).subscribe(result => {
            this.menus = result; 
            }, error => {
                this.noMenu = true; 
            }
        )
    }

    aumentar(data: number, precio: number){
        this.cantidad += 1; 
        this.pedido += data; 
        this.monto += precio; 
    }

    descartar(data: number, precio: number){
        if(!this.pedido.includes(data)){
            alert("Este elemento no fue previamente seleccionado")
        } else {
            this.monto -= precio; 
            this.cantidad -= 1; 
            this.pedido = this.pedido.replace(data, '') 
        }
    }

    postPedido(){
        this.publicService.postPedido(this.result_pedido, this.restaurantId).subscribe(result => {
            console.log(result); 
            alert("Pedido creado satisfacctoriamente");
            window.location.href= window.location.origin + "#/home"; 
            }, error => {
                console.log(error);
            }
        )
    }

    return(){
        this.visualCompra = true;
        if(this.menu_compilado == true){
            this.menu_compilado = false; 
            this.compilador = [];
        } else {
            this.menu_compilado = true;
        }
    }

    confirmar(){
        this.postPedido()
    }

}