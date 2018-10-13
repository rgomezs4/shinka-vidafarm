import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

declare var $: any;

@Component({
    selector: "app-login-cmp",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy {
    username = "";
    password = "";
    errorMessage = "";
    showError = false;
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    constructor(
        private element: ElementRef,
        private userService: UserService,
        private router: Router
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
        const body = document.getElementsByTagName("body")[0];
        body.classList.add("login-page");
        body.classList.add("off-canvas-sidebar");
        const card = document.getElementsByClassName("card")[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove("card-hidden");
        }, 700);
    }

    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName("body")[0];
        if (this.sidebarVisible === false) {
            setTimeout(function () {
                toggleButton.classList.add("toggled");
            }, 500);
            body.classList.add("nav-open");
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove("toggled");
            this.sidebarVisible = false;
            body.classList.remove("nav-open");
        }
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("login-page");
        body.classList.remove("off-canvas-sidebar");
    }

    async login() {
        try {
            if (this.username === "" || this.password === "") {
                this.showError = true;
                this.errorMessage = "Debe ingresar tanto usuario como contraseña.";
                return;
            }

            const credentials = {
                username: this.username,
                password: this.password
            };

            const u = await this.userService.login(credentials);
            if (!u) {
                this.showError = true;
                this.errorMessage = "Usuario o contraseña incorrecta.";
                return;
            }

            localStorage.setItem("user", JSON.stringify(u));
            localStorage.setItem("userId", u.UserCode);
            this.router.navigate(["dashboard"])
        } catch (error) {
            this.showError = true;
        }
    }

    hideError() {
        this.showError = false;
    }
}
