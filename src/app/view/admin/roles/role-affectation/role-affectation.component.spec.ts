import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAffectationComponent } from './role-affectation.component';

describe('RoleAffectationComponent', () => {
  let component: RoleAffectationComponent;
  let fixture: ComponentFixture<RoleAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleAffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
