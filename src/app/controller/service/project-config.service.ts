import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {
  private _projectName:string = 'projectName';
  private _groupId:string = 'example';
  private _domain:string = 'com';
  
  constructor() { }
 
    get domain(): string {
    return this._domain;
  }

  set domain(value: string) {
    this._domain= value;
  }
      get groupId(): string {
    return this._groupId;
  }

  set groupId(value: string) {
    this._groupId = value;
  }
        get projectName(): string {
    return this._projectName;
  }

  set projectName(value: string) {
    this._projectName= value;
  }

}
