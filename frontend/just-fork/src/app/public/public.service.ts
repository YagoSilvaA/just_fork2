import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators"; 
import { baseUrl } from "src/environments/environment";

@Injectable()

export class PublicService{
    constructor(private http: HttpClient) {}

    getRestaurants(): Observable<any> {
        return this.http.get(`${baseUrl}restaurants`).pipe(
            catchError(this.handleError)
        )
    }

    loginUser(data: any): Observable<any>{
        return this.http.post(`${baseUrl}user/login`, data).pipe(
            catchError(this.handleError)
        )
    }

    postUser(data: any): Observable<any>{
        return this.http.post(`${baseUrl}user/sign-up`, data).pipe(
            catchError(this.handleError)
        )
    }

    loginAdmin(data: any): Observable<any>{
        return this.http.post(`${baseUrl}user_admin/login`, data).pipe(
            catchError(this.handleError)
        )
    }

    postAdmin(data: any): Observable<any>{
        return this.http.post(`${baseUrl}user_admin/sign-up`, data).pipe(
            catchError(this.handleError)
        )
    }

    getPermissionUser(): Observable<any> {
        return this.http.get(`${baseUrl}user/permission`).pipe(
            catchError(this.handleError)
        )
    }

    getPermissionAdmin(): Observable<any> {
        return this.http.get(`${baseUrl}user_admin/permission`).pipe(
            catchError(this.handleError)
        )
    }

    getMenuofRestaurant(id: number): Observable<any>{
        return this.http.get(`${baseUrl}menu/`+id).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(error: Response) {
        console.log(error);
        const msg = "Error status code" + error.status + "status" + error.statusText;
        return throwError(msg); 
    }
}