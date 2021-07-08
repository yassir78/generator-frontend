import {
  Injectable
} from '@angular/core';
import {
  Technology
} from '../model/technology';
import {
  TechnologyService
} from './technology.service';
import {CATEGORY} from '../model/category';
import {UserConfig} from '../model/userConfig';

@Injectable({
  providedIn: 'root'
})

export class UserConfigService {
  private _frontendTechnologies: Array<Technology>;
  private _backendTechnologies: Array<Technology>;
  private _frontendSeletedTechnology: Technology;
  private _backendSeletedTechnology: Technology;
  private _userConfig: UserConfig;
  private _showBackendTemplates: boolean;
  private _showFrontTemplates: boolean;


  get showFrontTemplates(): boolean {
    return this._showFrontTemplates;
  }

  set showFrontTemplates(value: boolean) {
    this._showFrontTemplates = value;
  }

  get showBackendTemplates(): boolean {
    return this._showBackendTemplates;
  }

  set showBackendTemplates(value: boolean) {
    this._showBackendTemplates = value;
  }

  constructor(private TechnologyService: TechnologyService) {
    this.TechnologyService.getTechnologyByCategory(CATEGORY.BACKEND).subscribe(data => {
      this.backendTechnologies = data;
      this.backendSelectedTechnology = this.backendTechnologies[0];
      this.userConfig.backend = this.backendSelectedTechnology.defaultTemplate;

    });
    this.TechnologyService.getTechnologyByCategory(CATEGORY.FRONTEND).subscribe(data => {
      this.frontendTechnologies = data;
      this.frontendSelectedTechnology = this.frontendTechnologies[0];
      this.userConfig.frontend = this.frontendSelectedTechnology.defaultTemplate;
    });
  }


  get userConfig(): UserConfig {
    if (this._userConfig == null)
      this._userConfig = new UserConfig();
    return this._userConfig;
  }

  set userConfig(config: UserConfig) {
    this._userConfig = config;
  }

  get frontendTechnologies(): Array<Technology> {
    if (this._frontendTechnologies == null)
      this._frontendTechnologies == new Array<Technology>();
    return this._frontendTechnologies;
  }

  set frontendTechnologies(technologies: Array<Technology>) {
    this._frontendTechnologies = technologies;
  }

  get backendTechnologies(): Array<Technology> {
    if (this._backendTechnologies == null)
      this._backendTechnologies == new Array<Technology>();
    return this._backendTechnologies;
  }

  set backendTechnologies(technologies: Array<Technology>) {
    this._backendTechnologies = technologies;
  }

  get frontendSelectedTechnology(): Technology {
    if (this._frontendSeletedTechnology == null)
      this._frontendSeletedTechnology = new Technology();
    return this._frontendSeletedTechnology;
  }

  set frontendSelectedTechnology(technology: Technology) {
    this._frontendSeletedTechnology = technology;
  }

  get backendSelectedTechnology(): Technology {
    if (this._backendSeletedTechnology == null)
      this._backendSeletedTechnology = new Technology();
    return this._backendSeletedTechnology;
  }

  set backendSelectedTechnology(technology: Technology) {
    this._backendSeletedTechnology = technology;
  }

  setTechnologiestoGenerate() {
    this.userConfig.backend.technologie = new Technology();
    this.userConfig.backend.technologie.name = this.backendSelectedTechnology.name;
    this.userConfig.frontend.technologie = new Technology();
    this.userConfig.frontend.technologie.name = this.frontendSelectedTechnology.name;
    this.userConfig.frontend.technologie.category = CATEGORY.FRONTEND;
  }

}
