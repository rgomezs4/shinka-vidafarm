import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class CorrelativeService {
    url = "http://localhost:3000/api/v1/invoicecorrelative";

    constructor(private http: HttpClient) { }

    getAll(): Promise<any> {
        return this.http.get(this.url).toPromise();
    }

    getById(id: string): Promise<any> {
        return this.http.get(`${this.url}/${id}`).toPromise();
    }

    update(id: string, correlative: any): Promise<any> {
        const date = new Date()
        correlative.LastUpdated = date.toISOString();
        correlative.LastUpdatedBy = localStorage.getItem("userId")
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.put(`${this.url}/${id}`, correlative, httpOptions).toPromise();
    }

    insert(correlative: any): Promise<any> {
        const date = new Date()
        correlative.LastUpdated = date.toISOString();
        correlative.LastUpdatedBy = localStorage.getItem("userId")
        correlative.CreatedDate = date.toISOString();
        correlative.CreatedBy = localStorage.getItem("userId")
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(this.url, correlative, httpOptions).toPromise();
    }
}
