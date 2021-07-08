import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {PaiementService} from "../../../controller/service/paiement.service";
import {Paiement} from "../../../controller/model/paiement.model";

@Component({
  selector: 'app-paiement-create',
  templateUrl: './paiement-create.component.html',
  styleUrls: ['./paiement-create.component.scss']
})
export class PaiementCreateComponent implements OnInit {

  constructor(private messageService: MessageService, private service: PaiementService) {
  }

  ngOnInit(): void {
  }

  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }
  public save() {
    this.submitted = true;
    if (this.selected.ref.trim()) {
      this.service.save().subscribe(data => {
        this.items.push({...data});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Paiement Created',
          life: 3000
        });
      });
      this.createDialog = false;
      this.selected = new Paiement();
    }
  }
  get selected(): Paiement {
    return this.service.selected;
  }

  set selected(value: Paiement) {
    this.service.selected = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get items(): Array<Paiement> {
    return this.service.items;
  }

  set items(value: Array<Paiement>) {
    this.service.items = value;
  }

}
