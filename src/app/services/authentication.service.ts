import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    public token: string;
    public currentUserDatails;
    public loggedIn: boolean;


    public apiUrl = 'http://localhost:62189/';

    constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelper) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('certauthCurrentUser'));
        this.token = currentUser && currentUser.accessToken;
        this.currentUserDatails = currentUser;
    }

    private parseData(res: Response) {
        return res || {};
    }

    private handleError(error: Response | any) {
        let errorMessage: string;

        errorMessage = error.error ? error.error : error.toString();


        // This returns another Observable for the observer to subscribe to
        return Observable.throw(errorMessage);
    }

    // login(username: string, password: string): Observable<TokenResponse> {
    //     return this.http.post(this.apiUrl + 'tokens', { UserName: username, Password: password, grant_type: 'password' })
    //         .map(this.parseData)
    //         .catch(this.handleError);

    // }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('certauthCurrentUser');
    }

    refreshToken(req: HttpRequest<any>, next: HttpHandler, refreshToken: string): void {

        //  // rrc
        //console.log("inside refreshToken(req: HttpRequest<any>, next: HttpHandler, refreshToken: string)...");
        // console.log(req);
        // console.log(next);
        // console.log(refreshToken);
        //  // rrc

        // this.http.post(this.apiUrl + 'tokens', { UserName: '', Password: '', grant_type: 'refresh_token', RefreshToken: refreshToken })
        //     .subscribe((data: TokenResponse) => {
        //         if (data.accessToken) {
        //             localStorage.setItem('certauthCurrentUser', JSON.stringify(data));
        //             this.token = data.accessToken;
        //             this.loggedIn = true;

        //             // re-perform the request

        //             next.handle(req);
        //         }
        //         else {
        //             this.token = null;
        //             this.loggedIn = false;
        //             this.router.navigateByUrl('/login');
        //         }
        //     });

    }



} // ends export class


interface TokenResponse {
    accessToken: string,
    refreshToken: string,
    userName: string,
    userId: number,
    email: string

}

