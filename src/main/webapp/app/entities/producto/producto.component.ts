import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProducto } from 'app/shared/model/producto.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProductoService } from './producto.service';
import { ProductoDeleteDialogComponent } from './producto-delete-dialog.component';

@Component({
  selector: 'jhi-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit, OnDestroy {
  productos: IProducto[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected productoService: ProductoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.productos = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.productoService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IProducto[]>) => this.paginateProductos(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.productos = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProducto): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductos(): void {
    this.eventSubscriber = this.eventManager.subscribe('productoListModification', () => this.reset());
  }

  delete(producto: IProducto): void {
    const modalRef = this.modalService.open(ProductoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.producto = producto;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProductos(data: IProducto[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.productos.push(data[i]);
      }
    }
  }
}
