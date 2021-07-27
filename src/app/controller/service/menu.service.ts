import { Injectable } from '@angular/core';
import {Menu} from "../model/menu";
import {HttpClient} from "@angular/common/http";
import {Pojo} from "../model/pojo";
import {RoleConfig} from "../model/roleConfig";
import {PojoService} from "./pojo.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = "http://localhost:8036/";
  private _menus:Array<Menu>=new Array<Menu>();
  private _menu: Menu = new Menu();
  private _selectes: Array<Menu>;
  private _addMenuDailog:boolean=false;


  constructor(private http: HttpClient,pojoService:PojoService) { }


  get selectes(): Array<Menu> {
    return this._selectes;
  }

  set selectes(value: Array<Menu>) {
    this._selectes = value;
  }
  get menus(): Array<Menu> {
    return this._menus;
  }

  set menus(value: Array<Menu>) {
    this._menus = value;
  }

  get menu(): Menu {
    return this._menu;
  }

  set menu(value: Menu) {
    this._menu = value;
  }
  get addMenuDialog(): boolean {
    return this._addMenuDailog;
  }

  set addMenuDialog(value: boolean) {
    this._addMenuDailog = value;
  }


}
