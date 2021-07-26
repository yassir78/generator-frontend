import {MenuRole} from "./menuRole";
import {Pojo} from "./pojo";

export class Menu{
    public id: number;
    public libelle:string;
    public icone:string;
    public menuRoles:Array<MenuRole>;
    public pojo:Pojo;
    public menuItems:Menu;

}
