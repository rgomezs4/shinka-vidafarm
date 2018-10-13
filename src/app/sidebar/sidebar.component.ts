import { Component, OnInit } from "@angular/core";
import PerfectScrollbar from "perfect-scrollbar";

declare const $: any;

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: "/dashboard",
        title: "Dashboard",
        type: "link",
        icontype: "dashboard"
    },
    {
        path: "/invoice",
        title: "Facturacion",
        type: "link",
        icontype: "credit_card"
    },
    {
        path: "/purchase",
        title: "Ingreso de Mercaderia",
        type: "link",
        icontype: "directions_boat"
    },
    {
        path: "/sku",
        title: "Productos",
        type: "link",
        icontype: "ballot"
    },
    {
        path: "/client",
        title: "Clientes",
        type: "link",
        icontype: "face"
    },
    {
        path: "/provider",
        title: "Proveedores",
        type: "link",
        icontype: "group"
    },
    {
        path: "/config",
        title: "Configuracion",
        type: "sub",
        icontype: "settings",
        collapse: "configuracion",
        children: [
            {path: "price_list", title: "Listas de Precios", ab: "LP"},
            {path: "correlative", title: "Correlativos Facturas", ab: "CF"}
        ]
    }
];
@Component({
    selector: "app-sidebar-cmp",
    templateUrl: "sidebar.component.html"
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>(
                document.querySelector(".sidebar .sidebar-wrapper")
            );
            const ps = new PerfectScrollbar(elemSidebar, {
                wheelSpeed: 2,
                suppressScrollX: true
            });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (
            navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
            navigator.platform.toUpperCase().indexOf("IPAD") >= 0
        ) {
            bool = true;
        }
        return bool;
    }
}
