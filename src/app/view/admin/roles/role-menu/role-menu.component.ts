import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Menu} from "../../../../controller/model/menu";
import {MenuService} from "../../../../controller/service/menu.service";
import {Pojo} from "../../../../controller/model/pojo";
import {RoleConfig} from "../../../../controller/model/roleConfig";
import {RoleService} from "../../../../controller/service/role.service";
import {PojoService} from "../../../../controller/service/pojo.service";
import {SplitterModule} from 'primeng/splitter';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.scss']
})
export class RoleMenuComponent implements OnInit {
  menusArray: Menu[] = [];
  appear:boolean=false;
  constructor(private formBuilder: FormBuilder, private confirmationService: ConfirmationService,
              private serviceMenu: MenuService, private serviceRole: RoleService,private servicePojo:PojoService,private router: Router) {
  }

  menuForm = new FormGroup({ 
    libelle:new FormControl("",[Validators.required]),
    icone:new FormControl("",[Validators.required]),
  });  

  sousMenuForm = new FormGroup({ 
    libelleS: new FormControl("",[Validators.required]), 
    iconeS: new FormControl("",[Validators.required]), 
  });
  
  menuFormEdit = new FormGroup({ 
    libelle:new FormControl("",[Validators.required]),
    icone:new FormControl("",[Validators.required]),
  });  
  
  sousMenuFormEdit = new FormGroup({ 
    libelle:new FormControl("",[Validators.required]),
    icone:new FormControl("",[Validators.required]),
  });  
  sousMenuToBeEdited:Menu[] = [];
  sousMenuToBeEditedIndex:number;
  menuToBeEdited:Menu;
  sousMenuEditing:boolean = false;
  editingMenuWithPojo:boolean=false;
  ngOnInit(): void {
    this.initCol();
  }
  openViewDialog(menu:Menu){
    console.log("open view Dialog")
    this.viewMenuDialog = true;
    this.selectedMenu = menu;
    this.serviceMenu.viewRefresh$.next(true);
  }
  addSousMenu(){
    const souMenu = this.sousMenuForm.value;
    this.menusArray.push({libelle:souMenu.libelleS,icone:souMenu.iconeS});
    this.resetMenuForm();
  }
  resetMenuForm(){
    this.sousMenuForm.reset();
    this.sousMenuForm = new FormGroup({ 
      libelleS: new FormControl("",[Validators.required]), 
      iconeS: new FormControl("",[Validators.required]), 
  
    });
  }

  hide(){
    this.menuForm.reset();
    this.resetMenuForm(); 
    this.serviceMenu.addMenuDialog = false;
    this.menusArray = [];
  }

  edit(menu:Menu){
    this.menuToBeEdited = menu;
    this.menuFormEdit.patchValue({
      icone:menu.icone,
      libelle:menu.libelle
    })
    if(menu.menuItems != undefined){
         this.sousMenuToBeEdited =  menu.menuItems.slice(0);
    }else{
          this.editingMenuWithPojo = true;
    }
    
    this.editMenuDialog = true;
  }
 hideEdit(){
   this.menuFormEdit.reset();
 }
  editSubMenu(menu:Menu){
    this.sousMenuEditing = true;
    this.sousMenuFormEdit.patchValue({
      icone:menu.icone,
      libelle:menu.libelle
    })
    this.sousMenuToBeEditedIndex = this.sousMenuToBeEdited.findIndex(m=>m.libelle == menu.libelle);
  }
  addSousMenuEdit(){
    const menuFormValues = this.sousMenuFormEdit.value;
    const menuLibelle = menuFormValues ? menuFormValues.libelle : false;
    const iconLibelle = menuFormValues ? menuFormValues.icone : false;
    this.sousMenuToBeEdited.push({icone:iconLibelle,libelle:menuLibelle})
    this.sousMenuFormEdit.reset();
  }
  editSousMenuForm(){
    this.sousMenuEditing = false;
    const menuFormValues = this.sousMenuFormEdit.value;
    const menuLibelle = menuFormValues ? menuFormValues.libelle : false;
    const iconLibelle = menuFormValues ? menuFormValues.icone : false;
    this.sousMenuToBeEdited[this.sousMenuToBeEditedIndex]= {icone:iconLibelle,libelle:menuLibelle}
    this.sousMenuFormEdit.reset();
  }
   deleteSousMenuToBeEdited(menu:Menu){
    this.sousMenuToBeEdited = this.sousMenuToBeEdited.filter(m=>m.libelle != menu.libelle)
  }
  editMenu(){
    const menuFormValues = this.menuFormEdit.value;
     const menuLibelle = menuFormValues ? menuFormValues.libelle : false;
     const iconLibelle = menuFormValues ? menuFormValues.icone : false;
     this.menuToBeEdited.icone = iconLibelle;
     this.menuToBeEdited.libelle = menuLibelle;
     this.sousMenuToBeEdited.length > 0 ? this.menuToBeEdited.menuItems = this.sousMenuToBeEdited : false;
     console.log(this.menuToBeEdited)
     this.editMenuDialog = false;
     this.sousMenuToBeEdited = [];
     this.menuFormEdit.reset();
     this.sousMenuForm.reset();
  }

  onSubmit(){
     const menuFormValues = this.menuForm.value;
     const menuLibelle = menuFormValues ? menuFormValues.libelle : false;
     const iconLibelle = menuFormValues ? menuFormValues.icone : false;
     let menu : Menu;
    if(this.menusArray != null){
      menu = {libelle:menuLibelle,icone:iconLibelle,menuItems:this.menusArray};
    }
    else{
      menu = {libelle:menuLibelle,icone:iconLibelle};
    }
     this.menus.push(menu);
     console.log(this.menus)
     this.menuForm.reset();
     this.resetMenuForm();
     this.menusArray = [];
     this.addMenuDialog = false;
  }


  private initCol() {
    this.servicePojo.items.forEach(pojo=>{
      this.menus.push({libelle:pojo.name,icone:"pi pi-list",pojo:pojo});
    })
  }


  delete(menuToDelete:Menu){
    this.menus = this.menus.filter(menu=>menu.libelle != menuToDelete.libelle)
  }

  deleteSousMenu(menu:Menu){
    this.menusArray = this.menusArray.filter(m=>m.libelle != menu.libelle)
   }
 openAffecterDialog(role:RoleConfig){
   this.affecterRoleDialog = true;
   this.selectedRole = role;
   console.log("***********************")
   this.serviceRole.affecterRole$.next(true);
   } 
//getters et setters
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
    set menus(value:Menu[]){
     this.serviceMenu.menus = value;
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
    get editMenuDialog(): boolean {
    return this.serviceMenu.editMenuDialog;
  }
  set editMenuDialog(value:boolean) {
    this.serviceMenu.editMenuDialog=value;
  }
     get viewMenuDialog(): boolean {
    return this.serviceMenu.viewMenuDialog;
  }
  set viewMenuDialog(value:boolean) {
    this.serviceMenu.viewMenuDialog=value;
  }
       get selectedMenu(): Menu {
    return this.serviceMenu.selectedMenu;
  }
  set selectedMenu(value:Menu) {
    this.serviceMenu.selectedMenu=value;
  }
get affecterRoleDialog(): boolean{
        return this.serviceRole.affecterRoleDialog;
    }
    set affecterRoleDialog(value: boolean) {
        this.serviceRole.affecterRoleDialog = value;
    }
    get selectedRole(): RoleConfig{
        return this.serviceRole.selectedRole;
    }
    set selectedRole(value: RoleConfig) {
        this.serviceRole.selectedRole = value;
    }
      get menusToBeAffected(): Menu[]{
        return this.serviceMenu.menusToBeAffected;
    }
    set menusToBeAffected(value: Menu[]) {
        this.serviceMenu.menusToBeAffected = value;
    }
  addMenu() {
    this.addMenuDialog=true;
  }
}
