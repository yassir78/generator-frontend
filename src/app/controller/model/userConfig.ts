import { ProjectTemplate } from "./projectTemplate";
import { ProjectConfig } from "./project-config";
import { Pojo } from "./pojo";
import { RoleConfig } from "./roleConfig";
export class UserConfig {
  wantBackend: boolean = true;
  wantFrontend: boolean = true;
  backend: ProjectTemplate = new ProjectTemplate();
  frontend: ProjectTemplate = new ProjectTemplate();
  pojos: Array<Pojo> = new Array<Pojo>();
  config: ProjectConfig = new ProjectConfig();
  roles: RoleConfig[] = [];
}
