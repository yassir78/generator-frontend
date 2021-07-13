import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PojoAddFieldComponent } from './pojo-add-field.component';

describe('PojoAddFieldComponent', () => {
  let component: PojoAddFieldComponent;
  let fixture: ComponentFixture<PojoAddFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PojoAddFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PojoAddFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
