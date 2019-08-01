import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Task } from '../interfaces/Task';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {

  constructor(private projectService: ProjectService,
    private authService: AuthService,
    private router: Router) { }

  private tasks: Task [];
  

  ngOnInit() {
  }

}
