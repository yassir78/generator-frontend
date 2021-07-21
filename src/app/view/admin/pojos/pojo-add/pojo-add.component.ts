import { Component, OnInit } from '@angular/core';
import { PojoService } from 'src/app/controller/service/pojo.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';  
import { Pojo } from 'src/app/controller/model/pojo';
import { Field } from 'src/app/controller/model/field';
import { Type } from 'src/app/controller/model/type';
import {SplitterModule} from 'primeng/splitter';
@Component({
  selector: 'pojo-add',
  templateUrl: './pojo-add.component.html',
  styleUrls: ['./pojo-add.component.scss']
})
export class PojoAddComponent implements OnInit {
  fieldsArray:Field[] = [];
  display: boolean = false;
  title = 'formarray';  
  pojosNames;
  typesSimple = [{type:"String"},{type:"BigDecimal"},{type:"Double"}]
  categories = [{name:"Simple"},{name:"Complexe"}]
  idOrReferenceValue = [{name:'id'},{name:'ref'}]
  form!: FormGroup;  
  formField!: FormGroup;  
  constructor(private service:PojoService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //la liste des pojos
    this.pojosNames = this.service.items.map(pojo=>{
      return { name: pojo.name } });
      //console.log(this.pojosNames)
     this.form = new FormGroup({ 
      name:new FormControl("",[Validators.required]),
    });  

     this.formField = new FormGroup({ 
      name: new FormControl([]),  
      category:new FormControl([]),  
      generic:new FormControl([]),
      simple: new FormControl([]),
      isList: new FormControl([]),
      idOrReference:new FormControl([""]),

    });  
  }

   addField(): void {  
    const field = this.formField.value;
    const fieldProcessed = this.processFields(field);
    console.log("added field: ",fieldProcessed);
    this.fieldsArray.push(fieldProcessed);
    this.formField.reset();
    
    this.formField = new FormGroup({ 
      name: new FormControl([]),  
      category:new FormControl([]),  
      generic:new FormControl([]),
      simple: new FormControl([]),
      isList: new FormControl([]),
      idOrReference:new FormControl([""]),

    });  
  } 
  
  deleteField(field){
    const index = this.fieldsArray.indexOf(field);
    this.fieldsArray.splice(index, 1);
  }
  
  hide(){
    this.service.addDialog = false;
    this.form.reset();
    this.formField.reset();
    this.formField = new FormGroup({ 
      name: new FormControl([]),  
      category:new FormControl([]),  
      generic:new FormControl([]),
      simple: new FormControl([]),
      isList: new FormControl([]),
      idOrReference:new FormControl([""]),

    });  
   }

  get addDialog(): boolean {
        return this.service.addDialog;
  }

  set addDialog(value: boolean) {
        this.service.addDialog = value;
  }
     fieldValueByIndex() {

      const value = this.formField.get('category').value;
        return value == null ? false : value.name;

    }
    submit(){
      const result = this.form.value;
       let pojo = new Pojo();
      pojo.name = result.name;
      this.processPojo(pojo,this.fieldsArray);
      this.service.items.push(pojo);
      this.service.addDialog = false;
      this.form.reset();
      this.formField.reset();
      this.fieldsArray = [];
    }
    processPojo(pojo:Pojo,fields:Field[]){
      pojo.fields = fields;
       fields.forEach(field=>{
         field.id ?  pojo.id = field : false;
         field.reference ? pojo.reference = field : false;
         field.list ?  pojo.hasList = true:false
       })
    }
    processFields(formField):Field{
        let field = new Field;
          field.name = formField.name;

          if(this.idOrReferenceValue != null){
            if(formField.idOrReference.name === 'id'){
            field.id = true;
            field.reference = false;
          }else if(formField.idOrReference.name === 'ref'){
            field.id = false;
            field.reference = true;
          }else{
            field.id = false;
            field.reference = false;
          }
          }

          if(formField.category.name === 'Simple'){
            field.generic = false;
            field.list = false;
            field.simple = true;
            let type = new Type();
            type.simpleName = formField.simple.type;
            field.id == true? type.name = type.simpleName +' ID' :true;
            field.reference == true? type.name =type.simpleName + ' REF':true;
            field.type = type;
          }
            if(formField.category.name == 'Complexe'){
               field.generic = true;
               field.simple = false;

               let type = new Type();
               type.name = formField.generic.name;
               type.simpleName = formField.generic.name;

               field.type = type;
               if(formField.isList){
                 field.list = true;
               }else{
                  field.list = false;
               }
            }
        return field;
    }


}
