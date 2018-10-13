import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: "app-list-clients-cmp",
    templateUrl: "./list-clients.component.html"
})
export class ListClientsComponent implements OnInit, AfterViewInit {
    clients: Array<any> = [];
    public dataTable: DataTable;

    constructor(private clientService: ClientService, private router: Router) {
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
            this.clients = await this.clientService.getAll();

            const data = this.clients.map(c => {
                const clt = [
                    c.ClientCode,
                    c.Name,
                    c.NIT,
                    c.Phone,
                    c.Address,
                    c.ContactName,
                    c.CreditLimit,
                    c.PriceListCode
                ];
                return clt;
            });

            this.dataTable = {
                headerRow: [
                    "Codigo",
                    "Nombre",
                    "NIT",
                    "Telefono",
                    "Direccion",
                    "Persona de Contacto",
                    "Limite de Credito",
                    "Lista de Precios",
                    "Acciones"
                ],
                footerRow: [
                    "Codigo",
                    "Nombre",
                    "NIT",
                    "Telefono",
                    "Direccion",
                    "Persona de Contacto",
                    "Limite de Credito",
                    "Lista de Precios",
                    "Acciones"
                ],

                dataRows: data
            };
        } catch (error) {}
    }

    ngAfterViewInit() {
        const ctx = this;
        $("#datatables").DataTable({
            pagingType: "full_numbers",
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Buscar cliente"
            }
        });

        const table = $("#datatables").DataTable();

        // Edit record
        table.on("click", ".edit", function(e) {
            const $tr = $(this).closest("tr");
            const data = table.row($tr).data();
            ctx.router.navigate(["/client/edit", data[0]]);
            e.preventDefault();
        });

        $(".card .material-datatables label").addClass("form-group");
    }

    gotoCreate() {
        this.router.navigate(["/client/new"]);
    }
}
