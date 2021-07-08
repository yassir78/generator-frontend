import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Commande} from '../../../../controller/model/commande.model';
import {CommandeService} from '../../../../controller/service/commande.service';

// import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-commande-list',
    templateUrl: './commande-list.component.html',
    styleUrls: ['./commande-list.component.scss']
   // providers: [MessageService, ConfirmationService]
})
export class CommandeListComponent implements OnInit {
    cols: any[];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private service: CommandeService) {
    }

    ngOnInit(): void {
        this.initCol();
        this.service.findAll().subscribe(data => this.items = data);
    }

    public delete(selected: Commande) {
        this.selected = selected;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + selected.reference + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteByReference().subscribe(data => {
                    this.items.splice(this.service.findIndexById(this.selected.id), 1);
                    this.selected = new Commande();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Commande Deleted',
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
                        detail: 'Commandes Deleted',
                        life: 3000
                    });
                });
            }
        });
    }
    public openCreate() {
        this.selected = new Commande();
        this.submitted = false;
        this.createDialog = true;
    }

    public edit(commande: Commande) {
        this.selected = {...commande};
        this.editDialog = true;
    }
    public view(commande: Commande) {
        this.selected = {...commande};
        this.viewDialog = true;
    }

    private initCol() {
        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'reference', header: 'Reference'},
            {field: 'total', header: 'Total'},
            {field: 'totalPaye', header: 'Total Paye'}
        ];
    }

    get selected(): Commande {
        return this.service.selected;
    }

    set selected(value: Commande) {
        this.service.selected = value;
    }

    get items(): Array<Commande> {
        return this.service.items;
    }

    set items(value: Array<Commande>) {
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

    get selectes(): Array<Commande> {
        return this.service.selectes;
    }

    set selectes(value: Array<Commande>) {
        this.service.selectes = value;
    }

}
