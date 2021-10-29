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

    private handleError(error: Response) {
        console.log(error);
        const msg = "Error status code" + error.status + "status" + error.statusText;
        return throwError(msg); 
    }
}