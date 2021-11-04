import { HttpClient, HttpResponseBase } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { RestaurantePedido } from "src/app/core/models/models";
import { IntranetService } from "src/app/intranet/intranet.service";
import { baseUrl } from "src/environments/environment";

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.component.html',
    styleUrls: ['./pedidos.component.scss']
})

export class PedidoComponent implements OnInit {

    pedidos: any;
    restaurants: any;
    restaurantId: number = 0; 
    compilador: any = [];
    visual: boolean = false; 
    image_default: string = `${baseUrl}uploads/1635281441424.jpg`; 
    noPedido: boolean = true; 
    private modelo: RestaurantePedido | any; 

    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService) {}
    
    ngOnInit(){
        this.getPedidos(); 
        let timerPedido = setInterval(() => {
            if(this.noPedido == false){
                alert("No tiene pedidos registrados")
                window.location.href= window.location.origin + "#/home"; 
                clearInterval (timerPedido)
            } else {
                if(this.pedidos != undefined){
                    this.showPedidos();  
                    clearInterval (timerPedido)
                } else {
                    console.log("No carga")
                }
            }
        }, 500);

        let timerId = setInterval(() => {
            if(this.noPedido == true){
                if(this.compilador.length == this.pedidos.length){
                    this.visual = true; 
                    clearInterval (timerId)
                } else {
                    console.log("No carga")
                }
            }
        }, 500);
    }

    getPedidos(){
        this.intranetService.getPedidos().subscribe(
            response => this.pedidos = response,
            error => {
                console.log(error);
                this.noPedido = false; 
            }
        ) 
    }

    getRestaurantData(id: number, pedidoId: number){
        this.intranetService.getRestaurantData(id).subscribe(
            response =>{
                this.restaurants = response;
                this.modelo = {
                    restaurant_name: response.restaurant_name,
                    imageUrl: response.imageUrl,
                    pedidoId: pedidoId
                }
                this.compilador.push(this.modelo); 
            }, error => console.log(error)
        )
    }

    showPedidos(){
        for (let i=1; i<this.pedidos.length+1; i++) {
            setTimeout(() => {
                let id = (this.pedidos.length-1) - (i-1)
                this.restaurantId = this.pedidos[id].restaurantId; 
                this.getRestaurantData(this.restaurantId, this.pedidos[id].id); 
            }, 100*i);
        }
    }

    redirigirId(data:number){
        window.location.href= window.location.origin + "#/admin/mostrar-pedido/"+data; 
    }
}