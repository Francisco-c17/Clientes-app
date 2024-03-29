import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DirectivaComponent } from "./directiva/directiva.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { FormComponent } from "./clientes/form.component";
//Http
import { HttpClientModule } from "@angular/common/http";
//Services
import { ClienteService } from "./cliente.service";
//Rutas
import { RouterModule, Routes } from "@angular/router";
//FORMS
import { FormsModule } from "@angular/forms";

import localeES from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { PaginatorComponent } from "./paginator/paginator.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Date
import {
  MatDatepickerModule /* MatNativeDateModule */
} from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DetalleComponent } from "./clientes/detalle/detalle.component";
import { LoginComponent } from "./usuarios/login.component";

registerLocaleData(localeES, "es");
const routes: Routes = [
  { path: "", redirectTo: "/clientes", pathMatch: "full" },
  { path: "directivas", component: DirectivaComponent },
  { path: "clientes", component: ClientesComponent },
  { path: "clientes/page/:page", component: ClientesComponent },
  { path: "clientes/form", component: FormComponent },
  { path: "clientes/form/:id", component: FormComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [ClienteService, { provide: LOCALE_ID, useValue: "es" }],
  bootstrap: [AppComponent]
})
export class AppModule {}
