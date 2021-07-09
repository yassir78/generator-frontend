import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {PojoService} from '../../../../controller/service/pojo.service';
import {Pojo} from '../../../../controller/model/pojo';
import {UserConfig} from "../../../../controller/model/userConfig";
import {Router} from "@angular/router";
var YAML = require('json2yaml');
import { saveAs } from 'file-saver';
import {Field} from "../../../../controller/model/field";


@Component({
  selector: 'app-pojo-list',
  templateUrl: './pojo-list.component.html',
  styleUrls: ['./pojo-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PojoListComponent implements OnInit {
  appear : boolean = false;
  cols: any[];
  colAttributs:any[];
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: PojoService, private router: Router) {
  }

  ngOnInit(): void {
    this.initCol();
  }

  public showAttributes(){

  }
  public navigate() {
    this.router.navigateByUrl('view/pojo/generate');
  }

  public delete(selected: Pojo) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + selected.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.items = this.items.filter(val => val.id !== this.selected.id);
          this.selected = new Pojo();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Pojo Deleted',
            life: 3000
          });
      }
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Pojos?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.service.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Commandes Deleted',
            life: 3000
          });
      }
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
    //console.log(items);
    const ymlText = YAML.stringify(items);
     console.log(ymlText);
     const string : String = new String(ymlText)
    ymlText.replace("/-/g","")
    console.log("ymlText");
    console.log(string);
    var myFile = new File([ymlText], "demo.yaml", {type: "text/yaml;charset=utf-8"});
    saveAs(myFile);
  }


  public openCreate() {
    this.selected = new Pojo();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(pojo: Pojo) {
    this.selected = {...pojo};
    this.editDialog = true;
  }
  public view(pojo: Pojo) {
    this.selected = {...pojo};
    this.viewDialog = true;
  }

  private initCol() {
    this.cols = [
      {field: 'name', header: 'name'},

    ];
    this.colAttributs = [
      {field: 'name', header: 'Attributs'},

    ];
  }


  get pojo(): Pojo {
    return this.service.pojo;
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


}
