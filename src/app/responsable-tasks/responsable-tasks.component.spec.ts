import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableTasksComponent } from './responsable-tasks.component';

describe('ResponsableTasksComponent', () => {
  let component: ResponsableTasksComponent;
  let fixture: ComponentFixture<ResponsableTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsableTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
