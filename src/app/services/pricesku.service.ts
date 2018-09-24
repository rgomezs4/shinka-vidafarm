import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class PriceSkuService {
    url = "http://localhost:3000/api/v1/pricebysku";

    constructor(private http: HttpClient) { }

    getAll(): Promise<any> {
        return this.http.get(this.url).toPromise();
    }

    getSingle(sku: string, pricelist: string): Promise<any> {
        return this.http.get(`${this.url}/single/${sku}/${pricelist}`).toPromise();
    }

    getBySku(sku: string): Promise<any> {
        return this.http.get(`${this.url}/sku/${sku}`).toPromise();
    }

    getByPriceList(pricelist: string): Promise<any> {
        return this.http.get(`${this.url}/sku/${pricelist}`).toPromise();
    }

    update(sku: any): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.put(`${this.url}`, sku, httpOptions).toPromise();
    }

    insert(sku: any): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(this.url, sku, httpOptions).toPromise();
    }
}
