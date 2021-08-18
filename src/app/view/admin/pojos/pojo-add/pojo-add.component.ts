import { Component, OnInit } from "@angular/core";
import { PojoService } from "src/app/controller/service/pojo.service";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { Pojo } from "src/app/controller/model/pojo";
import { Field } from "src/app/controller/model/field";
import { Type } from "src/app/controller/model/type";
import { SplitterModule } from "primeng/splitter";
@Component({
  selector: "pojo-add",
  templateUrl: "./pojo-add.component.html",
  styleUrls: ["./pojo-add.component.scss"],
})
export class PojoAddComponent implements OnInit {
  fieldsArray: Field[] = [];
  display: boolean = false;
  title = "formarray";
  pojosNames;
  typesSimple = [
    { type: "Long" },
    { type: "String" },
    { type: "Date" },
    { type: "BigDecimal" },
    { type: "Double" },
  ];
  categories = [{ name: "Simple" }, { name: "Complexe" }];
  idOrReferenceValue = [{ name: "id" }, { name: "ref" }];
  constructor(private service: PojoService, private formBuilder: FormBuilder) {}
  form = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("/^[A-Z].*"),
    ]),
  });

  formField = new FormGroup({
    name: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    generic: new FormControl("", []),
    simple: new FormControl("", []),
    isList: new FormControl("", []),
    idOrReference: new FormControl("", []),
  });

  ngOnInit(): void {
    //la liste des pojos
    this.pojosNames = this.service.items.map((pojo) => {
      return { name: pojo.name };
    });
  }

  addField(): void {
    const field = this.formField.value;
    const fieldProcessed = this.processFields(field);
    this.fieldsArray.push(fieldProcessed);
    this.resetFieldForm();
  }

  deleteField(field) {
    const index = this.fieldsArray.indexOf(field);
    this.fieldsArray.splice(index, 1);
  }

  resetFieldForm() {
    this.formField.reset();

    this.formField = new FormGroup({
      name: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      generic: new FormControl("", []),
      simple: new FormControl("", []),
      isList: new FormControl("", []),
      idOrReference: new FormControl("", []),
    });
  }

  hide() {
    this.form.reset();
    this.resetFieldForm();
    this.service.addDialog = false;
    this.fieldsArray = [];
  }

  get addDialog(): boolean {
    return this.service.addDialog;
  }

  set addDialog(value: boolean) {
    this.service.addDialog = value;
  }
  fieldValueByIndex() {
    const value = this.formField.get("category").value;
    return value == null ? false : value.name;
  }

  submit() {
    const result = this.form.value;
    let pojo = new Pojo();
    pojo.name =
      result.name.substring(0, 1).toUpperCase() + result.name.substring(1);
    this.processPojo(pojo, this.fieldsArray);
    this.service.items.push(pojo);
    this.form.reset();
    this.resetFieldForm();
    this.fieldsArray = [];
    this.service.addDialog = false;
  }
  processPojo(pojo: Pojo, fields: Field[]) {
    pojo.fields = fields;
    fields.forEach((field) => {
      field.id ? (pojo.id = field) : false;
      field.reference ? (pojo.reference = field) : false;
      field.list ? (pojo.hasList = true) : false;
    });
  }
  processFields(formField): Field {
    let field = new Field();
    field.name = formField.name;

    if (formField.idOrReference.name != null) {
      if (formField.idOrReference.name === "id") {
        field.id = true;
        field.reference = false;
      } else if (formField.idOrReference.name === "ref") {
        field.id = false;
        field.reference = true;
      } else {
        field.id = false;
        field.reference = false;
      }
    }

    if (formField.category.name === "Simple") {
      field.generic = false;
      field.list = false;
      field.simple = true;
      let type = new Type();
      type.simpleName = formField.simple.type;
      field.id == true ? (type.name = type.simpleName + " ID") : true;
      field.reference == true ? (type.name = type.simpleName + " REF") : true;
      field.type = type;
    }
    if (formField.category.name == "Complexe") {
      field.generic = true;
      field.simple = false;

      let type = new Type();
      type.simpleName = formField.generic.name;
      field.id == true ? (type.name = type.simpleName + " ID") : true;
      field.reference == true ? (type.name = type.simpleName + " REF") : true;

      field.type = type;
      if (formField.isList) {
        field.list = true;
      } else {
        field.list = false;
      }
    }
    return field;
  }
}
