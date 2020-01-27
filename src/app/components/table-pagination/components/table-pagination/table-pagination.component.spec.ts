import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TablePaginationComponent } from './table-pagination.component';
import { TableModule } from 'primeng/table';
import { AlarmSeverityIconComponent } from '../../../alarm-severity-icon/components/alarm-severity-icon/alarm-severity-icon.component';
import { MockComponent } from 'ng-mocks';
import { Observable } from 'rxjs/internal/Observable';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SimpleChange } from '@angular/core';

describe('TablePaginationComponent', () => {
    let component: TablePaginationComponent;
    let fixture: ComponentFixture<TablePaginationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TablePaginationComponent,
                MockComponent(AlarmSeverityIconComponent)],
            imports: [
                TableModule,
                ButtonModule,
                InputTextModule,
                FormsModule,
                ReactiveFormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TablePaginationComponent);
        component = fixture.componentInstance;
        component.itemsPerPage = 15;
        component.totalNumberOfItems = 100;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should go to previous page', () => {
        spyOn(component.PageChange, 'emit');
        setFormValue(component.form.controls.currentPage, 5);
        component.goToPreviousPage();

        expect(component.PageChange.emit).toHaveBeenCalled();
        expect(component.form.controls.currentPage.value).toEqual(4);
    });

    it('should go to next page', () => {
        spyOn(component.PageChange, 'emit');
        setFormValue(component.form.controls.currentPage, 5);
        component.goToNextPage();

        expect(component.PageChange.emit).toHaveBeenCalled();
        expect(component.form.controls.currentPage.value).toEqual(6);
    });

    it('should go to first page', () => {
        spyOn(component.PageChange, 'emit');
        setFormValue(component.form.controls.currentPage, 5);
        component.goToFirstPage();

        expect(component.PageChange.emit).toHaveBeenCalled();
        expect(component.form.controls.currentPage.value).toEqual(1);
    });

    it('should go to last page', () => {
        spyOn(component.PageChange, 'emit');
        setFormValue(component.form.controls.currentPage, 5);
        component.goToLastPage();

        expect(component.PageChange.emit).toHaveBeenCalled();
        expect(component.form.controls.currentPage.value).toEqual(7);
    });

    it('should enable last page button', () => {
        setFormValue(component.form.controls.currentPage, 5);

        const isLastPageDisabled = component.isLastPage();

        expect(isLastPageDisabled).toEqual(false);
    });

    it('should disable last page button', () => {
        setFormValue(component.form.controls.currentPage, 7);

        const isLastPageDisabled = component.isLastPage();

        expect(isLastPageDisabled).toEqual(true);
    });

    it('should enable first page button', () => {
        setFormValue(component.form.controls.currentPage, 5);

        const isFirstPageDisabled = component.isFirstPage();

        expect(isFirstPageDisabled).toEqual(false);
    });

    it('should disable first page button', () => {
        setFormValue(component.form.controls.currentPage, 1);

        const isFirstPageDisabled = component.isFirstPage();

        expect(isFirstPageDisabled).toEqual(true);
    });

    it('should validate currentPage update on max value', () => {
        spyOn(component.PageChange, 'emit');
        setFormValue(component.form.controls.currentPage, 123);

        component.onCurrentPageChange();

        expect(component.form.controls.currentPage.value).toEqual(7);
        expect(component.PageChange.emit).toHaveBeenCalled();
    });

    it('should validate currentPage update on min value', () => {
        spyOn(component.PageChange, 'emit');
        setFormValue(component.form.controls.currentPage, -123);

        component.onCurrentPageChange();

        expect(component.form.controls.currentPage.value).toEqual(1);
        expect(component.PageChange.emit).toHaveBeenCalled();
    });

    it('should set current page on ngOnChanges ', () => {
        component.ngOnChanges({
            pageNumber: new SimpleChange(123, 6, true)
        });

        fixture.detectChanges();
        expect(component.totalNumberOfPages).toEqual(7);
        expect(component.form.value.currentPage).toEqual(6);
    });

    it('should set to last page if current page is grater that totalNumberOfPages', () => {
        component.ngOnChanges({
            pageNumber: new SimpleChange(123, 111, true)
        });

        fixture.detectChanges();
        expect(component.form.value.currentPage).toEqual(component.totalNumberOfPages);
    });

    function setFormValue(control: AbstractControl, value: number) {
        control.markAsDirty();
        control.markAsTouched();
        control.setValue(value);
    }
});
