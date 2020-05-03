import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProveedor } from 'app/shared/model/proveedor.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProveedorService } from './proveedor.service';
import { ProveedorDeleteDialogComponent } from './proveedor-delete-dialog.component';

@Component({
  selector: 'jhi-proveedor',
  templateUrl: './proveedor.component.html'
})
export class ProveedorComponent implements OnInit, OnDestroy {
  proveedors: IProveedor[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected proveedorService: ProveedorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.proveedors = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.proveedorService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IProveedor[]>) => this.paginateProveedors(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.proveedors = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProveedors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProveedor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProveedors(): void {
    this.eventSubscriber = this.eventManager.subscribe('proveedorListModification', () => this.reset());
  }

  delete(proveedor: IProveedor): void {
    const modalRef = this.modalService.open(ProveedorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proveedor = proveedor;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProveedors(data: IProveedor[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.proveedors.push(data[i]);
      }
    }
  }
}
