import {Component, OnInit} from '@angular/core';
import {Commande} from '../../../../controller/model/commande.model';
import {CommandeService} from '../../../../controller/service/commande.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-commande-create',
    templateUrl: './commande-create.component.html',
    styleUrls: ['./commande-create.component.scss']
})
export class CommandeCreateComponent implements OnInit {

    constructor(private messageService: MessageService, private service: CommandeService) {
    }

    ngOnInit(): void {
    }

    public hideCreateDialog() {
        this.createDialog = false;
        this.submitted = false;
    }
    public save() {
        this.submitted = true;
        if (this.selected.reference.trim()) {
            this.service.save().subscribe(data => {
                this.items.push({...data});
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Commande Created',
                    life: 3000
                });
            });
            this.createDialog = false;
            this.selected = new Commande();
        }
    }
    get selected(): Commande {
        return this.service.selected;
    }

    set selected(value: Commande) {
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

    get items(): Array<Commande> {
        return this.service.items;
    }

    set items(value: Array<Commande>) {
        this.service.items = value;
    }

}
