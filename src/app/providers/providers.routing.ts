import { Routes } from "@angular/router";
import { ListProvidersComponent } from "./list-providers/list-providers.component";
import { EditProviderComponent } from "./edit-provider/edit-provider.component";

export const ProviderRoutes: Routes = [
    {
        path: "provider",
        children: [
            {
                path: "",
                component: ListProvidersComponent
            },
            {
                path: "edit/:id",
                component: EditProviderComponent
            }
        ]
    }
];
