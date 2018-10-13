import { Routes } from "@angular/router";
import { ListInvoicesComponent } from "./list-invoices/list-invoices.component";
import { NewInvoiceComponent } from "./new-invoice/new-invoice.component";
import { ViewInvoiceComponent } from "./view-invoice/view-invoice.component";

export const InvoiceRoutes: Routes = [
    {
        path: "invoice",
        children: [
            {
                path: "",
                component: ListInvoicesComponent
            },
            {
                path: "new",
                component: NewInvoiceComponent
            },
            {
                path: "view/:id",
                component: ViewInvoiceComponent
            },
        ]
    }
];
