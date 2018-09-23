import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: "app-list-providers-cmp",
    templateUrl: "./list-providers.component.html"
})
export class ListProvidersComponent implements OnInit, AfterViewInit {
    providers: Array<any> = [];
    public dataTable: DataTable;

    constructor(private providerService: ProviderService, private router: Router) {
     }

    async ngOnInit() {
        try {
            this.providers = await this.providerService.getAll();

            const data = this.providers.map(p => {
                const prov = [p.ProviderCode, p.Name, p.NIT, p.Phone, p.Address, p.ContactName, p.PriceListCode];
                return prov;
            });

            this.dataTable = {
                headerRow: ['Codigo', 'Nombre', 'NIT', 'Telefono', 'Direccion', 'Persona de Contacto', 'Lista de Precios', 'Acciones'],
                footerRow: ['Codigo', 'Nombre', 'NIT', 'Telefono', 'Direccion', 'Persona de Contacto', 'Lista de Precios', 'Acciones'],

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
                searchPlaceholder: "Buscar proveedor",
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function (e) {
            const $tr = $(this).closest('tr');
            const data = table.row($tr).data();
            ctx.router.navigate(['/provider/edit', data[0]])
            e.preventDefault();
        });

        $('.card .material-datatables label').addClass('form-group');
    }

    gotoCreate() {
        this.router.navigate(['/provider/new'])
    }
}
