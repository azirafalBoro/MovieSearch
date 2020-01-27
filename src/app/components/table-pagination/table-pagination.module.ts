import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [TablePaginationComponent],
    exports: [TablePaginationComponent],
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class TablePaginationModule {
}
