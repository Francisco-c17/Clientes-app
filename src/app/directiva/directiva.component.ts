import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-directiva",
  templateUrl: "./directiva.component.html",
  styleUrls: ["./directiva.component.css"]
})
export class DirectivaComponent implements OnInit {
  cursos: String[] = ["Java", "Python", "JavaScript", "C#", "Ios"];
  habilitar = true;
  constructor() {}

  ngOnInit() {}
  public setHabilitar() {
    this.habilitar = this.habilitar === false ? true : false;
  }
}
