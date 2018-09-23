import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { ProviderRoutes } from './providers.routing';
import { ListProvidersComponent } from './list-providers/list-providers.component';
import { ProviderService } from '../services/provider.service';
import { EditProviderComponent } from './edit-provider/edit-provider.component';
import { PriceListService } from '../services/pricelist.service';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { SeqService } from '../services/seq.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProviderRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        SelectModule
    ],
    declarations: [
        ListProvidersComponent,
        EditProviderComponent,
        CreateProviderComponent
    ],
    providers: [
        ProviderService,
        PriceListService,
        SeqService
    ]
})

export class ProvidersModule { }
