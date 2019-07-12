import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResponsableComponent } from './project-responsable.component';

describe('ProjectResponsableComponent', () => {
  let component: ProjectResponsableComponent;
  let fixture: ComponentFixture<ProjectResponsableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectResponsableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
