import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PriceListService } from "../../services/pricelist.service";
import * as _ from "lodash";
import { SeqService } from "../../services/seq.service";
import { ClientService } from "../../services/client.service";

declare const $: any;

@Component({
    selector: "app-create-client-cmp",
    templateUrl: "./create-client.component.html"
})
export class CreateClientComponent implements OnInit {
    client: any;
    priceLists: Array<any>;

    constructor(
        private clientService: ClientService,
        private priceListService: PriceListService,
        private seqService: SeqService,
        private router: Router
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
            this.priceLists = await this.priceListService.getAll();
        } catch (error) {
            this.showMessage("danger", error, "top", "right");
            this.router.navigate(["client"]);
        }
    }

    async saveChanges() {
        try {
            const seq = await this.seqService.getNext("Client");
            const code = "CL-" + (seq.current_number / 1000000).toFixed(6).toString().split('.')[1]
            this.client.ClientCode = code;
            await this.clientService.insert(
                this.client
            );
            this.showMessage(
                "success",
                "Cliente creado exitosamente.",
                "top",
                "right"
            );
            this.router.navigate(["client"]);
        } catch (error) {
            this.client.ClientCode = "";
            this.showMessage("danger", error.message, "top", "right");
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
}
