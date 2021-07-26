import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Pojo} from "../model/pojo";
import {RoleConfig} from "../model/roleConfig";
import {root} from "rxjs/internal-compatibility";
import {PojoService} from "./pojo.service";

@Injectable({
    providedIn: "root",
})
export class RoleService {
    private baseUrl = "http://localhost:8036/";
    private _pojos:Array<Pojo>;
    private roles:Array<RoleConfig>;

    constructor(private http: HttpClient,pojoService:PojoService) { }



    get pojos(): Array<Pojo> {
        return this.pojos;
    }

    set pojos(value: Array<Pojo>) {
        this.pojos = value;
    }

    getRoles() :RoleConfig[]{
        return null;

    }
}