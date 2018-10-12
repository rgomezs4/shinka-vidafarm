import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { PriceListService } from "app/services/pricelist.service";

declare const $: any;

@Component({
    selector: "app-new-price-list-cmp",
    templateUrl: "./new-price-list.component.html"
})
export class NewPriceListComponent implements OnInit {
    priceList: any = {
        Description: "", Factor: 1, Type: "1"
    };

    constructor(
        private priceListService: PriceListService,
        private router: Router
    ) {
    }

    ngOnInit() {
        try {
        } catch (error) {
            this.showMessage("danger", error, "top", "right");
        }
    }

    async saveChanges() {
        try {
            const res = await this.priceListService.insert(this.priceList);
            this.router.navigate(['/config/price_list'])
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
                type: type,
                placement: {
                    from: from,
                    align: align
                }
            }
        );
    }
}
