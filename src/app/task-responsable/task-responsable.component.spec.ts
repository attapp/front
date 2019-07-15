import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskResponsableComponent } from './task-responsable.component';

describe('TaskResponsableComponent', () => {
  let component: TaskResponsableComponent;
  let fixture: ComponentFixture<TaskResponsableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskResponsableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
