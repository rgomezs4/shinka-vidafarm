import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { ConfigRoutes } from './config.routing';
import { PriceListService } from '../services/pricelist.service';
import { CorrelativeService } from '../services/correlative.service';
import { PriceListComponent } from './price-list/price-list.component';
import { CorrelativeComponent } from './correlative/correlative.component';
import { NewCorrelativeComponent } from './new-correlative/new-correlative.component';
import { NewPriceListComponent } from './new-price-list/new-price-list.component';
import { EditPriceListComponent } from './edit-price-list/edit-price-list.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ConfigRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        SelectModule
    ],
    declarations: [
        PriceListComponent,
        CorrelativeComponent,
        NewCorrelativeComponent,
        NewPriceListComponent,
        EditPriceListComponent
    ],
    providers: [
        PriceListService,
        CorrelativeService
    ]
})

export class ConfigModule { }
