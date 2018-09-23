import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserService {
    url = "http://localhost:3000/api/v1/user";

    constructor(private http: HttpClient) { }

    login(credentials: any): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(`${this.url}/auth`, credentials, httpOptions).toPromise();
    }
}
