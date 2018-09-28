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

    ],
    providers: [
        PriceListService,
        CorrelativeService
    ]
})

export class ConfigModule { }
