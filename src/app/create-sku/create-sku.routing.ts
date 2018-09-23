import { Routes } from "@angular/router";
import { CreateSkuComponent } from "./create-sku.component";

export const CreateSkuRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "pages/create-product",
                component: CreateSkuComponent
            }
        ]
    }
];
