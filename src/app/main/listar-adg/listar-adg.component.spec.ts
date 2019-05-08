import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarADGComponent } from './listar-adg.component';

describe('ListarADGComponent', () => {
  let component: ListarADGComponent;
  let fixture: ComponentFixture<ListarADGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarADGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarADGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
