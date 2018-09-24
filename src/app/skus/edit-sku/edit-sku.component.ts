import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PriceListService } from "../../services/pricelist.service";
import { ProviderService } from "../../services/provider.service";
import * as _ from "lodash";
import { SkuService } from "../../services/sku.service";
import { PriceSkuService } from "../../services/pricesku.service";

declare const $: any;

@Component({
    selector: "app-edit-sku-cmp",
    templateUrl: "./edit-sku.component.html"
})
export class EditSkuComponent implements OnInit {
    sku: any;
    prices: Array<any>;
    providers: Array<any>;
    priceLists: Array<any>;

    constructor(
        private skuService: SkuService,
        private providerService: ProviderService,
        private priceListService: PriceListService,
        private priceskuService: PriceSkuService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.sku = {
            SkuCode: "",
            ProviderCode: "",
            Provider: "",
            Description: "",
            Barcode: "",
            AlternateBarcode: "",
            HandlesBatch: 0,
            IsExtent: 0
        };

        this.prices = [
            {
                SkuCode: "",
                PriceListCode: "",
                PriceList: "",
                Price: 0.0
            }
        ];

        this.providers = [
            {
                ProviderCode: "",
                Name: ""
            }
        ];

        this.priceLists = [
            {
                PriceListCode: 0,
                Description: ""
            }
        ];
    }

    async ngOnInit() {
        try {
            const skuId = this.route.snapshot.paramMap.get("id");

            this.sku = await this.skuService.getById(skuId);
            this.providers = await this.providerService.getAll();
            this.priceLists = await this.priceListService.getAll();
            this.prices = await this.priceskuService.getBySku(skuId);

            this.prices.forEach(pr => {
                const pl = _.find(
                    this.priceLists,
                    p => p.PriceListCode === pr.PriceListCode
                );
                pr.PriceList = pl.Description;
            });

            this.sku.HandlesBatch = this.sku.HandlesBatch.toString();
            this.sku.IsExtent = this.sku.IsExtent.toString();
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
            this.router.navigate(["sku"]);
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
            const payload = _.clone(this.sku);
            delete payload.SkuCode;
            const req = await this.skuService.update(this.sku.SkuCode, payload);

            if (!req) {
                this.showMessage(
                    "danger",
                    "Error al actualizar el producto.",
                    "top",
                    "right"
                );
                return;
            }
            this.showMessage(
                "success",
                "Producto actualizado exitosamente.",
                "top",
                "right"
            );
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
        }
    }

    async savePrice(p: any) {
        try {
            const payload = _.clone(p);
            delete payload.PriceList;
            const req = await this.priceskuService.update(payload);

            if (!req) {
                this.showMessage(
                    "danger",
                    "Error al actualizar el precio.",
                    "top",
                    "right"
                );
                return;
            }
            this.showMessage(
                "success",
                "Precio actualizado exitosamente.",
                "top",
                "right"
            );
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
        }
    }

    savePrices() {
        try {
            this.prices.forEach(async (p) => {
                const payload = _.clone(p);
                delete payload.PriceList;
                const req = await this.priceskuService.update(payload);
                if (!req) {
                    this.showMessage(
                        "danger",
                        "Error al actualizar los precios.",
                        "top",
                        "right"
                    );
                    return;
                }
            });
            this.showMessage(
                "success",
                "Precios actualizados exitosamente.",
                "top",
                "right"
            );
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
        }
    }
}
