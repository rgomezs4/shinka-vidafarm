import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class InvoiceService {
    headerUrl = "http://localhost:3000/api/v1/invoice";
    detailUrl = "http://localhost:3000/api/v1/invoicedetail";

    constructor(private http: HttpClient) {}

    get10Headers(): Promise<any> {
        return this.http.get(this.headerUrl + "/limit/10").toPromise();
    }

    getAllHeaders(): Promise<any> {
        return this.http.get(this.headerUrl).toPromise();
    }

    getHeaderById(id: string): Promise<any> {
        return this.http.get(`${this.headerUrl}/${id}`).toPromise();
    }

    getDetailsById(id: string): Promise<any> {
        return this.http.get(`${this.detailUrl}/${id}`).toPromise();
    }

    insertHeader(header: any): Promise<any> {
        const date = new Date();
        header.LastUpdate = date.toISOString();
        header.LastUpdateBy = localStorage.getItem("userId");
        header.CreatedDate = date.toISOString();
        header.CreatedBy = localStorage.getItem("userId");
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(this.headerUrl, header, httpOptions).toPromise();
    }

    insertDetail(detail: any): Promise<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post(this.detailUrl, detail, httpOptions).toPromise();
    }
}
