import { Pojo } from './../../../../controller/model/pojo';
import { PojoService } from './../../../../controller/service/pojo.service';
import { IconService } from 'src/app/controller/service/icon.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
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
    icons :any[];
    filtredIcons :any[];
    menus:any[] = [];
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

    editMenuRoleForm:FormGroup = new FormGroup({
      libelle:new FormControl('',Validators.required),
      icon:new FormControl('',Validators.required),
      ordre:new FormControl('',Validators.required)
    });

  constructor(private roleService:RoleService,private iconService:IconService) { }
  
  ngOnInit(): void {
    //get icons
    this.iconService.getIcons().then(icons => {
      this.icons = icons;
    });

  this.files = [];

  this.roleService.editMenuRole$.subscribe(value=>{
    if(value){
      //setting the values of the form
      this.editMenuRoleForm.setValue({
        libelle: this.menuRoleToBeEdited.menu.libelle,
        icon: this.menuRoleToBeEdited.menu.icone,
        ordre: this.menuRoleToBeEdited.order
      })

       //get menus
   this.menus = this.menuRoleToBeEdited.menu.menuItems.map(menu=>{ return {"libelle":menu.libelle}});
   console.log('***********',this.menus)

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
    console.log(this.files)
    }
  })
  this.cols = [
            { field: 'libelle', header: 'Libelle' },
            { field: 'icone', header: 'Icone' },
            { field: 'action', header: 'Action' }
        ];
}

//methods

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

showAddSubmenuForm(){
  this.addChildSubMenuFormShow = false;
  this.addSubMenuFormShow = !this.addSubMenuFormShow;
}

showPageAddForm(){
  this.addSubMenuFormShow = false;
  this.addChildSubMenuFormShow = !this.addChildSubMenuFormShow;
}

  hide(){
    this.roleService.editMenuRoleDialog = false;
    this.addSubMenuForm.reset();
    this.addChildToSubMenuForm.reset();
    this.addSubMenuFormShow = false;
    this.addChildSubMenuFormShow = false;
  }

  addChildToPtree(){
    const formValues = this.addChildToSubMenuForm.value;
    const menuName = formValues.menuName.name;
    const libelle = formValues.libelle;
    const icon = formValues.icon.icon;
    console.log(formValues)
    console.log(this.files)
    console.log(menuName)
    let sousMenu:any = this.files.find(file=>file.data.libelle == menuName);
    console.log('child',sousMenu)
    if(sousMenu.children == undefined){
      sousMenu.children = {data:{libelle:libelle,icone:icon},children:[]};
    }else{
        sousMenu.children.push({
      data:{
        libelle:libelle,
        icone:icon
      },
      children:[]
    })
    }


    this.addChildToSubMenuForm.reset();
    this.addChildSubMenuFormShow = false;
  }
  
  addSiblingToPtree(){
  const formValues = this.addSubMenuForm.value;
  const libelle= formValues.libelle;
  const icon= formValues.icon.icon;
  let node:any = {
    data:{  
        libelle:libelle,
        icone:icon,
    },
    children: [],
};
  this.files =[...this.files, node];;
  console.log(this.files)
  this.menus.push({"libelle":libelle})
  this.addSubMenuForm.reset();
  this.addSubMenuFormShow = false;
}

  submit(){

  }

  delete(){

  }


  //getters and setters
    get menuRoleToBeEdited():  MenuRole{
      return this.roleService.menuRoleToBeEdited;
    }
    set menuRoleToBeEdited(value: MenuRole) {
      this.roleService.menuRoleToBeEdited = value;
    }
    get editMenuRoleDialog():  boolean{
      return this.roleService.editMenuRoleDialog;
    }
    set editMenuRoleDialog(value: boolean) {
      this.roleService.editMenuRoleDialog = value;
    }

}
