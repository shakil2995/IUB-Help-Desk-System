import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

// const headers = new HttpHeaders();
// headers.append('Content-Type', 'application/json');

// No-auth headers
const authHeaders = new HttpHeaders({'No-Auth': 'True'});
authHeaders.append('Content-Type', 'application/json');
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    loginApi = '';
    redirectUrl:any = null;
    public isloggedIn: boolean;
    constructor(
        private http: HttpClient) {
         }
    login(data: any): Observable<any> {
        return this.http.post<any>(environment.login , data, {headers: authHeaders});
    }
    register(data: any): Observable<any> {
        return this.http.post<any>(environment.register , data,  {headers: authHeaders});
    }
}
