import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PriceListService } from "../../services/pricelist.service";
import { ProviderService } from "../../services/provider.service";
import * as _ from "lodash";
import { SeqService } from "../../services/seq.service";

declare const $: any;

@Component({
    selector: "app-create-provider-cmp",
    templateUrl: "./create-provider.component.html"
})
export class CreateProviderComponent implements OnInit {
    provider: any;
    priceLists: Array<any>;

    constructor(
        private providerService: ProviderService,
        private priceListService: PriceListService,
        private seqService: SeqService,
        private router: Router
    ) {
        this.provider = {
            ProviderCode: "",
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
            this.router.navigate(["provider"]);
        }
    }

    async saveChanges() {
        try {
            const seq = await this.seqService.getNext("Provider");
            const code = "PR-" + (seq.current_number / 1000000).toFixed(6).toString().split('.')[1]
            this.provider.ProviderCode = code;
            await this.providerService.insert(
                this.provider
            );
            this.showMessage(
                "success",
                "Proveedor creado exitosamente.",
                "top",
                "right"
            );
            this.router.navigate(["provider"]);
        } catch (error) {
            this.provider.ProviderCode = "";
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
