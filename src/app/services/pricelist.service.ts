import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class PriceListService {
    url = "http://localhost:3000/api/v1/pricelist";

    constructor(private http: HttpClient) {}

    getAll(): Promise<any> {
        return this.http.get(this.url).toPromise();
    }

    insert(priceList: any): Promise<any> {
        const date = new Date();
        priceList.LastUpdate = date.toISOString();
        priceList.LastUpdateBy = localStorage.getItem("userId");
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(this.url, priceList, httpOptions).toPromise();
    }

    getById(id: string): Promise<any> {
        return this.http.get(`${this.url}/${id}`).toPromise();
    }

    update(id: string, priceList: any): Promise<any> {
        const date = new Date()
        priceList.LastUpdate = date.toISOString();
        priceList.LastUpdateBy = localStorage.getItem("userId");
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.put(`${this.url}/${id}`, priceList, httpOptions).toPromise();
    }
}
