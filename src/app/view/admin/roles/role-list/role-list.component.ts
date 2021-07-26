import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
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

  roles: RoleConfig[];

  role: RoleConfig;

  selectedRoles: RoleConfig[];

  submitted: boolean;

  cols: any[];

  pojos:Array<Pojo>;

  files3: TreeNode[];
  selectedFiles2;



  constructor(private roleService: RoleService, private messageService: MessageService,
              private confirmationService: ConfirmationService,private pojoService:PojoService,private router: Router) {}

  ngOnInit() {
    this.roles=this.roleService.getRoles();
    this.pojos=this.pojoService.items;
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

  editRole(product: RoleConfig) {
    this.role = {...product};
    this.roleDialog = true;
  }
  deleteRole(role: RoleConfig) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + role.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roles = this.roles.filter(val => val.name !== role.name);
        //this.role = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }
  nodeSelect(event) {
    this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
   // this.selectedFiles2.push(event.node.label);

  }
  nodeUnselect(event) {
    this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
  }
  saveRole() {
    this.submitted = true;

    if (true) {
      // if (this.role.id) {
      //   this.role[this.fin(this.product.id)] = this.product;
      //   this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      // } else {
      this.role.id = this.createId();
      this.role.permissions =  this.role.permissions || [];
      this.selectedFiles2.forEach(permission=>{
        if( permission.children ){console.log("parent")}
        else { this.role.permissions.push({name:permission.label})}
      });

      this.roles =  this.roles || [];

         this.roles.push(this.role);
         this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Role Created', life: 3000});
      //
      //
      this.roles = [...this.roles];
      this.roleDialog = false;
      this.role = new RoleConfig();
    }
  }
  //
  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }
  //
  //   return index;
  // }
  //
  createId(): number {
    let id = '';
    const chars = '0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return +id;
  }



}
