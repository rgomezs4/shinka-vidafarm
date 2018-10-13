import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class SkuService {
    url = "http://localhost:3000/api/v1/sku";

    constructor(private http: HttpClient) { }

    getAll(): Promise<any> {
        return this.http.get(this.url).toPromise();
    }

    getById(id: string): Promise<any> {
        return this.http.get(`${this.url}/${id}`).toPromise();
    }

    getByBarcode(barcode: string): Promise<any> {
        return this.http.get(`${this.url}/barcode/${barcode}`).toPromise();
    }

    update(id: string, sku: any): Promise<any> {
        const date = new Date()
        sku.LastUpdated = date.toISOString();
        sku.LastUpdatedBy = localStorage.getItem("userId")
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.put(`${this.url}/${id}`, sku, httpOptions).toPromise();
    }

    insert(sku: any): Promise<any> {
        const date = new Date()
        sku.LastUpdated = date.toISOString();
        sku.LastUpdatedBy = localStorage.getItem("userId")
        sku.CreatedDate = date.toISOString();
        sku.CreatedBy = localStorage.getItem("userId")
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(this.url, sku, httpOptions).toPromise();
    }
}
