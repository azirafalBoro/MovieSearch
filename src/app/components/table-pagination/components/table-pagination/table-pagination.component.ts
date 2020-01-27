import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-table-pagination',
    templateUrl: './table-pagination.component.html',
    styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit, OnChanges {
    totalNumberOfPages: number;
    firstPageNumber = 1;
    form: FormGroup;
    @Input() totalNumberOfItems: number;
    @Input() itemsPerPage: number;
    @Input() pageNumber: number;

    @Output() PageChange = new EventEmitter<number>();

    constructor(private readonly formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            currentPage: [this.firstPageNumber, Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]+$')])]
        });
    }

    ngOnInit() {
            this.totalNumberOfPages = Math.ceil(this.totalNumberOfItems / this.itemsPerPage);
            if (this.form.controls.currentPage.value > this.totalNumberOfPages) {
                this.goToFirstPage();
            }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.pageNumber) {
            const value = changes.pageNumber.currentValue;
            this.form.setValue({currentPage: value});
        }

        if (changes.totalNumberOfItems || changes.itemsPerPage) {
            this.totalNumberOfPages = Math.ceil(this.totalNumberOfItems / this.itemsPerPage);
        }
        if (this.form.controls.currentPage.value > this.totalNumberOfPages) {
            this.goToLastPage();
        }
    }

    goToPreviousPage(): void {
        const changedPage = this.form.controls.currentPage.value;
        this.setCurrentPage(changedPage - 1);
    }

    goToNextPage(): void {
        const changedPage = this.form.controls.currentPage.value;
        this.setCurrentPage(changedPage + 1);
    }

    goToFirstPage(): void {
        this.setCurrentPage(this.firstPageNumber);
    }

    goToLastPage(): void {
        this.setCurrentPage(this.totalNumberOfPages);
    }

    isLastPage(): boolean {
        return this.form.controls.currentPage.value === this.totalNumberOfPages;
    }

    isFirstPage(): boolean {
        return this.form.controls.currentPage.value === this.firstPageNumber;
    }

    onCurrentPageChange(): void {
        const changedPage = this.form.controls.currentPage.value;

        if (changedPage > this.totalNumberOfPages) {
            this.setCurrentPage(this.totalNumberOfPages);
        } else if (changedPage < this.firstPageNumber) {
            this.setCurrentPage(this.firstPageNumber);
        } else {
            this.setCurrentPage(changedPage);
        }
    }

    setCurrentPage(currentPage: number): void {
        this.form.controls.currentPage.setValue(currentPage);
        this.PageChange.emit(currentPage);
    }
}
