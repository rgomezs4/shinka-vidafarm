import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvoiceService } from "app/services/invoice.service";
import { CorrelativeService } from "app/services/correlative.service";
import { SkuService } from "app/services/sku.service";
import { ClientService } from "app/services/client.service";
import { PriceSkuService } from "app/services/pricesku.service";
import { PurchaseService } from "app/services/purchases.service";
import { ProviderService } from "app/services/provider.service";

declare const $: any;

@Component({
    selector: "app-new-purchase-cmp",
    templateUrl: "./new-purchase.component.html"
})
export class NewPurchaseComponent implements OnInit {
    purchase: any = {};

    canSearchProduct = false;
    canSearchProvider = false;
    barcode = "";
    criteria = "";

    provider: any = {};
    detail: Array<any> = [];
    total = 0;
    created = false;
    serie = "";
    numero = 0;
    constructor(
        private router: Router,
        private purchaseService: PurchaseService,
        private skuService: SkuService,
        private providerService: ProviderService,
        private priceService: PriceSkuService
    ) {}

    async ngOnInit() {
        try {
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
        }
    }

    allowSearchProduct() {
        this.canSearchProduct = true;
    }

    allowSearchProvider() {
        this.canSearchProvider = true;
    }

    canSave() {
        return (
            this.serie &&
            this.numero &&
            this.provider &&
            this.detail.length > 0 &&
            !this.created
        );
    }

    clean() {
        this.serie = "";
        this.numero = 0;
        this.provider = {};
        this.detail = [];
        this.created = false;
    }

    async saveChanges() {
        try {
            const header = {
                ProviderCode: this.provider.ProviderCode,
                DocSerie: this.serie,
                DocNum: this.numero,
                DocDate: new Date().toLocaleDateString(),
                DocStatus: "O",
                ProviderName: this.provider.Name,
                Address: this.provider.Address,
                DocTotal: this.total,
                TaxTotal: 0,
                DocTotalAfterTax: this.total
            };
            const res = await this.purchaseService.insertHeader(header);
            const id = res.PurchaseId;

            this.detail.forEach(async d => {
                const det = {
                    PurchaseId: id,
                    SkuCode: d.SkuCode,
                    Description: d.Description,
                    Quantity: d.Quantity,
                    Price: d.Price,
                    Tax: 0,
                    LineTotal: d.LineTotal,
                    LineTotalAfterTax: d.LineTotal
                };
                await this.purchaseService.insertDetail(det);

                const sku = {
                    Available: d.Available + d.Quantity
                };
                await this.skuService.update(d.SkuCode, sku);
            });
            this.created = true;
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
        }
    }

    async searchProduct() {
        try {
            // tslint:disable-next-line:curly
            if (!this.canSearchProduct) return;
            // tslint:disable-next-line:curly
            if (!this.barcode) return;
            if (!this.provider.PriceListCode) {
                this.showMessage(
                    "warning",
                    "Debe seleccionar un proveedor antes de buscar un producto.",
                    "top",
                    "right"
                );
                this.barcode = "";
                return;
            }
            this.canSearchProduct = false;

            const product = await this.skuService.getByBarcode(this.barcode);
            if (!product) {
                this.showMessage("warning", "No encontrado", "top", "right");
            }

            const price = await this.priceService.getSingle(
                product.SkuCode,
                this.provider.PriceListCode
            );
            this.barcode = "";
            this.detail.push({
                SkuCode: product.SkuCode,
                Description: product.Description,
                Quantity: 1,
                Price: price.Price,
                LineTotal: price.Price,
                Available: product.Available
            });

            this.total = 0;
            this.detail.forEach(d => {
                this.total += d.LineTotal;
            });
        } catch (error) {
            this.canSearchProduct = true;
            this.showMessage("danger", error.message, "top", "right");
        }
    }

    async searchProvider() {
        try {
            // tslint:disable-next-line:curly
            if (!this.canSearchProvider) return;
            // tslint:disable-next-line:curly
            if (!this.criteria) return;
            this.canSearchProvider = false;

            this.provider = await this.providerService.search(this.criteria);
            if (!this.provider) {
                this.showMessage("warning", "No encontrado", "top", "right");
            }
            this.criteria = "";
        } catch (error) {
            this.canSearchProvider = true;
            this.showMessage("danger", error.message, "top", "right");
        }
    }

    calcTotal(val, index) {
        this.detail[index].Quantity = val;
        this.detail[index].LineTotal = val * this.detail[index].Price;

        this.total = 0;
        this.detail.forEach(d => {
            this.total += d.LineTotal;
        });
    }

    removeDetail(index) {
        this.detail.splice(index, 1);

        this.total = 0;
        this.detail.forEach(d => {
            this.total += d.LineTotal;
        });
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
