import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSkuRoutes } from './create-sku.routing';
import { CreateSkuComponent } from './create-sku.component';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CreateSkuRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule
    ],
    declarations: [CreateSkuComponent]
})

export class CreateSkuModule {}
