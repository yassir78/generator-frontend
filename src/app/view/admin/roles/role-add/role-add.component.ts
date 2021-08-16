import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TreeNode } from "primeng/api";
import { Permission } from "src/app/controller/model/permission";
import { Pojo } from "src/app/controller/model/pojo";
import { RoleConfig } from "src/app/controller/model/roleConfig";
import { PojoService } from "src/app/controller/service/pojo.service";
import { RoleService } from "src/app/controller/service/role.service";
import { IconService } from "src/app/controller/service/icon.service";
import { Menu } from "src/app/controller/model/menu";
import { MenuRole } from "src/app/controller/model/menuRole";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-role-add",
  templateUrl: "./role-add.component.html",
  styleUrls: ["./role-add.component.scss"],
})
export class RoleAddComponent implements OnInit {
  files3: TreeNode[];
  menusHierarchy: any[] = [];
  selectedFiles2;
  icons: any[];
  filtredIcons: any[];
  menusLayer2: Menu[] = [];
  menuRoles: MenuRole[] = [];
  menus;
  addRoleForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
  });
  addSubMenuFormShow: boolean = false;
  addChildSubMenuFormShow: boolean = false;
  addChildToSubMenuForm = new FormGroup({
    menuName: new FormControl("", null),
    icon: new FormControl("", Validators.required),
    libelle: new FormControl("", Validators.required),
  });
  addSubMenuForm: FormGroup = new FormGroup({
    libelle: new FormControl("", Validators.required),
    icon: new FormControl("", Validators.required),
  });
  addMenuForm: FormGroup = new FormGroup({
    libelle: new FormControl("", Validators.required),
    icon: new FormControl("", Validators.required),
  });
  constructor(
    private pojoService: PojoService,
    private roleService: RoleService,
    private iconService: IconService
  ) {}

  ngOnInit(): void {
    this.files3 = this.pojoToTreeNode();
    this.menus = this.pojos.map((pojo) => {
      return { name: pojo.name };
    });
    this.addChildToSubMenuForm
      .get("menuName")
      .setValue({ name: this.menus[0].name });
    this.iconService.getIcons().then((icons) => {
      this.icons = icons;
    });
  }

  showAddSubmenuForm() {
    this.addChildSubMenuFormShow = false;
    this.addSubMenuFormShow = !this.addSubMenuFormShow;
  }

  menuToTreeNode(menu: Menu) {
    let object = {
      label: menu.libelle,
      expandedIcon: menu.icone,
      collapsedIcon: menu.icone,
      children: menu.menuItems.map((menu) => {
        return {
          label: menu.libelle,
          expandedIcon: menu.icone,
          collapsedIcon: menu.icone,
          children: this.nextChildren(menu),
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

  showPageAddForm() {
    this.addSubMenuFormShow = false;
    this.addChildSubMenuFormShow = !this.addChildSubMenuFormShow;
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

  addMenu() {
    let menu = new Menu();
    menu.icone = this.menuIcon.value.icon;
    menu.libelle = this.menuLibelle.value;
    menu.menuItems = this.menusLayer2;
    this.menuRoles.push({ menu: menu, order: 1 });
    this.menusLayer2 = [];
    this.menusHierarchy.push([this.menuToTreeNode(menu)]);
    this.selectedFiles2 = [];
    this.addMenuForm.reset();
  }

  pojoToTreeNode() {
    return this.pojos.map((pojo) => {
      return {
        label: pojo.name,
        children: pojo.permissions.map((prem) => {
          return { label: prem.name };
        }),
      };
    });
  }

  nodeSelect(event) {
    const label: string = event.node.label;
    let pojoName: string;
    let pojo: Pojo;
    const permission = label.split(".")[1];
    if (label.includes(".")) {
      pojoName = label.split(".")[0];
      pojo = this.findPojoByName(pojoName);
      let menu = this.menusLayer2.find((menu) => menu.libelle === pojoName);
      if (menu) {
        const menuToAdd = {
          libelle: permission,
          icone: "pi pi-list",
          page: `${pojoName.toLowerCase()}/${permission}`,
        };
        menu.menuItems.push(menuToAdd);
      } else {
        const menuItem = {
          libelle: permission,
          icone: "pi pi-list",
          page: `${pojoName.toLowerCase()}/${permission}`,
        };
        this.menusLayer2.push({
          libelle: pojoName,
          icone: "pi pi-list",
          menuItems: [menuItem],
        });
      }
    } else {
      pojo = this.findPojoByName(label);
      const children = event.node.children;

      if (pojo != undefined) {
        let menusToAdd: Menu[] = children
          ? children.map((child) => {
              return {
                libelle: child.label.split(".")[1],
                icone: "pi pi-list",
                page: `${pojo.name.toLowerCase()}/${child.label.split(".")[1]}`,
              };
            })
          : [];
        this.menusLayer2.push({
          libelle: pojo != undefined ? pojo.name : label,
          icone: "pi pi-list",
          menuItems: menusToAdd,
        });
      } else {
        let menusToAdd: Menu[] = children
          ? children.map((child) => {
              return {
                libelle: child.label,
                icone: child.icon,
                page: `${label.toLowerCase()}/${child.label}`,
              };
            })
          : [];
        this.menusLayer2.push({
          libelle: pojo != undefined ? pojo.name : label,
          icone: event.node.icon,
          menuItems: menusToAdd,
        });
      }
    }
  }

  deleteMenuRole(menuRole: MenuRole) {
    this.menuRoles = this.menuRoles.filter(
      (mR) => mR.menu.libelle != menuRole.menu.libelle
    );
    this.menusHierarchy = this.menusHierarchy.filter(
      (menuHierarchy) => menuHierarchy[0].label != menuRole.menu.libelle
    );
  }

  nodeUnselect(event) {
    const label: string = event.node.label;
    let pojoName: string;
    this.role.permissions = Object.values(this.role.permissions);
    if (label.includes(".")) {
      pojoName = label.split(".")[0];
      const permission = label.split(".")[1];
      let menuToEdit = this.menusLayer2.find(
        (menu) => menu.libelle == pojoName
      );
      if (menuToEdit)
        menuToEdit.menuItems = menuToEdit.menuItems.filter(
          (menu) => menu.libelle != permission
        );
    } else {
      this.menusLayer2 = this.menusLayer2.filter(
        (menu) => menu.libelle != label
      );
    }
  }

  addSiblingToPtree() {
    const formValues = this.addChildToSubMenuForm.value;
    const menuName = formValues.menuName.name;
    const libelle = formValues.libelle;
    const icon = formValues.icon.icon;
    let sousMenu = this.files3.find((file) => file.label == menuName);
    sousMenu.children.push({ label: libelle, icon: icon });
    this.addChildToSubMenuForm.reset();
    this.addChildSubMenuFormShow = false;
  }

  addChildToPtree() {
    const formValues = this.addSubMenuForm.value;
    const libelle = formValues.libelle;
    const icon = formValues.icon.icon;
    let sousMenu: TreeNode = { label: libelle, icon: icon, children: [] };
    this.files3.push(sousMenu);
    this.menus.push({ name: libelle });
    this.addSubMenuForm.reset();
    this.addSubMenuFormShow = false;
  }
  submit() {
    const roleName = this.addRoleForm.value.name;
    this.roles.push({ name: roleName, menuRoles: this.menuRoles });
    // this.roleService.menusHierarchyTree.set({name:roleName,menuRoles:this.menuRoles},this.menuRoles this.menuToTreeNode(this.menuRoles) )
    this.menuRolesService = this.menuRoles;
    this.menuRoles = [];
    this.menusHierarchy = [];
    this.selectedFiles2 = [];
    this.menusLayer2 = [];
    this.addRoleDialog = false;
    this.addRoleForm.reset();
    this.addMenuForm.reset();
    this.addSubMenuForm.reset();
    this.addSubMenuFormShow = false;
    this.addChildToSubMenuForm.reset();
    this.addChildSubMenuFormShow = false;
  }

  hide() {
    this.menusLayer2 = [];
    this.selectedFiles2 = [];
    this.menuRoles = [];
    this.menusHierarchy = [];
    this.addRoleDialog = false;
    this.addRoleForm.reset();
    this.addMenuForm.reset();
    this.addSubMenuForm.reset();
    this.addSubMenuFormShow = false;
    this.addChildToSubMenuForm.reset();
    this.addChildSubMenuFormShow = false;
  }

  findPojoByName(name: string): Pojo {
    return this.pojos.find((pojo) => pojo.name == name);
  }

  get menuLibelle() {
    return this.addMenuForm.get("libelle");
  }
  get menuIcon() {
    return this.addMenuForm.get("icon");
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
  get roles(): RoleConfig[] {
    return this.roleService.roles;
  }
  set roles(value: Array<RoleConfig>) {
    this.roleService.roles = value;
  }
  get menuRolesService(): MenuRole[] {
    return this.roleService.menuRoles;
  }

  set menuRolesService(value: MenuRole[]) {
    this.roleService.menuRoles = value;
  }
}
