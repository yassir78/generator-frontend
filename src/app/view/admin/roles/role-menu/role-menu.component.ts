import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Menu} from "../../../../controller/model/menu";
import {MenuService} from "../../../../controller/service/menu.service";
import {Pojo} from "../../../../controller/model/pojo";
import {RoleConfig} from "../../../../controller/model/roleConfig";
import {RoleService} from "../../../../controller/service/role.service";
import {PojoService} from "../../../../controller/service/pojo.service";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.scss']
})
export class RoleMenuComponent implements OnInit {
  menuForm: FormGroup;
  sousMenu: FormArray;
  menuFormEdit:FormGroup;
  appear:boolean=false;
  cols: any[];
  colAttributs:any[];
  constructor(private formBuilder: FormBuilder, private confirmationService: ConfirmationService,
              private serviceMenu: MenuService, private serviceRole: RoleService,private servicePojo:PojoService,private router: Router) {
  }

  ngOnInit(): void {
    this.initCol();
     this.menuForm = this.formBuilder.group({
      icon: new FormControl('',[Validators.required]),
      libelle: new FormControl('',[Validators.required]),
      sousMenu: this.formBuilder.array([ ])
    });
  }
  edit(menu:Menu){
    this.menuFormEdit = this.formBuilder.group({
      icon: new FormControl(menu.icone,[Validators.required]),
      libelle: new FormControl(menu.libelle,[Validators.required])});
      //sousMenu: this.formBuilder.array([ ])
    this.editMenuDialog = true;
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      icon:  new FormControl('',[Validators.required]),
      libelle:  new FormControl('',[Validators.required]),
    });
  }
    addItem(): void {
    this.sousMenu = this.menuForm.get('sousMenu') as FormArray;
    this.sousMenu.push(this.createItem());
  }
  onSubmit(){
     const formValues = this.menuForm.value;
     const menuLibelle = formValues ? formValues.libelle : false;
     const iconLibelle = formValues ? formValues.icon : false;
     const sousMenu : Menu[] = formValues ? formValues.sousMenu : false;
     let menu : Menu = {libelle:menuLibelle,icone:iconLibelle,menuItems:sousMenu};
     console.log(menu)
     this.menus.push(menu);
     console.log(this.menus)

    console.log("%c *****************************", "color: blue; font-size: x-large");

     console.log(this.menuForm)

     console.log("%c *****************************", "color: blue; font-size: x-large");
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
  delete(menuToDelete:Menu){
    this.menus = this.menus.filter(menu=>menu.libelle != menuToDelete.libelle)
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
  affecter(role: RoleConfig) {

  }

  addMenu() {
    this.addMenuDialog=true;
  }
}
