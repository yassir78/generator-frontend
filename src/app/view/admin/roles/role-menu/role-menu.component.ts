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
  menuFormEdit:FormGroup;
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

  ngOnInit(): void {
    this.initCol();
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
    this.menuFormEdit = this.formBuilder.group({
      icon: new FormControl(menu.icone,[Validators.required]),
      libelle: new FormControl(menu.libelle,[Validators.required])});
      //sousMenu: this.formBuilder.array([ ])
    this.editMenuDialog = true;
  }
  // createItem(): FormGroup {
  //   return this.formBuilder.group({
  //     icon:  new FormControl('',[Validators.required]),
  //     libelle:  new FormControl('',[Validators.required]),
  //   });
  // }
  //   addItem(): void {
  //   this.sousMenu = this.menuForm.get('sousMenu') as FormArray;
  //   this.sousMenu.push(this.createItem());
  // }
  onSubmit(){
     const menuFormValues = this.menuForm.value;
     const sousMenuFormValues = this.sousMenuForm.value;

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

  addMenu() {
    this.addMenuDialog=true;
  }
}
