import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PriceListService } from "../../services/pricelist.service";
import { ClientService } from "../../services/client.service";
import * as _ from "lodash";

declare const $: any;

@Component({
    selector: "app-edit-client-cmp",
    templateUrl: "./edit-client.component.html"
})
export class EditClientComponent implements OnInit {
    client: any;
    priceLists: Array<any>;

    constructor(
        private clientService: ClientService,
        private priceListService: PriceListService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.client = {
            ClientCode: "",
            Name: "",
            NIT: "",
            Phone: "",
            Address: "",
            ContactName: "",
            PriceListCode: 0
        };

        this.priceLists = [
            {
                PriceListCode: 0,
                Description: ""
            }
        ];
    }

    async ngOnInit() {
        try {
            const clientId = this.route.snapshot.paramMap.get("id");

            this.client = await this.clientService.getById(clientId);
            this.priceLists = await this.priceListService.getAll();
        } catch (error) {
            this.showMessage("danger", error, "top", "right");
            this.router.navigate(["client"]);
        }
    }

    showMessage(type, message, from, align) {
        $.notify(
            {
                icon: "error",
                message: message
            },
            {
                type: type, // 'danger',
                placement: {
                    from: from,
                    align: align
                }
            }
        );
    }

    async saveChanges() {
        try {
            const payload = _.clone(this.client);
            delete payload.ClientCode;
            const req = await this.clientService.update(
                this.client.ClientCode,
                payload
            );

            if (!req) {
                this.showMessage(
                    "danger",
                    "Error al actualizar el cliente.",
                    "top",
                    "right"
                );
                return;
            }
            this.showMessage(
                "success",
                "Cliente actualizado exitosamente.",
                "top",
                "right"
            );
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
        }
    }
}
