import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {CommandeService} from '../../../../controller/service/commande.service';
import {Commande} from '../../../../controller/model/commande.model';

@Component({
  selector: 'app-commande-view',
  templateUrl: './commande-view.component.html',
  styleUrls: ['./commande-view.component.scss']
})
export class CommandeViewComponent implements OnInit {


  constructor(private messageService: MessageService, private service: CommandeService) {
  }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): Commande {
    return this.service.selected;
  }

  set selected(value: Commande) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

}
