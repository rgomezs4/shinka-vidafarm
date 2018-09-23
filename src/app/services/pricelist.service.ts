import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class PriceListService {
    url = "http://localhost:3000/api/v1/pricelist";

    constructor(private http: HttpClient) { }

    getAll(): Promise<any> {
        return this.http.get(this.url).toPromise();
    }
}
