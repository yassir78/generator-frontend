import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Menu } from 'src/app/controller/model/menu';
import { MenuRole } from 'src/app/controller/model/menuRole';
import { RoleService } from 'src/app/controller/service/role.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {
    cols: any[];
        files: TreeNode[];

  constructor(private roleService:RoleService) { }
  
  ngOnInit(): void {
  this.files = [];
  this.roleService.editMenuRole$.subscribe(value=>{
    if(value){
      this.files = [];
         this.menuRoleToBeEdited.menu.menuItems.forEach(menuItem=>{
         let node = {
                data:{  
                    libelle:menuItem.libelle,
                    icone: menuItem.icone,
                },
                children: 
                  menuItem.menuItems.map(menuItem=>{return {data:{ libelle:menuItem.libelle,icone: menuItem.icone,}}})
                
            };

        this.files.push(node)
         // set form value
  }) 
 console.log(JSON. stringify(this.files))  //Read Object 
    }
  })
  this.cols = [
            { field: 'libelle', header: 'Libelle' },
            { field: 'icone', header: 'Icone' },
            { field: 'action', header: 'Action' }
        ];
}
  MenuToTreeNode(){

  }
   menuToTreeNode(menu:Menu){
   let object = {
    label:menu.libelle,
    expandedIcon: menu.icone,
    collapsedIcon: menu.icone,
    children: menu.menuItems.map(menu=>{return {label:menu.libelle,expandedIcon : menu.icone,collapsedIcon : menu.icone,children:this.nextChildren(menu)}})
   };
   return object;
 }

 nextChildren(menu:Menu){
    return menu.menuItems.map(m=>{return {label:m.libelle,expandedIcon : m.icone,collapsedIcon : m.icone}})
 }
  hide(){
    this.roleService.editMenuRoleDialog = false;
  }
    get menuRoleToBeEdited():  MenuRole{
      return this.roleService.menuRoleToBeEdited;
    }
    set menuRoleToBeEdite(value: MenuRole) {
      this.roleService.menuRoleToBeEdited = value;
    }
    get editMenuRoleDialog():  boolean{
      return this.roleService.editMenuRoleDialog;
    }
    set editMenuRoleDialog(value: boolean) {
      this.roleService.editMenuRoleDialog = value;
    }
}
