import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Pojo} from "../model/pojo";
import {RoleConfig} from "../model/roleConfig";
import {root} from "rxjs/internal-compatibility";
import {PojoService} from "./pojo.service";
import { Menu } from "primeng/menu";
import { MenuRole } from "../model/menuRole";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class RoleService {
    private baseUrl = "http://localhost:8036/";
    private _pojos:Array<Pojo>;
    private _roles:Array<RoleConfig> = new Array<RoleConfig>();
    private _role: RoleConfig = new RoleConfig();
    private _menuRole:MenuRole[] = new Array<MenuRole>();
    private _selectedRole:RoleConfig= new RoleConfig();
    private _affecterRoleDialog:boolean=false;
    public affecterRole$= new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient,pojoService:PojoService) { }

    get affecterRoleDialog(): boolean{
        return this._affecterRoleDialog;
    }
    set affecterRoleDialog(value: boolean) {
        this._affecterRoleDialog = value;
    }
    get menuRole(): MenuRole[]{
        return this._menuRole;
    }

    set menuRole(value: MenuRole[]) {
        this._menuRole = value;
    }

     get selectedRole(): RoleConfig{
        return this._role;
    }

    set selectedRole(value: RoleConfig) {
        this._role = value;
    }
     get role(): RoleConfig{
        return this._role;
    }

    set role(value: RoleConfig) {
        this._role = value;
    }
    get pojos(): Array<Pojo> {
        return this.pojos;
    }

    set pojos(value: Array<Pojo>) {
        this.pojos = value;
    }

    get roles() :RoleConfig[]{
        return this._roles;
    }
    set roles(value: Array<RoleConfig>) {
        this._roles = value;
    }
}
