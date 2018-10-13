import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvoiceService } from "app/services/invoice.service";
import { CorrelativeService } from "app/services/correlative.service";
import { SkuService } from "app/services/sku.service";
import { ClientService } from "app/services/client.service";
import { PriceSkuService } from "app/services/pricesku.service";

declare const $: any;

@Component({
    selector: "app-new-invoice-cmp",
    templateUrl: "./new-invoice.component.html"
})
export class NewInvoiceComponent implements OnInit {
    invoice: any = {};
    series: Array<any> = [];

    canSearchProduct = false;
    canSearchClient = false;
    barcode = "";
    criteria = "";

    client: any = {};
    detail: Array<any> = [];
    total = 0;
    selectedSerie: any = { Current: 0 };
    created = false;

    constructor(
        private router: Router,
        private invoiceService: InvoiceService,
        private correlativeService: CorrelativeService,
        private skuService: SkuService,
        private clientService: ClientService,
        private priceService: PriceSkuService
    ) {}

    async ngOnInit() {
        try {
            this.series = await this.correlativeService.getAll();
        } catch (error) {
            this.showMessage("danger", error.message, "top", "right");
        }
    }

    allowSearchProduct() {
        this.canSearchProduct = true;
    }

    allowSearchClient() {
        this.canSearchClient = true;
    }

    canSave() {
        return (
            this.selectedSerie &&
            this.client &&
            this.detail.length > 0 &&
            !this.created
        );
    }

    clean() {
        this.selectedSerie = { Current: 0 };
        this.client = {};
        this.detail = [];
        this.created = false;
    }

    async saveChanges() {
        try {
            const header = {
                ClientCode: this.client.ClientCode,
                DocSerie: this.selectedSerie.DocSerie,
                DocNum: this.selectedSerie.Current + 1,
                DocDate: new Date().toLocaleDateString(),
                DocStatus: "O",
                ClientName: this.client.Name,
                Address: this.client.Address,
                NIT: this.client.NIT,
                DocTotal: this.total,
                TaxTotal: 0,
                DocTotalAfterTax: this.total
            };
            const res = await this.invoiceService.insertHeader(header);
            const id = res.InvoiceId;

            this.detail.forEach(async d => {
                const det = {
                    InvoiceId: id,
                    SkuCode: d.SkuCode,
                    Description: d.Description,
                    Quantity: d.Quantity,
                    Price: d.Price,
                    Tax: 0,
                    LineTotal: d.LineTotal,
                    LineTotalAfterTax: d.LineTotal
                };
                await this.invoiceService.insertDetail(det);

                const sku = {
                    Available: d.Available - d.Quantity
                };
                await this.skuService.update(d.SkuCode, sku);
            });

            const correlative = {
                Current: header.DocNum
            };
            await this.correlativeService.update(
                this.selectedSerie.CorrelativeId,
                correlative
            );

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
            if (!this.client.PriceListCode) {
                this.showMessage(
                    "warning",
                    "Debe seleccionar un cliente antes de buscar un producto.",
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

            if (product.Available <= 0) {
                this.showMessage(
                    "warning",
                    "El producto seleccionado se encuentra sin existencias",
                    "top",
                    "right"
                );
            }

            const price = await this.priceService.getSingle(
                product.SkuCode,
                this.client.PriceListCode
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

    async searchClient() {
        try {
            // tslint:disable-next-line:curly
            if (!this.canSearchClient) return;
            // tslint:disable-next-line:curly
            if (!this.criteria) return;
            this.canSearchClient = false;

            this.client = await this.clientService.search(this.criteria);
            if (!this.client) {
                this.showMessage("warning", "No encontrado", "top", "right");
            }
            this.criteria = "";
        } catch (error) {
            this.canSearchClient = true;
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
