import { Component, OnInit } from "@angular/core";
import { Usuario } from "./usuario";
import Swal from "sweetalert2";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: []
})
export class LoginComponent implements OnInit {
  titulo: string = "Por favor Sing Up";
  usuario: Usuario;

  constructor(private authservice: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authservice.isAuthenticated()) {
      Swal.fire(
        "Login",
        `Hola ${this.authservice.usuario.username} ya estas loggeado!`,
        "info"
      );
      this.router.navigate(["/clientes"]);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire("Error Login", "Username o password vacias!", "error");
      return;
    }

    this.authservice.login(this.usuario).subscribe(
      response => {
        console.log(" mensaje", response);
        console.log(
          "vemoss!!",
          JSON.parse(atob(response.access_token.split(".")[1]))
        );
        //let payload = JSON.parse(atob(response.access_token.split(".")[1]));
        this.authservice.guardarUsuario(response.access_token);
        this.authservice.guardarToken(response.access_token);

        let usuario = this.authservice.usuario;
        this.router.navigate(["/clientes"]);
        Swal.fire(
          "Login",
          `Hola ${usuario.username}, has iniciado sesion!`,
          "success"
        );
      },
      err => {
        if (err.status == 400) {
          Swal.fire("Error Login", "Usuario o clave incorrecta", "error");
        }
      }
    );
  }
}
