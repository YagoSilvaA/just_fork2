import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators"; 
import { baseUrl } from "src/environments/environment";

@Injectable()

export class PageService{
    constructor(private http: HttpClient) {}

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

    private handleError(error: Response) {
        console.log(error);
        const msg = "Error status code" + error.status + "status" + error.statusText;
        return throwError(msg); 
    }
}