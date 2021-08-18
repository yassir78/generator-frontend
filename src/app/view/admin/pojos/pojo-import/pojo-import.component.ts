import { MenuItem } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { PojoService } from "../../../../controller/service/pojo.service";
import { Router } from "@angular/router";
import { RequestVo } from "../../../../controller/model/request-vo.model";
import { CodeModel } from "@ngstack/code-editor";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { FileLoadComponent } from "./file-load/file-load.component";

@Component({
  selector: "app-pojo-import",
  templateUrl: "./pojo-import.component.html",
  styleUrls: ["./pojo-import.component.scss"],
  providers: [DialogService],
})
export class PojoImportComponent implements OnInit {
  theme = "vs-dark";
  selectedCities: string[] = [];
  cities: any[];
  stateOptions: any[];
  codeModel: CodeModel = {
    language: "yaml",
    uri: "main.yaml",
    value:
      this.requestVo.yamlText === undefined
        ? "#entrer vos beans"
        : this.requestVo.yamlText,
  };
  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  items: MenuItem[];
  constructor(
    private pojoSerice: PojoService,
    private router: Router,
    public dialogService: DialogService
  ) {}

  get requestVo(): RequestVo {
    return this.pojoSerice.requestVo;
  }
  onCodeChanged(value: string) {
    this.requestVo.yamlText = value;
  }
  public importYaml() {
    this.pojoSerice.importYaml().subscribe(
      (data) => {
        this.pojoSerice.items = data;
        this.router.navigateByUrl("view/pojo/show");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public importJavaFiles() {
    //TODO
  }
  toCreatePage() {
    this.router.navigate(["/create"]);
  }
  public importYamlFile() {
    const ref = this.dialogService.open(FileLoadComponent, {
      header: "Choose a YAML file",
      width: "50%",
    });
    ref.onClose.subscribe((text) => {
      if (text) {
        this.codeModel = {
          ...this.codeModel,
          value: text,
        };
        // this.codeModel.value = text;
        // this.requestVo.yamlText = text;
        // console.log(this.codeModel.value)
      }
    });
  }

  ngOnInit(): void {
    this.items = [
      {
        label: "Yaml file",
        icon: "pi pi-file",
        command: () => {
          this.importYamlFile();
        },
      },
      {
        label: "Java file (s)",
        icon: "pi pi-folder",
        command: () => {
          this.importJavaFiles();
        },
      },
    ];
  }
}
