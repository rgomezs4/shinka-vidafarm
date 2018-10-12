import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { PriceListService } from "app/services/pricelist.service";

declare const $: any;

@Component({
    selector: "app-edit-price-list-cmp",
    templateUrl: "./edit-price-list.component.html"
})
export class EditPriceListComponent implements OnInit {
    priceList: any = {
        Description: "",
        Factor: 1,
        Type: "1"
    };
    id;
    constructor(
        private priceListService: PriceListService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    async ngOnInit() {
        try {
            const priceListId = this.route.snapshot.paramMap.get("id");
            this.id = priceListId;
            this.priceList = await this.priceListService.getById(priceListId);
        } catch (error) {
            this.showMessage("danger", error, "top", "right");
            this.router.navigate(["/config/price_list"]);
        }
    }

    async saveChanges() {
        try {
            delete this.priceList.PriceListCode;
            const res = await this.priceListService.update(
                this.id,
                this.priceList
            );
            this.router.navigate(["/config/price_list"]);
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
