import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "../cliente.service";
import swal from "sweetalert2";
import { tap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { ModalService } from "./detalle/modal.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  constructor(
    private clienteservice: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    //Registrar el observable

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get("page");
      if (!page) {
        page = 0;
      }
      this.clienteservice
        .getClientes(page)
        .pipe(
          tap((response: any) => {
            console.log("ClientesComponent: tap 3");
            (response.content as Cliente[]).forEach(cliente => {
              console.log(cliente.nombre);
            });
          })
        )
        .subscribe(resp => {
          this.clientes = resp.content as Cliente[];
          this.paginador = resp;
        });
    });

    this.modalService.notificarUpload.subscribe(cliente => {
      // this.clientes = this.clientes.map(clienteOriginal => {
      //   if (cliente.id == clienteOriginal) {
      //     clienteOriginal.foto = cliente.foto;
      //   }
      //   return clienteOriginal;
      // });
      this.clienteSeleccionado.foto = cliente.foto;
    });
  }
  //si no se agrega el subscribe no se ejecuta nunca el observable
  delete(cliente: Cliente): void {
    swal
      .fire({
        title: "¿Estas seguro?",
        text: `¿Seguro qeu desea eliminar al cliente ${cliente.nombre} ${
          cliente.apellido
        }?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#18E7A2",
        cancelButtonColor: "#DD94FB",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        confirmButtonClass: "btn btn-succes",
        cancelButtonClass: "btn btn-danger",

        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          this.clienteservice.delete(cliente.id).subscribe(response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal.fire(
              "Eliminado!",
              `Clinete ${cliente.nombre} eliminado con exito.`,
              "success"
            );
          });
        }
      });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
