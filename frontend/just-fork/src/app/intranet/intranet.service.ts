import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators"; 
import { baseUrl } from "src/environments/environment";

@Injectable()

export class IntranetService{
    constructor(private http: HttpClient) {}

    postRestaurants(data: any): Observable<any> {
        return this.http.post(`${baseUrl}restaurants`, data).pipe(
            catchError(this.handleError)
        )
    }

    postImage(data: any): Observable<any> {
        return this.http.post(`${baseUrl}images/upload`, data).pipe(
            catchError(this.handleError)
        )
    }

    patchRestaurant(data: any): Observable<any> {
        return this.http.patch(`${baseUrl}restaurants`, data).pipe(
            catchError(this.handleError)
        )
    }

    getRestaurantsData(): Observable<any> {
        return this.http.get(`${baseUrl}restaurants/data/personal`).pipe(
            catchError(this.handleError)
        )
    }

    getPermission(): Observable<any> {
        return this.http.get(`${baseUrl}permission`).pipe(
            catchError(this.handleError)
        )
    }

    getPedidos(): Observable<any> {
        return this.http.get(`${baseUrl}pedido/user`).pipe(
            catchError(this.handleError)
        )
    }

    postMenus(data: any): Observable<any> {
        return this.http.post(`${baseUrl}menu`, data).pipe(
            catchError(this.handleError)
        )
    }

    getMenuofRestaurant(id: number): Observable<any>{
        return this.http.get(`${baseUrl}menu/`+id).pipe(
            catchError(this.handleError)
        )
    }

    patchMenu(data: any, id: number): Observable<any>{
        return this.http.patch(`${baseUrl}menu/`+id, data).pipe(
            catchError(this.handleError)
        )
    }

    getMenuData(idr: number, idm: number): Observable<any>{
        return this.http.get(`${baseUrl}menu/`+idr+'/'+idm).pipe(
            catchError(this.handleError)
        )
    }

    getRestaurantData(id:number): Observable<any>{
        return this.http.get(`${baseUrl}restaurants/`+id).pipe(
            catchError(this.handleError)
        )
    }

    getMyPedido(id:number): Observable<any>{
        return this.http.get(`${baseUrl}pedido/user/`+id).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(error: Response) {
        console.log(error);
        const msg = "Error status code" + error.status + "status" + error.statusText;
        return throwError(msg); 
    }
}