import { Component, OnInit } from "@angular/core";
import { PojoService } from "../../../../controller/service/pojo.service";
import { Router } from "@angular/router";
import { RequestVo } from "../../../../controller/model/request-vo.model";
import { CodeModel } from "@ngstack/code-editor";

@Component({
  selector: "app-pojo-import",
  templateUrl: "./pojo-import.component.html",
  styleUrls: ["./pojo-import.component.scss"],
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
  constructor(private pojoSerice: PojoService, private router: Router) {}

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
        console.log(data);
        /* for (let i = 0; i < data.length; i++) {
          let pojo = data[i];
          console.log(
            "Pojo{" +
              "name='" +
              pojo.name +
              "'" +
              ", fieldsSimple=" +
              pojo.fieldsSimple +
              "\n" +
              ", fieldsGeneric=" +
              pojo.fieldsGeneric +
              "\n" +
              ", fieldsList=" +
              pojo.fieldsList +
              "\n" +
              "}"
          );
        } */
        this.router.navigateByUrl("view/pojo/show");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
