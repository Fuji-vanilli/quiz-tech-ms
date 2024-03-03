import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateogryUserComponent } from './cateogry-user.component';

describe('CateogryUserComponent', () => {
  let component: CateogryUserComponent;
  let fixture: ComponentFixture<CateogryUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CateogryUserComponent]
    });
    fixture = TestBed.createComponent(CateogryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
