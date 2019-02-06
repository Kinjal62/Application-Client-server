import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MywallComponent } from './mywall.component';

describe('MywallComponent', () => {
  let component: MywallComponent;
  let fixture: ComponentFixture<MywallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MywallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MywallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
