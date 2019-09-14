import { Injectable } from "@angular/core";
import { formatDate, DatePipe } from "@angular/common";
import { CLIENTES } from "./clientes/clientes.json";
import { Cliente } from "./clientes/cliente.js";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent
} from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Region } from "./clientes/region.js";
import { AuthService } from "./usuarios/auth.service.js";

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8091/api/clientes";
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append("Authorization", "Bearer " + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    console.log("ERROR", e);
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(["/login"]);
      return true;
    }
    return false;
  }

  getregiones(): Observable<Region[]> {
    return this.http
      .get<Region[]>(this.urlEndPoint + "/regiones", {
        headers: this.agregarAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
  }
  getClientes(page: number): Observable<any> {
    // return of(CLIENTES);
    //Hacer cast <Cliente[]> ... para covnertir a tipo cliente
    //return this.http.get(this.urlEndPoint);
    //return this.http.get<Cliente[]>(this.urlEndPoint);

    /*********Otra menra con map */
    //MAP cambia el tipo de dato, TAP no cambia el tipo de dato
    return this.http.get(this.urlEndPoint + "/page/" + page).pipe(
      tap((response: any) => {
        //let clientes = response as Cliente[];
        console.log("ClienteService: tap 1");
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.createAt = formatDate(cliente.createAt,"dd-MM-yyyy","en-US"); //EEEE o EEE MMM o MMMM|| fullDate
          let datePipe = new DatePipe("es");
          // cliente.createAt = datePipe.transform(
          //   cliente.createAt,
          //   "EEEE dd, MMMM yyyy"
          // );
          return cliente;
        });
        return response;
      }),
      tap((response: any) => {
        console.log("ClienteService: tap 2");
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlEndPoint, cliente, {
        headers: this.agregarAuthorizationHeader()
      })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }
          this.router.navigate(["/clientes"]);
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  getCliente(id): Observable<Cliente> {
    return this.http
      .get<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.agregarAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire("Error al editar cliente", e.error.mensaje, "error");
          return throwError(e);
        })
      );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.agregarAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.agregarAuthorizationHeader()
      })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append("Authorization", "Bearer " + token);
    }
    const req = new HttpRequest(
      "POST",
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
        headers: httpHeaders
      }
    );

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
