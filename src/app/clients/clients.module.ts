import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { ClientRoutes } from './clients.routing';
import { PriceListService } from '../services/pricelist.service';
import { SeqService } from '../services/seq.service';
import { ListClientsComponent } from "./list-clients/list-clients.component";
import { EditClientComponent } from "./edit-client/edit-client.component";
import { CreateClientComponent } from "./create-client/create-client.component";
import { ClientService } from '../services/client.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ClientRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        SelectModule
    ],
    declarations: [
        ListClientsComponent,
        EditClientComponent,
        CreateClientComponent
    ],
    providers: [
        ClientService,
        PriceListService,
        SeqService
    ]
})

export class ClientsModule { }
