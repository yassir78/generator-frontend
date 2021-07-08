import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserConfigService } from './userConfigService';
import { saveAs } from 'file-saver'
import { PojoService } from './pojo.service';
import { GeneratedProject } from '../model/generated-project';
import { FileConfigService } from './file-config.service';

@Injectable({
    providedIn: 'root'
  })

export class GeneratorService{
      private url:string =  "http://localhost:8036/generator/";
      private _project : GeneratedProject ;
     
       showProjectStructure:boolean;
      constructor(private http :HttpClient,private userConfigService :UserConfigService,private pojoSerive:PojoService,private fileConfigService:FileConfigService) { 
        
    }
    public generateProject(){
        this.userConfigService.setTechnologiestoGenerate();
        this.userConfigService.userConfig.pojos = this.pojoSerive.pojos;
        console.log(this.userConfigService.userConfig);
     
      this.http.post<GeneratedProject>(this.url, this.userConfigService.userConfig).subscribe(response => {
        if(response==null || response.zip==null)
           console.log("errora");
        else{
          this.project = response;
          this.showProjectStructure = true;
          
        }
        });
        
      }
  get project():GeneratedProject{
    if(this._project==null)
      this._project = new GeneratedProject();
    return this._project;
  }
  set project(value:GeneratedProject){
    this._project = value;
  }
   public download(){
    let blob = new Blob([new Uint8Array(this.project.zip)], {type: "octet/stream"});
    saveAs(blob, this.project.name+ '.zip');
    }
    generateFiles() {
      this.fileConfigService.fileConfig.pojos = this.pojoSerive.pojos;
      console.log(this.fileConfigService.fileConfig);
       this.http.post<GeneratedProject>(this.url+"/files", this.fileConfigService.fileConfig).subscribe(response => {
        if(response==null || response.zip==null)
           console.log("errora");
        else{
          this.project = response;
          this.showProjectStructure = true;
          
        }
        });
        
    }
       
}