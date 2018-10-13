import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ClientService {
    url = "http://localhost:3000/api/v1/client";

    constructor(private http: HttpClient) { }

    getAll(): Promise<any> {
        return this.http.get(this.url).toPromise();
    }

    getById(id: string): Promise<any> {
        return this.http.get(`${this.url}/${id}`).toPromise();
    }

    update(id: string, client: any): Promise<any> {
        const date = new Date()
        client.LastUpdate = date.toISOString();
        client.LastUpdateBy = localStorage.getItem("userId")
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.put(`${this.url}/${id}`, client, httpOptions).toPromise();
    }

    insert(client: any): Promise<any> {
        const date = new Date()
        client.LastUpdate = date.toISOString();
        client.LastUpdateBy = localStorage.getItem("userId")
        client.CreatedDate = date.toISOString();
        client.CreatedBy = localStorage.getItem("userId")
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(this.url, client, httpOptions).toPromise();
    }

    search(criteria: any): Promise<any> {
        return this.http.get(`${this.url}/search/${criteria}`).toPromise();
    }
}
