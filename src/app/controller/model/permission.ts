import { RoleConfig } from "./roleConfig";
import { Pojo } from "./pojo";

export class Permission {
  public name: string;
  // public roles?:Array<RoleConfig> = [];
  public pojo?: Pojo;
}
