import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectConfigService } from 'src/app/controller/service/project-config.service';
import { UserConfigService } from 'src/app/controller/service/userConfigService';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectNameDisplay:string = this.projectConfigService.projectName;
  groupIdDisplay : string = this.projectConfigService.groupId;
  domainDisplay : string = this.projectConfigService.domain;
  createProjectForm:FormGroup = new FormGroup({
      projectName:new FormControl('',Validators.required),
      groupId : new FormControl('',Validators.required),
      domain : new FormControl('',Validators.required)
  }
   
  )
  constructor(private projectConfigService: ProjectConfigService,private router:Router) { }

  ngOnInit(): void {
    this.createProjectForm.setValue({
      domain:this.domain,
      projectName:this.projectName,
      groupId:this.groupId
    })
    this.onChanges();
  }

onChanges(): void {
  this.createProjectForm.valueChanges.subscribe(val => {
    const projectName = val.projectName;
    const domain = val.domain;
    const groupId = val.groupId;
    this.projectNameDisplay = projectName == '' ? 'projectName' : projectName;
    this.domainDisplay = domain == '' ? 'com' : domain;
    this.groupIdDisplay = groupId == '' ? 'example' : groupId;
  });
}
submit(){
  const formValues = this.createProjectForm.value;
    const projectName = formValues.projectName;
    const domain = formValues.domain;
    const groupId = formValues.groupId; 
    this.domain = domain;
    this.groupId = groupId;
    this.projectName = projectName;
    this.router.navigate(['/view/pojo/load'])

}
 get domain(): string {
    return this.projectConfigService.domain;
  }

  set domain(value: string) {
    this.projectConfigService.domain= value;
  }
      get groupId(): string {
    return this.projectConfigService.groupId;
  }

  set groupId(value: string) {
    this.projectConfigService.groupId = value;
  }
        get projectName(): string {
    return this.projectConfigService.projectName;
  }

  set projectName(value: string) {
    this.projectConfigService.projectName= value;
  }

}
