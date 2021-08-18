import { MenuRole } from "src/app/controller/model/menuRole";
import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MegaMenuItem, MessageService } from "primeng/api";
import { RoleConfig } from "../../../../controller/model/roleConfig";
import { RoleService } from "../../../../controller/service/role.service";
import { Pojo } from "../../../../controller/model/pojo";
import { PojoService } from "../../../../controller/service/pojo.service";
import { TreeNode } from "primeng/api/primeng-api";
import { CdkTreeNode } from "@angular/cdk/tree";
import { Permission } from "../../../../controller/model/permission";
import { Router } from "@angular/router";
import { Menu } from "src/app/controller/model/menu";
import { Tree } from "primeng/tree";
import { UserConfigService } from "src/app/controller/service/userConfigService";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.scss"],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }

      @media screen and (max-width: 960px) {
        :host
          ::ng-deep
          .p-datatable.p-datatable-customers
          .p-datatable-tbody
          > tr
          > td:last-child {
          text-align: center;
        }

        :host
          ::ng-deep
          .p-datatable.p-datatable-customers
          .p-datatable-tbody
          > tr
          > td:nth-child(6) {
          display: flex;
        }
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class RoleListComponent implements OnInit {
  menusHierarchy: any[] = [];

  selectedRoles: RoleConfig[];
  submitted: boolean;
  selectedFiles2;

  constructor(
    private roleService: RoleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private pojoService: PojoService,
    private router: Router,
    private userConfigService: UserConfigService
  ) {}

  ngOnInit() {}

  openNew() {
    this.role = new RoleConfig();
    this.submitted = false;
    this.addRoleDialog = true;
  }

  deleteSelectedRole() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected products?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.roles = this.roles.filter(
          (val) => !this.selectedRoles.includes(val)
        );
        this.selectedRoles = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Products Deleted",
          life: 3000,
        });
      },
    });
    this.router.navigateByUrl("view/pojo/generate");
  }

  deleteMenuRole(menuRole: MenuRole) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + menuRole.menu.libelle + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.selectedRole.menuRoles = this.selectedRole.menuRoles.filter(
          (val) => val.menu.libelle !== menuRole.menu.libelle
        );
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Menu " + menuRole.menu.libelle + " deleted successfully!",
          life: 3000,
        });
      },
    });
  }

  showPermissionName(permissionName) {
    return permissionName.splite(".")[1];
  }

  findPojoByName(name: string): Pojo {
    return this.pojos.find((pojo) => pojo.name == name);
  }
  deleteRole(role: RoleConfig) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + role.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (this.selectedRole == role) this.selectedRole.menuRoles = [];
        this.roles = this.roles.filter((val) => val.name !== role.name);
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Role " + role.name + " deleted successfully!",
          life: 3000,
        });
      },
    });
  }

  navigateMenu() {
    this.router.navigateByUrl("view/pojo/generate");
    this.userConfigService.userConfig.roles = this.roles;
    //  let permissionsHistory: Permission[] = [];
    this.roles.forEach((role) => {
      role.permissions = [];
      role.menuRoles.forEach((menuRole) => {
        menuRole.menu.menuItems.forEach((sousMenu) => {
          if (this.pojos.find((pojo) => pojo.name == sousMenu.libelle)) {
            sousMenu.menuItems.forEach((page) => {
              role.permissions.push({
                name: `${sousMenu.libelle}.${page.libelle}`,
                pojo: this.findPojoByName(sousMenu.libelle),
              });
            });
          }
        });
      });
    });
  }

  details(role: RoleConfig) {
    this.selectedRole = role;
    this.menusHierarchy = [];
    role.menuRoles.forEach((menuRole) => {
      this.menusHierarchy.push([this.menuToTreeNode(menuRole.menu)]);
    });
  }
  menuToTreeNode(menu: Menu) {
    let object = {
      label: menu.libelle,
      expandedIcon: menu.icone,
      collapsedIcon: menu.icone,
      parent: undefined,
      children: menu.menuItems.map((m) => {
        return {
          label: m.libelle,
          expandedIcon: m.icone,
          collapsedIcon: m.icone,
          children: this.nextChildren(m),
        };
      }),
    };
    return object;
  }

  nextChildren(menu: Menu) {
    return menu.menuItems.map((m) => {
      return {
        label: m.libelle,
        expandedIcon: m.icone,
        collapsedIcon: m.icone,
      };
    });
  }
  editMenuRole(menuRole: MenuRole) {
    this.editMenuRoleDialog = true;
    this.roleService.menuRoleToBeEdited = menuRole;
    this.roleService.editMenuRole$.next(true);
  }
  get roles(): RoleConfig[] {
    return this.roleService.roles;
  }
  set roles(value: RoleConfig[]) {
    this.roleService.roles = value;
  }
  get pojos(): Pojo[] {
    return this.pojoService.items;
  }
  set pojos(value: Pojo[]) {
    this.pojoService.items = value;
  }

  get role(): RoleConfig {
    return this.roleService.role;
  }

  set role(value: RoleConfig) {
    this.roleService.role = value;
  }
  get addRoleDialog(): boolean {
    return this.roleService.addRoleDialog;
  }

  set addRoleDialog(value: boolean) {
    this.roleService.addRoleDialog = value;
  }
  get menusHierarchyTree() {
    return this.roleService.menusHierarchyTree;
  }
  get selectedRole(): RoleConfig {
    return this.roleService.selectedRole;
  }

  set selectedRole(value: RoleConfig) {
    this.roleService.selectedRole = value;
  }
  get editMenuRoleDialog(): boolean {
    return this.roleService.editMenuRoleDialog;
  }

  set editMenuRoleDialog(value: boolean) {
    this.roleService.editMenuRoleDialog = value;
  }
}
