import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeractividadeslistaComponent } from './veractividadeslista.component';

describe('VeractividadeslistaComponent', () => {
  let component: VeractividadeslistaComponent;
  let fixture: ComponentFixture<VeractividadeslistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeractividadeslistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeractividadeslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
