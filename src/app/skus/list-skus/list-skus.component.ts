import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkuService } from '../../services/sku.service';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: "app-list-skus-cmp",
    templateUrl: "./list-skus.component.html"
})
export class ListSkusComponent implements OnInit, AfterViewInit {
    skus: Array<any> = [];
    public dataTable: DataTable;

    constructor(private skuService: SkuService, private router: Router) {
    }

    async ngOnInit() {
        try {
            this.skus = await this.skuService.getAll();

            const data = this.skus.map(s => {
                const batch = s.HandlesBatch === 1 ? "Si" : "No";
                const extent = s.IsExtent === 1 ? "Si" : "No";
                const sku = [s.SkuCode, s.ProviderCode, s.Description, s.Barcode,
                            s.AlternateBarcode, batch, extent];
                return sku;
            });

            this.dataTable = {
                headerRow: ['Codigo', 'Proveedor', 'Descripcion', 'Codigo de Barras',
                            'Barras Alterno', 'Maneja Lote', 'Extento', 'Acciones'],
                footerRow: ['Codigo', 'Proveedor', 'Descripcion', 'Codigo de Barras',
                            'Barras Alterno', 'Maneja Lote', 'Extento', 'Acciones'],

                dataRows: data
            };
        } catch (error) {
        }
    }

    ngAfterViewInit() {
        const ctx = this;
        $('#datatables').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Buscar producto",
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function (e) {
            const $tr = $(this).closest('tr');
            const data = table.row($tr).data();
            ctx.router.navigate(['/sku/edit', data[0]])
            e.preventDefault();
        });

        $('.card .material-datatables label').addClass('form-group');
    }

    gotoCreate() {
        this.router.navigate(['/sku/new'])
    }
}
