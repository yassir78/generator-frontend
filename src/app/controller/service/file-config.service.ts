import { Injectable } from '@angular/core';
import { FileConfig } from '../model/file-config';
@Injectable({
    providedIn: 'root'
  })

  export class FileConfigService{

      private _fileConfig:FileConfig;
      
      get fileConfig():FileConfig{
          if(this._fileConfig ==null)
             this._fileConfig = new FileConfig();
          return this._fileConfig
      }
      set fileConfig(value:FileConfig){
          this._fileConfig = value;
      }
  }