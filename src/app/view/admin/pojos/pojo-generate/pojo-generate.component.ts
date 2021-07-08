import {Component, OnInit} from '@angular/core';
import {UserConfigService} from "../../../../controller/service/userConfigService";
import {Technology} from "../../../../controller/model/technology";
import {UserConfig} from "../../../../controller/model/userConfig";
import {ProjectTemplate} from "../../../../controller/model/projectTemplate";
import {GeneratedProject} from "../../../../controller/model/generated-project";
import {HttpClient} from "@angular/common/http";
import {PojoService} from "../../../../controller/service/pojo.service";
import {FileConfigService} from "../../../../controller/service/file-config.service";
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-pojo-generate',
    templateUrl: './pojo-generate.component.html',
    styleUrls: ['./pojo-generate.component.scss']
})
export class PojoGenerateComponent implements OnInit {

    showBackendTemplates: boolean = false;
    showFrontendTemplates: boolean = false;
    private url:string =  "http://localhost:8036/generator/";
    private _project : GeneratedProject ;


    ngOnInit(): void {
    }

    showProjectStructure:boolean;
    constructor(private http :HttpClient,private userConfigService :UserConfigService,private pojoSerive:PojoService,private fileConfigService:FileConfigService) {

    }

    public generateProject(){
        this.userConfigService.setTechnologiestoGenerate();
        this.userConfigService.userConfig.pojos = this.pojoSerive.items;
        console.log(this.userConfigService.userConfig);
        this.http.post<GeneratedProject>(this.url, this.userConfigService.userConfig).subscribe(response => {
            if(response==null || response.zip==null)
                console.log('erreur lors du generation du projet');
            else{
                this.project = response;
                this.showProjectStructure = true;
            }
        });

    }
    public download(){
        let blob = new Blob([new Uint8Array(this.project.zip)], {type: "octet/stream"});
        saveAs(blob, this.project.name+ '.zip');
    }


    get project():GeneratedProject{
        if(this._project==null)
            this._project = new GeneratedProject();
        return this._project;
    }
    set project(value:GeneratedProject){
        this._project = value;
    }


    showTemplatesOfSelectedBackendTechnologie() {
        this.showBackendTemplates = true;
    }

    get backendSelectedTechnology(): Technology {
        return this.userConfigService.backendSelectedTechnology;
    }

    get frontendTechnologies(): Array<Technology> {

        return this.userConfigService.frontendTechnologies;
    }

    get backendTechnologies(): Array<Technology> {
        return this.userConfigService.backendTechnologies;
    }

    get frontendSelectedTechnology(): Technology {
        return this.userConfigService.frontendSelectedTechnology;
    }

    set frontendSelectedTechnology(technology: Technology) {
        this.userConfigService.frontendSelectedTechnology = technology;
    }

    get backendSeletedTechnology(): Technology {
        return this.userConfigService.backendSelectedTechnology;
    }

    set backendSelectedTechnology(technology: Technology) {
        this.userConfigService.backendSelectedTechnology = technology;
    }

    get userConfig(): UserConfig {
        return this.userConfigService.userConfig;
    }

    set userConfig(config: UserConfig) {
        this.userConfigService.userConfig = config;
    }

    changeSelectedBackendTechnology() {
        this.userConfig.backend = this.backendSelectedTechnology.defaultTemplate;
    }

    changeSelectedFrontendTechnology() {
        this.userConfig.frontend = this.frontendSelectedTechnology.defaultTemplate;
    }

    selectBackendTemplate(template: ProjectTemplate) {
        this.userConfig.backend = template;
        this.showBackendTemplates = false;
    }

    selectFrontendTemplate(template: ProjectTemplate) {
        this.userConfig.frontend = template;
        this.showFrontendTemplates = false;
    }

    showTemplatesOfSelectedFrontendTechnologie() {
        this.showFrontendTemplates = true;
    }

}
