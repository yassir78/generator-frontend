import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { Permission } from 'src/app/controller/model/permission';
import { Pojo } from 'src/app/controller/model/pojo';
import { RoleConfig } from 'src/app/controller/model/roleConfig';
import { PojoService } from 'src/app/controller/service/pojo.service';
import { RoleService } from 'src/app/controller/service/role.service';
import { IconService } from 'src/app/controller/service/icon.service';
import { Menu } from 'src/app/controller/model/menu';
import { MenuRole } from 'src/app/controller/model/menuRole';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  files3: TreeNode[];
  selectedFiles2;
  icons :any[];;
  filtredIcons :any[];
  menusLayer2:Menu[] = [];
  menuRoles:MenuRole[]=[];
  menus;
  addRoleForm:FormGroup = new FormGroup({
    name:new FormControl('',Validators.required)
  });
  addSubMenuFormShow:boolean=false;
  addChildSubMenuFormShow:boolean=false;
  addChildToSubMenuForm = new FormGroup({
    menuName:new FormControl("",null),
     icon:new FormControl('',Validators.required),
    libelle:new FormControl('',Validators.required),
   
  });
  addSubMenuForm:FormGroup = new FormGroup({
    libelle:new FormControl('',Validators.required),
    icon:new FormControl('',Validators.required),
  });
    addMenuForm:FormGroup = new FormGroup({
    libelle:new FormControl('',Validators.required),
    icon:new FormControl('',Validators.required)
  });
  constructor(private pojoService:PojoService,private roleService:RoleService,private iconService:IconService) { }

  ngOnInit(): void {
     this.files3=this.pojoToTreeNode();
     this.menus = this.pojos.map(pojo=>{ return {"name":pojo.name}});
     this.addChildToSubMenuForm.get('menuName').setValue({name:this.menus[0].name})
        this.iconService.getIcons().then(icons => {
          console.log(icons);
      this.icons = icons;
    });

  } 
    filterIcon(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.icons.length; i++) {
      let icon = this.icons[i];
      if (icon.icon.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(icon);
      }
    }

    this.filtredIcons = filtered;
  }
 addMenu(){
   let menu = new Menu();
   menu.icone = this.menuIcon.value;
   menu.libelle = this.menuLibelle.value;
   menu.menuItems = this.menusLayer2;
   this.menuRoles.push({menu:menu,role:this.role,order:1})
   console.log(this.menuRoles)
 }

  hide(){
      this.addRoleDialog = false;
  }
    pojoToTreeNode(){
    return this.pojos.map(pojo=>{
      return { "label": pojo.name ,"children":pojo.permissions.map(prem=>{return {"label":prem.name}})} });
  }
  nodeSelect(event) {
   const label:string = event.node.label;
   let pojoName:string;
   let pojo:Pojo
   const permission =  label.split('.')[1];
   if(label.includes(".")){
      pojoName = label.split('.')[0];
      pojo = this.findPojoByName(pojoName);
      let menu = this.menusLayer2.find(menu=>menu.libelle === pojoName);
      if(menu){
          const menuToAdd = {libelle:permission,icone:"pi pi-list",page:`${pojoName.toLowerCase()}/${permission}`};
          menu.menuItems.push(menuToAdd)
      }else{
        const menuItem = {libelle:permission,icone:"pi pi-list",page:`${pojoName.toLowerCase()}/${permission}`};
        this.menusLayer2.push({libelle:pojoName,icone:"pi pi-list",menuItems:[menuItem]})
      }
   }else{
      pojo = this.findPojoByName(label);
      const children = event.node.children;
      console.log(children)
      let menusToAdd : Menu[] = children ? children.map(child=> {return  {"libelle":child.label.split('.')[1],"icone":"pi pi-list",page:`${pojo.name.toLowerCase()}/${child.label.split('.')[1]}`} }) : [];
      this.menusLayer2.push({libelle:pojo.name,icone:"pi pi-list",menuItems:menusToAdd})
   }
   console.log(this.menusLayer2)
  }
  nodeUnselect(event) {
    const label:string = event.node.label;
    let pojoName:string;
     this.role.permissions = Object.values(this.role.permissions);
    if(label.includes(".")){
      pojoName = label.split('.')[0];
      const permission = label.split('.')[1];
      let menuToEdit =  this.menusLayer2.find(menu=>menu.libelle == pojoName) ;
      if(menuToEdit)
        menuToEdit.menuItems = menuToEdit.menuItems.filter(menu=>menu.libelle != permission)
    }else{
      this.menusLayer2 = this.menusLayer2.filter(menu=>menu.libelle != label);
    }
    console.log(this.menusLayer2)
  }
  addSiblingToPtree(){
    const formValues = this.addChildToSubMenuForm.value;
    console.log(formValues)
    const menuName = formValues.menuName.name;
    const libelle = formValues.libelle;
    const icon = formValues.icon;
    console.log(menuName);
    console.log(this.files3)
    let sousMenu = this.files3.find(file=>file.label == menuName);
    sousMenu.children.push({label:libelle,icon:icon})

  
  }
addChildToPtree(){
  const formValues = this.addSubMenuForm.value;
  console.log(formValues)
  const libelle = formValues.libelle;
  const icon = formValues.icon
  this.files3.push({"label":libelle});
  this.menus.push({"name":libelle})
  this.addSubMenuForm.reset();
}
    findPojoByName(name:string):Pojo{
    return this.pojos.find(pojo=>pojo.name == name);
  }

  get menuLibelle(){
    return this.addMenuForm.get('libelle')
  }
    get menuIcon(){
    return this.addMenuForm.get('icon')
  }
  get pojos() :Pojo[]{
    return this.pojoService.items;
  }
  set pojos(value:Pojo[]){
    this.pojoService.items = value;
  }
  get role(): RoleConfig{
    return this.roleService.role;
    }

  set role(value: RoleConfig) {
    this.roleService.role = value;
    }
  get addRoleDialog(): boolean{
    return this.roleService.addRoleDialog;
    }

  set addRoleDialog(value: boolean) {
    this.roleService.addRoleDialog = value;
    }
  

}
