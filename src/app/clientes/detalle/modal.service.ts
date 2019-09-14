import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();

  constructor() {}

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  // set notificarUpload(e: EventEmitter<any>) {
  //   this._notificarUpload = e;
  // }
  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }
}
