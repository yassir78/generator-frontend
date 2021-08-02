import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MegaMenuItem, MessageService} from "primeng/api";
import {RoleConfig} from "../../../../controller/model/roleConfig";
import {RoleService} from "../../../../controller/service/role.service";
import {Pojo} from "../../../../controller/model/pojo";
import {PojoService} from "../../../../controller/service/pojo.service";
import {TreeNode} from "primeng/api/primeng-api";
import {CdkTreeNode} from "@angular/cdk/tree";
import {Permission} from "../../../../controller/model/permission";
import {Router} from "@angular/router";
import { Menu } from 'src/app/controller/model/menu';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  styles: [`
		:host ::ng-deep .p-dialog .product-image {
			width: 150px;
			margin: 0 auto 2rem auto;
			display: block;
		}

		@media screen and (max-width: 960px) {
			:host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
				text-align: center;
			}

			:host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
				display: flex;
			}
		}

    `],
  providers: [MessageService, ConfirmationService]
})

export class RoleListComponent implements OnInit {

  roleDialog: boolean;
  roleEditing:boolean=false;
    menusHierarchy:any[] = [];

  indexOfEditedRole:number;
  items: MegaMenuItem[];
  selectedRoles: RoleConfig[];
  indexOfEdited:number = 0;
  submitted: boolean;
  cols: any[];
  files3: TreeNode[];
  selectedFiles2;
  selectedFilesHistory = new Map();
  selectedFilesHistoryIndex = 0;
  
  constructor(private roleService: RoleService, private messageService: MessageService,
              private confirmationService: ConfirmationService,private pojoService:PojoService,private router: Router) {}

  ngOnInit() {
    this.items = [
            {
                label: 'Videos', icon: 'pi pi-fw pi-video',
                items: [
                    [
                        {
                            label: 'Video 1',
                        },
                        {
                            label: 'Video 2',
                        }
                    ],
           
                ]
            }]
    this.files3=this.pojoToTreeNode();
    this.cols = [
      {field: 'name', header: 'Name'}
     ];
  }
  
  roleToTreeNode(role:RoleConfig){
     const pojos = [...new Set(role.permissions.map(permission=>permission.pojo.name))];
     const permissions = role.permissions.map(permission=>permission.name)
     let object : any = pojos.map(pojo=>{
       return {"children":permissions.filter(permission=>permission.split(".")[0] == pojo).map(elem=>{return {"label":elem}}),"label":pojo,"parent":undefined,"partialSelected":false}
     })
     permissions.forEach(permission=>object.push({"label":permission,"parent":{"label":role.permissions.find(per=>per.name ==permission).pojo.name,expanded: false,parent: undefined,partialSelected: false} ,"partialSelected":false}))
     return object;
  }
  pojoToTreeNode(){
    return this.pojos.map(pojo=>{
      return { "label": pojo.name ,"children":pojo.permissions.map(prem=>{return {"label":prem.name}})} });
  }

  openNew() {
    this.role = new RoleConfig();
    this.submitted = false;
    this.addRoleDialog = true;

  }

  deleteSelectedRole() {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
        this.selectedRoles = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
    this.router.navigateByUrl('view/pojo/generate');
    
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete the selected products?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
    //     this.selectedRoles = null;
    //     this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    //   }
    // });
  }

  showPermissionName(permissionName){
    return permissionName.splite('.')[1];
  }

  editRole(role: RoleConfig,index:number) {
    this.indexOfEdited = index;
    this.roleEditing = true;
    this.role = {...role,permissions:{...role.permissions}};
    this.indexOfEditedRole = this.roles.findIndex(r=>r.name === role.name)
    this.selectedFiles2=this.selectedFilesHistory.get(this.indexOfEdited);
    this.roleDialog = true;

  }
      findPojoByName(name:string):Pojo{
    return this.pojos.find(pojo=>pojo.name == name);
  }
  deleteRole(role: RoleConfig,index:number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + role.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedFilesHistory.delete(index);
        this.selectedFilesHistoryIndex--;
        this.roles = this.roles.filter(val => val.name !== role.name);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Role '+role.name+' deleted successfully!', life: 3000});
      }
    });
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
    if(this.roleEditing) this.roleEditing = false;
    if(!this.roleEditing){
      this.selectedFiles2 = [];
      this.role = new RoleConfig();
    }
  }
  nodeSelect(event) {
   const label:string = event.node.label;
   let pojoName:string;
   let pojo:Pojo
   this.role.permissions = Object.values(this.role.permissions);
   if(label.includes(".")){
      pojoName = label.split('.')[0];
      pojo = this.findPojoByName(pojoName);
      this.role.permissions.push({name:label, pojo:pojo})
   }else{
      pojo = this.findPojoByName(label);
      let permissions:Permission[] = [];
      const children = event.node.children;
      //this.role.permissions = Object.values(this.pojo.permissions);
      children ? children.forEach(child => {permissions.push({name:child.label,pojo:pojo})}) : false;
      this.role.permissions.push(...permissions)
   }
  }
  nodeUnselect(event) {
    const label:string = event.node.label;
    let pojoName:string;
     this.role.permissions = Object.values(this.role.permissions);
    if(label.includes(".")){
      pojoName = label.split('.')[0];
      this.role.permissions = this.role.permissions.filter(permission=>(permission.pojo.name != label && permission.name != label));
    }else{
      this.role.permissions = this.role.permissions.filter(permission=>permission.pojo.name != label);
    }
  /*  const children = event.node.children.map(child=>child.label);
   this.role.permissions = Object.values(this.role.permissions);
   this.role.permissions = this.role.permissions.filter(permission=> !children.includes(permission.name)) */
  }

  navigateMenu(){
     this.router.navigateByUrl("view/role/menu");
  }
  editSavedRole(){
    this.role.permissions = Object.values(this.role.permissions);
    this.roles[this.indexOfEditedRole] = this.role;
    this.roleEditing = false;
    this.roleDialog = false;
    this.selectedFilesHistory.delete(this.indexOfEdited);
    this.selectedFilesHistory.set(this.indexOfEdited,this.selectedFiles2);
  }
  getSelectedFile(){

  }
  saveRole() {
    this.roles.push(this.role);
    this.role = new RoleConfig();
    this.roleDialog = false;
    this.roleEditing = false;
    this.selectedFilesHistory.set(this.selectedFilesHistoryIndex,this.selectedFiles2)
    this.selectedFilesHistoryIndex++;
    this.selectedFiles2 = [];
  }
  details(role:RoleConfig){
      this.selectedRole = role;
      this.menusHierarchy = [];
      role.menuRoles.forEach(menuRole=>{
       this.menusHierarchy.push([this.menuToTreeNode(menuRole.menu)])
      });
      console.log(this.menusHierarchy)
  }
   menuToTreeNode(menu:Menu){
   let object = {
    label:menu.libelle,
    expandedIcon: menu.icone,
    collapsedIcon: menu.icone,
    parent:undefined,
    children: menu.menuItems.map(m=>{return {label:m.libelle,expandedIcon : m.icone,collapsedIcon : m.icone,children:this.nextChildren(m)}})
   };
   return object;
 }

 nextChildren(menu:Menu){
    return menu.menuItems.map(m=>{return {label:m.libelle,expandedIcon : m.icone,collapsedIcon : m.icone}})
 }
  get roles() :RoleConfig[]{
    return this.roleService.roles;
  }
  set roles(value:RoleConfig[]){
    this.roleService.roles = value;
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
  get menusHierarchyTree(){
    return this.roleService.menusHierarchyTree;
    }
    get selectedRole(): RoleConfig{
        return this.roleService.selectedRole;
    }

    set selectedRole(value: RoleConfig) {
        this.roleService.selectedRole = value;
    }

}
