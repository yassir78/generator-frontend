import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PojoEditComponent } from './pojo-edit.component';

describe('PojoEditComponent', () => {
  let component: PojoEditComponent;
  let fixture: ComponentFixture<PojoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PojoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PojoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
