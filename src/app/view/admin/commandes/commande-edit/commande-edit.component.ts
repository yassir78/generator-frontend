import {Component, OnInit} from '@angular/core';
import {Commande} from '../../../../controller/model/commande.model';
import {MessageService} from 'primeng/api';
import {CommandeService} from '../../../../controller/service/commande.service';

@Component({
    selector: 'app-commande-edit',
    templateUrl: './commande-edit.component.html',
    styleUrls: ['./commande-edit.component.scss']
})
export class CommandeEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: CommandeService) {
    }

    ngOnInit(): void {
    }

    public edit() {
        this.submitted = true;
        if (this.selected.reference.trim()) {
            if (this.selected.id) {
                this.items[this.service.findIndexById(this.selected.id)] = this.selected;
                this.service.edit().subscribe(data => {
                    this.selected = data;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Commande Updated',
                        life: 3000
                    });
                });
            }
            this.editDialog = false;
            this.selected = new Commande();
        }
    }

  public hideEditDialog() {
    this.editDialog = false;
  }
    get selected(): Commande {
        return this.service.selected;
    }

    set selected(value: Commande) {
        this.service.selected = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get items(): Array<Commande> {
        return this.service.items;
    }

    set items(value: Array<Commande>) {
        this.service.items = value;
    }


}
