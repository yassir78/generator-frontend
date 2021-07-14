import { Pojo } from "./pojo";
import { Type } from "./type";

export class Field {
  public name: string;
  public type: Type;
  public simple: boolean;
  public list: boolean;
  public generic: boolean;
  public id: boolean;
  public reference: boolean;
  //public pojo: Pojo;
  public mappedBy: string;
  public comboBox: boolean;
}
