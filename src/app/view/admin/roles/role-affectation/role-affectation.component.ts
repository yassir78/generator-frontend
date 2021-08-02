import {Component, OnInit} from '@angular/core';
import {MenuService} from 'src/app/controller/service/menu.service';
import {RoleConfig} from 'src/app/controller/model/roleConfig';
import {RoleService} from 'src/app/controller/service/role.service';
import {Menu} from 'src/app/controller/model/menu';
import {MenuRole} from "../../../../controller/model/menuRole";
import {count} from "rxjs/operators";

@Component({
    selector: 'app-role-affectation',
    templateUrl: './role-affectation.component.html',
    styleUrls: ['./role-affectation.component.scss']
})
export class RoleAffectationComponent implements OnInit {
    private cols: any[];
    private countt = 0;

    constructor(private roleService: RoleService, private menuService: MenuService) {
    }

    ngOnInit(): void {
        this.roleService.affecterRole$.subscribe(value => {
            if (value) {
                let pojoNames = [...new Set(this.selectedRole.permissions.map(permission => permission.name.split('.')[0]))];
                this.menusToBeAffected = this.menus.filter(menu => (menu.pojo && pojoNames.includes(menu.pojo.name) || (menu.pojo == undefined)))
            }
        });
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'icon', header: 'Icon'},
            {field: 'order', header: 'Order'},


        ];
    }

    hide() {
        this.affecterRoleDialog = false;
    }

    //submit
    addAffectedMenus(menu) {
     /*    console.log("resssss" + this.selectedRole.menuRoles)

       // this.affectedMenus.push({menu: menu, role: this.selectedRole, order: "" + this.countt})
        this.menusToBeAffected = this.menusToBeAffected.filter(m => m.libelle != menu.libelle)
        this.countt++;
        console.log(this.affectedMenus[0].order); */
        // TO DO
        // 1- inserer LE MENU DANS LE ROLE (selectedRole)
        // 2- inserer le menu et le role dans la liste menuRole
        // 3- ajouter input Ordre
        // 4- UI
    }

    affecter() {
        this.affectedMenus.map(mr => this.selectedRole.menuRoles.push(mr));

        this.affecterRoleDialog = false;
        this.affectedMenus = [];

    }

    onEditComplete(event) {
        this.affectedMenus.sort((n1, n2) => (n1.order > n2.order) ? 1 : -1);
        this.affectedMenus


    }

    delete(menuRole) {
        this.menusToBeAffected.push(menuRole.menu)

        //mr=>{mr.menu.libelle != menuRole.menu.libelle});
        this.affectedMenus = this.affectedMenus.filter(m => m.menu.libelle != menuRole.menu.libelle)

        //
        // TO DO
    }

    // getters and setters
    get affecterRoleDialog(): boolean {
        return this.roleService.affecterRoleDialog;
    }

    set affecterRoleDialog(value: boolean) {
        this.roleService.affecterRoleDialog = value;
    }

    get selectedRole(): RoleConfig {
        return this.roleService.selectedRole;
    }

    set selectedRole(value: RoleConfig) {
        this.roleService.selectedRole = value;
    }

    get menusToBeAffected(): Menu[] {
        return this.menuService.menusToBeAffected;
    }

    set menusToBeAffected(value: Menu[]) {
        this.menuService.menusToBeAffected = value;
    }

    get menus(): Array<Menu> {
        return this.menuService.menus;
    }

    set menus(value: Menu[]) {
        this.menuService.menus = value;
    }

    get affectedMenus(): MenuRole[] {
        return this.menuService.affectedMenus;
    }

    set affectedMenus(value: MenuRole[]) {
        this.menuService.affectedMenus = value;
    }
}
