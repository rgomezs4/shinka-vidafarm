import { Routes } from "@angular/router";
import { ListSkusComponent } from "./list-skus/list-skus.component";
import { EditSkuComponent } from "./edit-sku/edit-sku.component";
import { CreateSkuComponent } from "./create-sku/create-sku.component";

export const SkuRoutes: Routes = [
    {
        path: "sku",
        children: [
            {
                path: "",
                component: ListSkusComponent
            },
            {
                path: "edit/:id",
                component: EditSkuComponent
            },
            {
                path: "new",
                component: CreateSkuComponent
            }
        ]
    }
];
