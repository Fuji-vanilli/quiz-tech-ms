import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomComponent } from './welcom.component';

describe('WelcomComponent', () => {
  let component: WelcomComponent;
  let fixture: ComponentFixture<WelcomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomComponent]
    });
    fixture = TestBed.createComponent(WelcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
