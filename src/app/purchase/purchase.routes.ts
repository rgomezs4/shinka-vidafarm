import { Routes } from "@angular/router";
import { NewPurchaseComponent } from "./new-purchase/new-purchase.component";
import { ListPurchasesComponent } from "./list-purchases/list-purchases.component";
import { ViewPurchaseComponent } from "./view-purchase/view-purchase.component";

export const PurchaseRoutes: Routes = [
    {
        path: "purchase",
        children: [
            {
                path: "",
                component: ListPurchasesComponent
            },
            {
                path: "view/:id",
                component: ViewPurchaseComponent
            },
            {
                path: "new",
                component: NewPurchaseComponent
            }
        ]
    }
];
