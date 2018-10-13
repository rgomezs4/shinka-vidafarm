import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvoiceService } from "app/services/invoice.service";

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: "app-list-invoices-cmp",
    templateUrl: "./list-invoices.component.html"
})
export class ListInvoicesComponent implements OnInit {
    invoices: Array<any> = [];
    public dataTable: DataTable = <DataTable>{};

    constructor(
        private router: Router,
        private invoiceService: InvoiceService
    ) {
        this.dataTable = {
            headerRow: [
                "Codigo de Cliente",
                "Cliente",
                "Documento",
                "Fecha",
                "Total",
                "Acciones"
            ],
            footerRow: [
                "Codigo de Cliente",
                "Cliente",
                "Documento",
                "Fecha",
                "Total",
                "Acciones"
            ],
            dataRows: [[]]
        };
    }

    async ngOnInit() {
        try {
            this.invoices = await this.invoiceService.get10Headers();

            const data = this.invoices.map(s => {
                const doc = s.DocSerie + "-" + s.DocNum;
                const pl = [
                    s.InvoiceId,
                    s.ClientCode,
                    s.ClientName,
                    doc,
                    s.DocDate,
                    s.DocTotalAfterTax
                ];
                return pl;
            });

            this.dataTable = {
                headerRow: [
                    "Id",
                    "Codigo de Cliente",
                    "Cliente",
                    "Documento",
                    "Fecha",
                    "Total",
                    "Acciones"
                ],
                footerRow: [
                    "Id",
                    "Codigo de Cliente",
                    "Cliente",
                    "Documento",
                    "Fecha",
                    "Total",
                    "Acciones"
                ],
                dataRows: data
            };
        } catch (error) {}
    }

    gotoCreate() {
        this.router.navigate(["/invoice/new"]);
    }

    gotoView(id) {
        this.router.navigate(["/invoice/view", id]);
    }
}
