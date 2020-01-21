import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesResultTablesComponent } from './movies-result-tables.component';

describe('MoviesResultTablesComponent', () => {
  let component: MoviesResultTablesComponent;
  let fixture: ComponentFixture<MoviesResultTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesResultTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesResultTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
