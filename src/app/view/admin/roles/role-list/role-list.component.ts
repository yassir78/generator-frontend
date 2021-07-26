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
  indexOfEditedRole:number;
  items: MegaMenuItem[];
  selectedRoles: RoleConfig[];

  submitted: boolean;

  cols: any[];

  files3: TreeNode[];
  selectedFiles2;



  constructor(private roleService: RoleService, private messageService: MessageService,
              private confirmationService: ConfirmationService,private pojoService:PojoService,private router: Router) {}

  ngOnInit() {
    
    this.files3=this.pojoToTreeNode();
    this.cols = [
      {field: 'name', header: 'Name'}
     ];
  }

  pojoToTreeNode(){
    return this.pojos.map(pojo=>{
      return { "label": pojo.name ,"children":pojo.permissions.map(prem=>{return {"label":prem.name}})} });
  }

  openNew() {
    this.role = new RoleConfig();
    this.submitted = false;
    this.roleDialog = true;

  }

  deleteSelectedRole() {
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

  editRole(role: RoleConfig) {
    this.roleEditing = true;
    this.role = {...role,permissions:{...role.permissions}};
    this.indexOfEditedRole = this.roles.findIndex(r=>r.name === role.name)
    console.log(this.indexOfEditedRole)
    this.roleDialog = true;
  }
  deleteRole(role: RoleConfig) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + role.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roles = this.roles.filter(val => val.name !== role.name);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
    this.roleEditing = true;
  }
  nodeSelect(event) {
    const pojoName:string = event.node.label;
    const pojo:Pojo = this.findPojoByName(pojoName);
    let permissions:Permission[] = [];
    const children = event.node.children;
    children.forEach(child => {
      permissions.push({name:child.label,pojo:pojo})
    });
   this.role.permissions = Object.values(this.role.permissions);
   this.role.permissions.push(...permissions)
  }
  findPojoByName(name:string):Pojo{
    return this.pojos.find(pojo=>pojo.name == name);
  }
  nodeUnselect(event) {
   const children = event.node.children.map(child=>child.label);
   this.role.permissions = Object.values(this.role.permissions);
   this.role.permissions = this.role.permissions.filter(permission=> !children.includes(permission.name))
  }
  editSavedRole(){
    this.roles[this.indexOfEditedRole] = this.role;
    this.roleEditing = true;
    this.roleDialog = false;
  }
  saveRole() {
    this.roles.push(this.role);
    this.role = new RoleConfig();
    this.roleDialog = false;
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


}
