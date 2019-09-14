import { Cliente } from "./cliente";
import { Region } from "./region";

export const CLIENTES: Cliente[] = [
  {
    id: 1,
    nombre: "Jose",
    apellido: "Pineda",
    email: "francisco-c17@hotmail.com",
    createAt: new Date().toString(),
    foto: "",
    region: new Region()
  },
  {
    id: 2,
    nombre: "goofy",
    apellido: "-",
    email: "pakonaruto@hotmail.com",
    createAt: new Date().toString(),
    foto: "",
    region: new Region()
  },
  {
    id: 3,
    nombre: "Francisco",
    apellido: "Ramirez",
    email: "francisco.pineda17ce@cenidet.edu.mx",
    createAt: new Date().toLocaleDateString(),
    foto: "",
    region: new Region()
  }
];
