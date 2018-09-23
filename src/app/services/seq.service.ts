import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class SeqService {
    url = "http://localhost:3000/api/v1/seq";

    constructor(private http: HttpClient) { }

    getNext(target): Promise<any> {
        return this.http.get(`${this.url}/for/${target}`).toPromise();
    }
}
