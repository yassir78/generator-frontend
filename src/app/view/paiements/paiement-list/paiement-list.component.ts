import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {PaiementService} from "../../../controller/service/paiement.service";
import {Paiement} from "../../../controller/model/paiement.model";


@Component({
  selector: 'app-paiement-list',
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.scss']
})
export class PaiementListComponent implements OnInit {
  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: PaiementService) {
  }

  ngOnInit(): void {
    this.initCol();
    this.service.findAll().subscribe(data => this.items = data);
  }

  public delete(selected: Paiement) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + selected.ref + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteByReference().subscribe(data => {
          this.items.splice(this.service.findIndexById(this.selected.id), 1);
          this.selected = new Paiement();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Paiement Deleted',
            life: 3000
          });
        });
      }
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected commandes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteMultipleByReference().subscribe(data =>{
          this.service.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Paiements Deleted',
            life: 3000
          });
        });
      }
    });
  }
  public openCreate() {
    this.createDialog = true;
  }

  public edit(commande: Paiement) {
    this.selected = {...commande};
    this.editDialog = true;
  }
  public view(commande: Paiement) {
    this.selected = {...commande};
    this.viewDialog = true;
  }

  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'ref', header: 'Reference'},
      {field: 'montant', header: 'Montant'}
      ];
  }

  get selected(): Paiement {
    return this.service.selected;
  }

  set selected(value: Paiement) {
    this.service.selected = value;
  }

  get items(): Array<Paiement> {
    return this.service.items;
  }

  set items(value: Array<Paiement>) {
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

  get selectes(): Array<Paiement> {
    return this.service.selectes;
  }

  set selectes(value: Array<Paiement>) {
    this.service.selectes = value;
  }

}
