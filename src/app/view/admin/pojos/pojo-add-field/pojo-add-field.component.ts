import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  pojosNames;
  typesSimple = [{type:"Long"},{type:"String"},{type:"Date"},{type:"BigDecimal"},{type:"Double"}];
  categories = [{name:"Simple"},{name:"Complexe"}];
  idOrReferenceValue = [{name:'id'},{name:'ref'}];
  form = new FormGroup({  
    name:new FormControl("",[Validators.required]),
    category:new FormControl("",[Validators.required]),
    generic:new FormControl("",[]),
    simple:new FormControl("",[]),
    isList:new FormControl("",[]),
    idOrReference:new FormControl("",[]),
 });  
 
ngOnInit(): void {
    this.pojosNames = this.service.items.map(pojo=>{
      return { name: pojo.name } });
  }
  //  createItem(): FormGroup {  
  //   return this.formBuilder.group({  
  //     name: '',  
  //     category: '',  
  //     generic:'',
  //     simple: '',
  //     isList:'',
  //     idOrReference:''
  //   });  
  // }   
  //  addField(): void {  
  //   this.fields = this.form.get('fields') as FormArray;  
  //   this.fields.push(this.createItem());  
  // }  
//   hideCreateDialog(){
//     this.addDialog = false;
//  }
 hide(){
  this.form.reset();
  this.service.addFieldToExistingPojoDialog = false;
 }
  // get addDialog(): boolean {
  //       return this.service.addDialog;
  //   }

  //   set addDialog(value: boolean) {
  //       this.service.addDialog = value;
  //   }

    fieldValueByIndex() {
      const value = this.form.get('category').value;
      return value == null ? false : value.name;
    }
    submit(){
      const result = this.form.value;
      this.pojoToBeEdited= this.service.selectedPojoToBeEdited;
      const field = this.processFields(result);
       this.pojoToBeEdited.fields.push( field );
      
      this.service.addFieldToExistingPojoDialog = false;
      this.form.reset();
    }
    processFields(formField):Field{
         let field = new Field();
          field.name = formField.name;
          if(formField.idOrReference != null){
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
               type.simpleName = formField.generic.name; 
               field.id == true? type.name = type.simpleName +' ID' :true;
               field.reference == true? type.name =type.simpleName + ' REF':true;
               field.type = type;

               if(formField.isList){
                 field.list = true;
               }else{
                  field.list = false;
               }
            }
        return field;
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
