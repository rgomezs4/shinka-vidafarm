import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ProviderService {
    url = "http://localhost:3000/api/v1/provider";

    constructor(private http: HttpClient) { }

    getAll(): Promise<any> {
        return this.http.get(this.url).toPromise();
    }

    getById(id: string): Promise<any> {
        return this.http.get(`${this.url}/${id}`).toPromise();
    }

    update(id: string, provider: any): Promise<any> {
        const date = new Date()
        provider.LastUpdated = date.toISOString();
        provider.LastUpdatedBy = localStorage.getItem("userId")
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.put(`${this.url}/${id}`, provider, httpOptions).toPromise();
    }

    insert(provider: any): Promise<any> {
        const date = new Date()
        provider.LastUpdate = date.toISOString();
        provider.LastUpdateBy = localStorage.getItem("userId")
        provider.CreatedDate = date.toISOString();
        provider.CreatedBy = localStorage.getItem("userId")
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(this.url, provider, httpOptions).toPromise();
    }
}
