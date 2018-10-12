import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { SkuService } from "../../services/sku.service";
import { PriceListService } from "../../services/pricelist.service";

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: "app-price-list-cmp",
    templateUrl: "./price-list.component.html"
})
export class PriceListComponent implements OnInit {
    priceLists: Array<any> = [];
    public dataTable: DataTable = <DataTable>{};

    constructor(
        private router: Router,
        private priceListService: PriceListService
    ) {
        this.dataTable = {
            headerRow: ['Codigo', 'Descripcion', 'Factor', 'Tipo', 'Acciones'],
            footerRow: ['Codigo', 'Descripcion', 'Factor', 'Tipo', 'Acciones'],
            dataRows: [[]]
        }
    }

    async ngOnInit() {
        try {
            this.priceLists = await this.priceListService.getAll();

            const data = this.priceLists.map(s => {
                const type = s.Type === 2 ? "Venta" : "Compras";
                const pl = [s.PriceListCode, s.Description, s.Factor, type];
                return pl;
            });

            this.dataTable = {
                headerRow: ['Codigo', 'Descripcion', 'Factor', 'Tipo', 'Acciones'],
                footerRow: ['Codigo', 'Descripcion', 'Factor', 'Tipo', 'Acciones'],
                dataRows: data
            };
        } catch (error) {}
    }

    gotoCreate() {
        this.router.navigate(['/config/new-price_list']);
    }

    gotoEdit(id) {
        this.router.navigate(['/config/edit-price_list', id])
    }
}
