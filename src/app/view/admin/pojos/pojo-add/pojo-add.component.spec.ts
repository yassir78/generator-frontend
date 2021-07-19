import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PojoAddComponent } from './pojo-add.component';

describe('PojoAddComponent', () => {
  let component: PojoAddComponent;
  let fixture: ComponentFixture<PojoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PojoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PojoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
