import { Component, OnInit } from "@angular/core";
import { AuthService } from "../usuarios/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: []
})
export class HeaderComponent {
  titulo = "AppAngular";

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire(
      "Logout",
      `Hola ${username} ha cerrado sesion con exito!`,
      "success"
    );
    this.router.navigate(["/login"]);
  }
}
