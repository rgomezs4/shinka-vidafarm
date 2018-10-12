import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { CorrelativeService } from "app/services/correlative.service";

declare const $: any;

@Component({
    selector: "app-new-correlative-cmp",
    templateUrl: "./new-correlative.component.html"
})
export class NewCorrelativeComponent implements OnInit {
    correlative: any = {
        DocSerie: "", Min: 1, Max: 1, Current: 1
    };

    constructor(
        private correlativeService: CorrelativeService,
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
            const res = await this.correlativeService.insert(this.correlative);
            this.router.navigate(['/config/correlative'])
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
