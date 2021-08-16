import { Injectable } from "@angular/core";
import { BackendConfig } from "../model/backend-config";

@Injectable({
  providedIn: "root",
})
export class ProjectConfigService {
  private _projectName: string = "projectName";
  private _groupId: string = "example";
  private _domain: string = "com";
  private _backendConfig: BackendConfig = new BackendConfig();

  constructor() {}

  get domain(): string {
    return this._domain;
  }

  set domain(value: string) {
    this._domain = value;
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
    this._projectName = value;
  }
  get backendConfig(): BackendConfig {
    return this._backendConfig;
  }

  set backendConfig(value: BackendConfig) {
    this._backendConfig = value;
  }
}
