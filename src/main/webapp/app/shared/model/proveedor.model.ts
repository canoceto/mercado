import { IProducto } from 'app/shared/model/producto.model';

export interface IProveedor {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  zona?: string;
  manager?: IProducto;
}

export class Proveedor implements IProveedor {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public zona?: string,
    public manager?: IProducto
  ) {}
}
