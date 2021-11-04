import { HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { IntranetService } from "src/app/intranet/intranet.service";
import { baseUrl } from "src/environments/environment";

@Component({
    selector: 'app-show-pedidos',
    templateUrl: './show-pedidos.component.html',
    styleUrls: ['./show-pedidos.component.scss']
})

export class ShowPedidoComponent implements OnInit {

    pedido: any;
    visual: boolean = false; 
    pedido_str: string | any;
    pedidoId: number | any;
    compilador: any = [];
    image_default: string = `${baseUrl}uploads/1635281441424.jpg`; 

    constructor(private intranetService: IntranetService, private http: HttpClient, private cookieService: CookieService,
        private activateRouter: ActivatedRoute, private router: Router) {}
    
    ngOnInit(){
        this.getPedidoId(); 
        this.getMyPedido(); 

        let timerPedido = setInterval(() => {
            if(this.pedido != undefined ){
                this.getMenuFromId();   
                clearInterval (timerPedido)
            } else {
                console.log("No carga")
            }
        }, 500);
        
        let timerId = setInterval(() => {
            if(this.compilador.length == this.pedido.pedidosId.length){
                this.visual = true; 
                clearInterval (timerId)
            } else {
                console.log("No carga")
            }
        }, 500);
    }

    getPedidoId(){
        this.pedido_str =  this.activateRouter.snapshot.paramMap.get('id');
        this.pedidoId =  this.pedido_str; 
        this.pedidoId = parseInt(this.pedidoId); 
    }

    getMyPedido(){
        this.intranetService.getMyPedido(this.pedidoId).subscribe(
            response => this.pedido = response[0],
            error => console.log(error)
        ) 
    }

    getMenuData(idR: number, idM: number){
        this.intranetService.getMenuData(idR, idM).subscribe(result => {
            this.compilador.push(result); 
        }, error => console.log(error))
    }

    getMenuFromId(){
        for (let i=0; i < this.pedido.pedidosId.length; i++) {
            setTimeout(() => {
                this.getMenuData(this.pedido.restaurantId, this.pedido.pedidosId[i])
            }, 100*i);
        }
    }

    redirigir(){
        window.location.href= window.location.origin + "#/admin/mis-pedidos"
    }
}