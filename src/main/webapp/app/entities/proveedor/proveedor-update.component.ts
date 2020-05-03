import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProveedor, Proveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from './proveedor.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';

@Component({
  selector: 'jhi-proveedor-update',
  templateUrl: './proveedor-update.component.html'
})
export class ProveedorUpdateComponent implements OnInit {
  isSaving = false;
  productos: IProducto[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [],
    email: [],
    phoneNumber: [],
    zona: [],
    manager: []
  });

  constructor(
    protected proveedorService: ProveedorService,
    protected productoService: ProductoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proveedor }) => {
      this.updateForm(proveedor);

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));
    });
  }

  updateForm(proveedor: IProveedor): void {
    this.editForm.patchValue({
      id: proveedor.id,
      firstName: proveedor.firstName,
      lastName: proveedor.lastName,
      email: proveedor.email,
      phoneNumber: proveedor.phoneNumber,
      zona: proveedor.zona,
      manager: proveedor.manager
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proveedor = this.createFromForm();
    if (proveedor.id !== undefined) {
      this.subscribeToSaveResponse(this.proveedorService.update(proveedor));
    } else {
      this.subscribeToSaveResponse(this.proveedorService.create(proveedor));
    }
  }

  private createFromForm(): IProveedor {
    return {
      ...new Proveedor(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      zona: this.editForm.get(['zona'])!.value,
      manager: this.editForm.get(['manager'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProveedor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProducto): any {
    return item.id;
  }
}
