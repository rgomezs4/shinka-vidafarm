import { Routes } from "@angular/router";
import { ListClientsComponent } from "./list-clients/list-clients.component";
import { EditClientComponent } from "./edit-client/edit-client.component";
import { CreateClientComponent } from "./create-client/create-client.component";

export const ClientRoutes: Routes = [
    {
        path: "client",
        children: [
            {
                path: "",
                component: ListClientsComponent
            },
            {
                path: "edit/:id",
                component: EditClientComponent
            },
            {
                path: "new",
                component: CreateClientComponent
            }
        ]
    }
];
