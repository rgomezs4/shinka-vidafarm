import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvoiceService } from "app/services/invoice.service";
import { PurchaseService } from "app/services/purchases.service";

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: "app-list-purchases-cmp",
    templateUrl: "./list-purchases.component.html"
})
export class ListPurchasesComponent implements OnInit {
    purchases: Array<any> = [];
    public dataTable: DataTable = <DataTable>{};

    constructor(
        private router: Router,
        private purchaseService: PurchaseService
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
            this.purchases = await this.purchaseService.get10Headers();

            const data = this.purchases.map(s => {
                const doc = s.DocSerie + "-" + s.DocNum;
                const pl = [
                    s.PurchaseId,
                    s.ProviderCode,
                    s.ProviderName,
                    doc,
                    s.DocDate,
                    s.DocTotalAfterTax
                ];
                return pl;
            });

            this.dataTable = {
                headerRow: [
                    "Id",
                    "Codigo de Proveedor",
                    "Proveedor",
                    "Documento",
                    "Fecha",
                    "Total",
                    "Acciones"
                ],
                footerRow: [
                    "Id",
                    "Codigo de Proveedor",
                    "Proveedor",
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
        this.router.navigate(["/purchase/new"]);
    }

    gotoView(id) {
        this.router.navigate(["/purchase/view", id]);
    }
}
