import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { InvoiceService } from "app/services/invoice.service";

declare const $: any;

@Component({
    selector: "app-view-invoice-cmp",
    templateUrl: "./view-invoice.component.html"
})
export class ViewInvoiceComponent implements OnInit {
    invoice: any = {};
    documento = "";
    constructor(
        private invoiceService: InvoiceService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    async ngOnInit() {
        try {
            const id = this.route.snapshot.paramMap.get("id");
            this.invoice = await this.invoiceService.getHeaderById(id);
            this.invoice.detail = await this.invoiceService.getDetailsById(id);
            this.documento = `${this.invoice.DocSerie}-${this.invoice.DocNum}`
        } catch (error) {
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
