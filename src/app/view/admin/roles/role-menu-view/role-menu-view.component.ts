import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/controller/service/menu.service';
import { Menu } from 'src/app/controller/model/menu';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/controller/service/role.service';

@Component({
  selector: 'app-role-menu-view',
  templateUrl: './role-menu-view.component.html',
  styleUrls: ['./role-menu-view.component.scss']
})
export class RoleMenuViewComponent implements OnInit {
  //declarations 
  constructor(private menuService:MenuService,private roleService:RoleService) { }

  ngOnInit(): void {
  }

  // methods 


  // getters and setters 
    get selectedMenu(): Menu{
        return this.menuService.selectedMenu;
    }

    set selectedMenu(value: Menu) {
        this.menuService.selectedMenu = value;
    }
    get viewMenuDialog(): boolean{
        return this.menuService.viewMenuDialog;
    }

    set viewMenuDialog(value: boolean) {
        this.menuService.viewMenuDialog = value;
    }

}
