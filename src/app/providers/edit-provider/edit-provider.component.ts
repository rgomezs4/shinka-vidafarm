import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../../services/provider.service";
import { Router, ActivatedRoute } from "@angular/router";
import { shallowEqualArrays } from "@angular/router/src/utils/collection";
import { PriceListService } from "../../services/pricelist.service";
import * as _ from "lodash";

declare const $: any;
declare const swal: any;

@Component({
    selector: "app-edit-provider-cmp",
    templateUrl: "./edit-provider.component.html"
})
export class EditProviderComponent implements OnInit {
    provider: any;
    priceLists: Array<any>;

    constructor(
        private providerService: ProviderService,
        private priceListService: PriceListService,
        private router: Router,
        private route: ActivatedRoute
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
            const providerId = this.route.snapshot.paramMap.get("id");

            this.provider = await this.providerService.getById(providerId);
            this.priceLists = await this.priceListService.getAll();
        } catch (error) {
            this.showMessage("danger", error, "top", "right");
            this.router.navigate(["provider"]);
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
            const payload = _.clone(this.provider);
            delete payload.ProviderCode;
            const req = await this.providerService.update(
                this.provider.ProviderCode,
                payload
            );

            if (!req) {
                this.showMessage(
                    "danger",
                    "Error al actualizar el proveedor.",
                    "top",
                    "right"
                );
                return;
            }
            this.showMessage(
                "success",
                "Proveedor actualizado exitosamente.",
                "top",
                "right"
            );
        } catch (error) {
            this.showMessage("danger", error, "top", "right");
        }
    }
}
