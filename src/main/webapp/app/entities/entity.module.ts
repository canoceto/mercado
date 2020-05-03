import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'proveedor',
        loadChildren: () => import('./proveedor/proveedor.module').then(m => m.MarketProveedorModule)
      },
      {
        path: 'producto',
        loadChildren: () => import('./producto/producto.module').then(m => m.MarketProductoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MarketEntityModule {}
