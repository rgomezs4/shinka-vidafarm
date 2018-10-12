import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { CorrelativeService } from "../../services/correlative.service";

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: "app-correlative-list-cmp",
    templateUrl: "./correlative.component.html"
})
export class CorrelativeComponent implements OnInit {
    correlatives: Array<any> = [];
    public dataTable: DataTable;

    constructor(
        private router: Router,
        private correlativeService: CorrelativeService
    ) {
        this.dataTable = {
            headerRow: ['Codigo', 'Serie', 'Actual', 'Primero', 'Ultimo'],
            footerRow: ['Codigo', 'Serie', 'Actual', 'Primero', 'Ultimo'],
            dataRows: [[]]
        };
    }

    async ngOnInit() {
        try {
            this.correlatives = await this.correlativeService.getAll();

            const data = this.correlatives.map(s => {
                const type = s.Type === 1 ? "Venta" : "Compras";
                const pl = [s.CorrelativeId, s.DocSerie, s.Current, s.Min, s.Max];
                return pl;
            });

            this.dataTable = {
                headerRow: ['Codigo', 'Serie', 'Actual', 'Primero', 'Ultimo'],
                footerRow: ['Codigo', 'Serie', 'Actual', 'Primero', 'Ultimo'],
                dataRows: data
            };
        } catch (error) {}
    }

    gotoCreate() {
        this.router.navigate(['/config/new-correlative']);
    }
}
