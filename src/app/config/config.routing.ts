import { Routes } from "@angular/router";
import { PriceListComponent } from "./price-list/price-list.component";
import { CorrelativeComponent } from "./correlative/correlative.component";
import { NewCorrelativeComponent } from "./new-correlative/new-correlative.component";
import { NewPriceListComponent } from "./new-price-list/new-price-list.component";
import { EditPriceListComponent } from "./edit-price-list/edit-price-list.component";

export const ConfigRoutes: Routes = [
    {
        path: "config",
        children: [
            {
                path: "price_list",
                component: PriceListComponent
            },
            {
                path: "correlative",
                component: CorrelativeComponent
            },
            {
                path: "new-correlative",
                component: NewCorrelativeComponent
            },
            {
                path: "new-price_list",
                component: NewPriceListComponent
            },
            {
                path: "edit-price_list/:id",
                component: EditPriceListComponent
            }
        ]
    }
];
