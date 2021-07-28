import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/controller/service/menu.service';
import { RoleConfig } from 'src/app/controller/model/roleConfig';
import { RoleService } from 'src/app/controller/service/role.service';
import { Menu } from 'src/app/controller/model/menu';

@Component({
  selector: 'app-role-affectation',
  templateUrl: './role-affectation.component.html',
  styleUrls: ['./role-affectation.component.scss']
})
export class RoleAffectationComponent implements OnInit {

  constructor(private roleService:RoleService,private menuService:MenuService) { }
  
  ngOnInit(): void {
    this.roleService.affecterRole$.subscribe(value=>{
      if(value){
       let pojoNames= [...new Set(this.selectedRole.permissions.map(permission=>permission.name.split('.')[0]))];
       this.menusToBeAffected = this.menus.filter(menu=>(menu.pojo && pojoNames.includes(menu.pojo.name) || (menu.pojo == undefined)))
       console.log( this.menusToBeAffected)
      }
    });
  }
    hide(){
    this.affecterRoleDialog = false;
    }
  affecter(menu){
    console.log(menu)
    this.affectedMenus.push(menu)
    this.menusToBeAffected = this.menusToBeAffected.filter(m=>m.libelle != menu.libelle)
    // TO DO 
   // 1- inserer LE MENU DANS LE ROLE (selectedRole)
   // 2- inserer le menu et le role dans la liste menuRole
   // 3- ajouter input Ordre
   // 4- UI
  }
  delete(menu){
    this.menusToBeAffected.push(menu)
    this.affectedMenus = this.affectedMenus.filter(m=>m.libelle != menu.libelle);
    // TO DO 
  }
    // getters and setters 
    get affecterRoleDialog(): boolean{
      return this.roleService.affecterRoleDialog;
    }
    set affecterRoleDialog(value: boolean) {
      this.roleService.affecterRoleDialog = value;
    }
    get selectedRole(): RoleConfig{
        return this.roleService.selectedRole;
    }
    set selectedRole(value: RoleConfig) {
        this.roleService.selectedRole = value;
    }
      get menusToBeAffected(): Menu[] {
    return this.menuService.menusToBeAffected;
  }

  set menusToBeAffected(value: Menu[]) {
    this.menuService.menusToBeAffected= value;
  }
    get menus(): Array<Menu> {
    return this.menuService.menus;
  }
    set menus(value:Menu[]){
     this.menuService.menus = value;
  }
    get affectedMenus(): Menu[] {
    return this.menuService.affectedMenus;
  }
  set affectedMenus(value: Menu[]) {
    this.menuService.affectedMenus= value;
  }
}
