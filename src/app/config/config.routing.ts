import { Routes } from "@angular/router";

export const ConfigRoutes: Routes = [
    {
        path: "config",
        children: [
            {
                path: "price_list",
                component: null // ListSkusComponent
            },
            {
                path: "correlative",
                component: null // EditSkuComponent
            }
        ]
    }
];
