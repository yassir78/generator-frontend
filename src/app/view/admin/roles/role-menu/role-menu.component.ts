import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Menu} from "../../../../controller/model/menu";
import {MenuService} from "../../../../controller/service/menu.service";
import {Pojo} from "../../../../controller/model/pojo";
import {RoleConfig} from "../../../../controller/model/roleConfig";
import {RoleService} from "../../../../controller/service/role.service";
import {PojoService} from "../../../../controller/service/pojo.service";

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.scss']
})
export class RoleMenuComponent implements OnInit {

  appear:boolean=false;
  cols: any[];
  colAttributs:any[];
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private serviceMenu: MenuService, private serviceRole: RoleService,private servicePojo:PojoService,private router: Router) {
  }

  ngOnInit(): void {
    this.initCol();
  }


  private initCol() {
    this.servicePojo.items.forEach(pojo=>{
      this.menus.push({libelle:pojo.name,icone:"pi-list",pojo:pojo});
    })
    this.cols = [
      {field: 'icone', header: 'Icone'},
      {field: 'libelle', header: 'Libelle'},
      {field: 'pojo', header: 'Pojo'},
      {field: 'actions', header: 'Actions'}
    ];

  }





  get roles() :RoleConfig[]{
    return this.serviceRole.roles;
  }
  get selectes(): Array<Menu> {
    return this.serviceMenu.selectes;
  }

  set selectes(value: Array<Menu>) {
    this.serviceMenu.selectes = value;
  }
  get menus(): Array<Menu> {
    return this.serviceMenu.menus;
  }
  get menu(): Menu {
    return this.serviceMenu.menu;
  }
  get addMenuDialog(): boolean {
    return this.serviceMenu.addMenuDialog;
  }
  set addMenuDialog(value:boolean) {
    this.serviceMenu.addMenuDialog=value;
  }
  affecter(role: RoleConfig) {

  }

  addMenu() {
    this.addMenuDialog=true;
  }
}
