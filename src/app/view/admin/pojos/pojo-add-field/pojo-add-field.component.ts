import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Field } from 'src/app/controller/model/field';
import { Pojo } from 'src/app/controller/model/pojo';
import { Type } from 'src/app/controller/model/type';
import { PojoService } from 'src/app/controller/service/pojo.service';

@Component({
  selector: 'pojo-add-field',
  templateUrl: './pojo-add-field.component.html',
  styleUrls: ['./pojo-add-field.component.scss']
})
export class PojoAddFieldComponent implements OnInit {

  constructor(private service:PojoService,private formBuilder: FormBuilder) { }
  private pojoToBeEdited:Pojo;
  form!: FormGroup;  
  fields!: FormArray;  
  pojosNames;
  typesSimple = [{type:"String"},{type:"BigDecimal"},{type:"Double"}]
  categories = [{name:"Simple"},{name:"Complexe"}]
  idOrReferenceValue = [{name:'id'},{name:'ref'}]
ngOnInit(): void {
    this.pojosNames = this.service.items.map(pojo=>{
      return { name: pojo.name } });
      console.log(this.pojosNames)
     this.form = new FormGroup({  
       name:new FormControl([]),
      fields: new FormArray([])  
    });  
    this.addField();
  }
   createItem(): FormGroup {  
    return this.formBuilder.group({  
      name: '',  
      category: '',  
      generic:'',
      simple: '',
      isList:'',
      idOrReference:''
    });  
  }   
   addField(): void {  
    this.fields = this.form.get('fields') as FormArray;  
    this.fields.push(this.createItem());  
  }  
  hideCreateDialog(){
    this.addDialog = false;
                     }
  get addDialog(): boolean {
        return this.service.addDialog;
    }

    set addDialog(value: boolean) {
        this.service.addDialog = value;
    }
     fieldValueByIndex(index) {
      var arrayControl = this.form.get('fields') as FormArray;
      const value = arrayControl.at(index).get('category').value;
        return value == null ? false : arrayControl.at(index).get('category').value.name;

    }
    submit(){
      const result = this.form.value;
      this.pojoToBeEdited= this.service.selectedPojoToBeEdited;
       const fields = this.processFields(result.fields);
      if ( fields instanceof Array )
      this.pojoToBeEdited.fields = this.pojoToBeEdited.fields.concat( fields );
      else
       this.pojoToBeEdited.fields.push( fields );
      
     this.service.addFieldToExistingPojoDialog = false;
      this.form.reset();
    }
    processFields(formFields):Field[]{
        let fields = new Array<Field>();
        formFields.forEach(formField => {
          let field = new Field();
          field.name = formField.name;
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
          if(formField.category.name === 'Simple'){
            field.generic = false;
            field.list = false;
            field.simple = true;
            let type = new Type();
            type.name = formField.simple.type;
            field.id == true? type.simpleName = type.name +' ID' :true;
            field.reference == true? type.simpleName =type.name + ' REF':true;
            field.type = type;
          }
            if(formField.category.name == 'Complexe'){
               field.generic = true;
               if(formField.isList){
                 field.list = true;
               }else{
                  field.list = false;
               }
            }
            fields.push(field);
        });
        return fields;
    }













get addFieldToExistingPojoDialog(): boolean {
    return this.service.addFieldToExistingPojoDialog;
    }
set addFieldToExistingPojoDialog(value: boolean) {
    this.service.addFieldToExistingPojoDialog = value;
    } 
get selectedPojoToBeEdited(): Pojo {
    return this.service.selectedPojoToBeEdited;
    }
set selectedPojoToBeEdited(value: Pojo) {
    this.service.selectedPojoToBeEdited = value;
    }
}
