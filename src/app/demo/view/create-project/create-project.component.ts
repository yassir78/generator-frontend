import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserConfigService } from 'src/app/controller/service/userConfigService';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectNameDisplay:string = "projectName"
  groupIdDisplay : string = "example"
  domainDisplay : string = "com"
  createProjectForm:FormGroup = new FormGroup({
      projectName:new FormControl('',Validators.required),
      groupId : new FormControl('',Validators.required),
      domain : new FormControl('',Validators.required)
  }
   
  )
  constructor(private userConfigService:UserConfigService,private router:Router) { }

  ngOnInit(): void {
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
    return this.userConfigService.domain;
  }

  set domain(value: string) {
    this.userConfigService.domain= value;
  }
      get groupId(): string {
    return this.userConfigService.groupId;
  }

  set groupId(value: string) {
    this.userConfigService.groupId = value;
  }
        get projectName(): string {
    return this.userConfigService.projectName;
  }

  set projectName(value: string) {
    this.userConfigService.projectName= value;
  }

}
