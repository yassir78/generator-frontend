import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuViewComponent } from './role-menu-view.component';

describe('RoleMenuViewComponent', () => {
  let component: RoleMenuViewComponent;
  let fixture: ComponentFixture<RoleMenuViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMenuViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
