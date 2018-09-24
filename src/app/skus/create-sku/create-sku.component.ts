import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PriceListService } from "../../services/pricelist.service";
import { ProviderService } from "../../services/provider.service";
import * as _ from "lodash";
import { SeqService } from "../../services/seq.service";
import { SkuService } from "../../services/sku.service";
import { PriceSkuService } from "../../services/pricesku.service";

declare const $: any;

@Component({
    selector: "app-create-sku-cmp",
    templateUrl: "./create-sku.component.html"
})
export class CreateSkuComponent implements OnInit {
    sku: any;
    providers: Array<any>;
    priceLists: Array<any>;

    constructor(
        private skuService: SkuService,
        private providerService: ProviderService,
        private priceListService: PriceListService,
        private priceskuService: PriceSkuService,
        private seqService: SeqService,
        private router: Router
    ) {
        this.sku = {
            SkuCode: "",
            ProviderCode: "",
            Description: "",
            Barcode: "",
            AlternateBarcode: "",
            HandlesBatch: 0,
            IsExtent: 0
        };

        this.providers = [
            {
                ProviderCode: "",
                Name: ""
            }
        ];

        this.priceLists = [
            {
                PriceListCode: 0,
                Description: "",
                Price: 0,
                SkuCode: ""
            }
        ];
    }

    async ngOnInit() {
        try {
            this.providers = await this.providerService.getAll();
            this.priceLists = await this.priceListService.getAll();
        } catch (error) {
            this.showMessage("danger", error, "top", "right");
            this.router.navigate(["sku"]);
        }
    }

    async saveChanges() {
        try {
            const seq = await this.seqService.getNext("Product");
            const code = "ITM-" + (seq.current_number / 1000000).toFixed(6).toString().split('.')[1]
            this.sku.SkuCode = code;
            await this.skuService.insert(
                this.sku
            );
            this.showMessage(
                "success",
                "Producto creado exitosamente.",
                "top",
                "right"
            );

            await this.savePrices();

            this.router.navigate(["/sku/edit", code]);
        } catch (error) {
            this.sku.SkuCode = "";
            this.showMessage("danger", error.message, "top", "right");
        }
    }

    async savePrices() {
        try {
            this.priceLists.forEach(async (p) => {
                const clone = _.clone(p);
                const payload = {
                    SkuCode: this.sku.SkuCode,
                    PriceListCode: clone.PriceListCode,
                    Price: clone.Price
                };
                await this.priceskuService.insert(payload);
            });
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
            return Promise.resolve(false);
        }
    }

    showMessage(type, message, from, align) {
        $.notify(
            {
                icon: "error",
                message: message
            },
            {
                type: type,
                placement: {
                    from: from,
                    align: align
                }
            }
        );
    }
}
