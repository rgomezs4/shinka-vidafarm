import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { SkuRoutes } from './sku.routing';
import { ProviderService } from '../services/provider.service';
import { PriceListService } from '../services/pricelist.service';
import { SeqService } from '../services/seq.service';
import { SkuService } from '../services/sku.service';
import { PriceSkuService } from '../services/pricesku.service';

import { ListSkusComponent } from "./list-skus/list-skus.component";
import { EditSkuComponent } from "./edit-sku/edit-sku.component";
import { CreateSkuComponent } from "./create-sku/create-sku.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SkuRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        SelectModule
    ],
    declarations: [
        ListSkusComponent,
        EditSkuComponent,
        CreateSkuComponent
    ],
    providers: [
        ProviderService,
        PriceListService,
        SkuService,
        PriceSkuService,
        SeqService
    ]
})

export class SkusModule { }
