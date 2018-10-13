import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { PurchaseRoutes } from './purchase.routes';
import { ProviderService } from '../services/provider.service';
import { PriceListService } from '../services/pricelist.service';
import { SeqService } from '../services/seq.service';
import { PurchaseService } from 'app/services/purchases.service';
import { ListPurchasesComponent } from './list-purchases/list-purchases.component';
import { NewPurchaseComponent } from './new-purchase/new-purchase.component';
import { CorrelativeService } from 'app/services/correlative.service';
import { PriceSkuService } from 'app/services/pricesku.service';
import { SkuService } from 'app/services/sku.service';
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PurchaseRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        SelectModule
    ],
    declarations: [
        ListPurchasesComponent,
        NewPurchaseComponent,
        ViewPurchaseComponent
    ],
    providers: [
        ProviderService,
        PriceSkuService,
        PurchaseService,
        SkuService,
    ]
})

export class PurchaseModule { }
