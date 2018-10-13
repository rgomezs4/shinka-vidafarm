import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { InvoiceRoutes } from './invoice.routing';
import { ProviderService } from '../services/provider.service';
import { PriceListService } from '../services/pricelist.service';
import { SeqService } from '../services/seq.service';
import { SkuService } from '../services/sku.service';
import { PriceSkuService } from '../services/pricesku.service';
import { InvoiceService } from 'app/services/invoice.service';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { CorrelativeService } from 'app/services/correlative.service';
import { ClientService } from 'app/services/client.service';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InvoiceRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        SelectModule
    ],
    declarations: [
        ListInvoicesComponent,
        NewInvoiceComponent,
        ViewInvoiceComponent
    ],
    providers: [
        SkuService,
        PriceSkuService,
        InvoiceService,
        ClientService,
        CorrelativeService
    ]
})

export class InvoiceModule { }
