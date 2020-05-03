export interface IProducto {
  id?: number;
  producto?: string;
  precio?: number;
  descripcion?: string;
}

export class Producto implements IProducto {
  constructor(public id?: number, public producto?: string, public precio?: number, public descripcion?: string) {}
}
