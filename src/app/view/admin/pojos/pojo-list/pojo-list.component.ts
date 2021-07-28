


import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {
  ConfirmationService,
  MessageService,
  SelectItem,
  TreeNode,
} from "primeng/api";
import { PojoService } from "../../../../controller/service/pojo.service";
import { Pojo } from "../../../../controller/model/pojo";
import { Router } from "@angular/router";
import {Field} from "../../../../controller/model/field";
import { saveAs } from 'file-saver';

import * as YAML from "json2yaml"
import {RoleService} from "../../../../controller/service/role.service";
@Component({
  selector: "app-pojo-list",
  templateUrl: "./pojo-list.component.html",
  styleUrls: ["./pojo-list.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class PojoListComponent implements OnInit {

  appear: boolean = false;
  cols: any[];
  selectedType: any;
  colAttributs: any[];
  statuses: SelectItem[];
  roloService:RoleService;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: PojoService,
    private router: Router
  ) {}

  editFieldDialog(field:Field){
    this.service.editFieldDialog = true;
    this.service.fieldToBeEdited = {...field, type:{...field.type}};
    this.service.fieldToBeEditedIndex = this.selectedPojoToBeEdited.fields.findIndex(f=>f.name==field.name)
    this.service.editField$.next(true);
    this.service.editField$.subscribe(value=>{
      if(!value) this.selectedPojoToBeEdited.fields[this.service.fieldToBeEditedIndex] = this.service.fieldToBeEdited;

    });
  }
  
  deleteField(field){
    this.confirmationService.confirm({
      message: "Are you sure you want to delete Field " + field.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const index = this.selected.fields.indexOf(field);
        this.selected.fields.splice(index, 1);
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Field "+field.name+" deleted successfully!",
          life: 3000,
        });
      },
    });
    
  }

  changeIdOfOtherItems(fieldToExclude) {
    let array = this.selected.fields.filter(
      (field) => field.name != fieldToExclude.name
    );
    array.forEach((element) => {
      element.id = false;
    });
  }
  deleteFromFieldsArray(field) {
    const index = this.selected.fields.indexOf(field);
    this.selected.fields.splice(index, 1);
  }
  findFieldByName(fieldLookingFor) {
    const indexOfUpdated = this.selected.fields.findIndex(
      (field) => field.name === fieldLookingFor.name
    );
    return indexOfUpdated;
  }
  ngOnInit(): void {
    this.statuses = [
      { label: "Choississez un type", value: "" },
      { label: "ID", value: "ID" },
      { label: "REF", value: "REF" },
    ];
    // this.initCol();
  }
  changeType(field: any) {
    field.id = false;
  }

  export() {
    const ymlText = YAML.stringify(this.items);
  }
  public showAttributes() {}
  public navigate() {
      this.service.fillojoPermitions();

    //  this.router.navigateByUrl('view/pojo/generate');

    this.router.navigateByUrl("view/role/show");
  }


  public delete(selected: Pojo) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: "Are you sure you want to delete Pojo " + selected.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.items = this.items.filter((val) => val.id !== this.selected.id);
        this.selected = new Pojo();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Pojo "+selected.name+" deleted successfully!",
          life: 3000,
        });
      },
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected Pojos?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.service.deleteMultipleIndexById();
        this.selectes = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Selected Pojos deleted successfully!",
          life: 3000,
        });
      },
    });
  }

 public prepareItems(items: Pojo[]){
    const results: {} = {};
    items.forEach(item =>{
      const fields = {};
      item.fields.forEach(field => {
        fields[`${field.name}`] = `${field.type.simpleName}`;
        //fields.push(this.prepareField(field));
      })
      results[`${item.name}`] = fields;
    })

   return results;

 }

 public prepareField(field: Field){
    let result: {} = {};
    result[`${field.name}`] = field.type.simpleName;
    return result;
 }
  public onExport(){
    const items = this.prepareItems(this.items)
    const ymlText = YAML.stringify(items);
     const string : String = new String(ymlText)
    ymlText.replace("/-/g","")
    var myFile = new File([ymlText], "demo.yaml", {type: "text/yaml;charset=utf-8"});
    saveAs(myFile);
  }
  public details(selected:Pojo){
    this.service.selectedPojoToBeEdited = selected;
    this.appear = true;
    this.selected = selected;
  }
  public openCreate() {
    this.selected = new Pojo();
    this.submitted = false;
    this.addDialog = true;
  }

  public edit(pojo: Pojo) {
    this.selected = { ...pojo };
  }
  public view(pojo: Pojo) {
    this.selected = { ...pojo };
    this.viewDialog = true;
  }

  private initCol() {
    this.cols = [{ field: "name", header: "name" }];
    this.colAttributs = [{ field: "name", header: "Attributs" }];
  }
  openAddFieldsToPojoDialog(){
    this.addFieldToExistingPojoDialog = true;
  }
  get pojo(): Pojo {
    return this.service.pojo;
  }
  get pojos(): Pojo[] {
    return this.service.items;
  }
  get selected(): Pojo {
    return this.service.selected;
  }

  set selected(value: Pojo) {
    this.service.selected = value;
  }

  get items(): Array<Pojo> {
    return this.service.items;
  }

  set items(value: Array<Pojo>) {
    this.service.items = value;
  }
    get addDialog(): boolean {
    return this.service.addDialog;
  }

  set addDialog(value: boolean) {
    this.service.addDialog = value;
  }


  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

  get selectes(): Array<Pojo> {
    return this.service.selectes;
  }

  set selectes(value: Array<Pojo>) {
    this.service.selectes = value;
  }
  get addFieldToExistingPojo(): boolean {
    return this.service.addDialog;
    }
set addFieldToExistingPojoDialog(value: boolean) {
    this.service.addFieldToExistingPojoDialog = value;
    }
get selectedPojoToBeEdited(): Pojo {
    return this.service.selectedPojoToBeEdited;
    }
set selectedPojoToBeEdited(value: Pojo) {
    this.service.selectedPojoToBeEdited = value;
    }
}


