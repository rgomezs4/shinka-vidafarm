import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PurchaseService } from "app/services/purchases.service";

declare const $: any;

@Component({
    selector: "app-view-purchase-cmp",
    templateUrl: "./view-purchase.component.html"
})
export class ViewPurchaseComponent implements OnInit {
    purchase: any = {};

    documento = "";
    constructor(
        private purchaseService: PurchaseService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    async ngOnInit() {
        try {
            const id = this.route.snapshot.paramMap.get("id");
            this.purchase = await this.purchaseService.getHeaderById(id);
            this.purchase.detail = await this.purchaseService.getDetailsById(
                id
            );
            this.documento = `${this.purchase.DocSerie}-${
                this.purchase.DocNum
            }`;
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
