import { Component, OnInit } from '@angular/core';
import { PojoService } from 'src/app/controller/service/pojo.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';  
import { Pojo } from 'src/app/controller/model/pojo';
import { Field } from 'src/app/controller/model/field';
import { Type } from 'src/app/controller/model/type';
@Component({
  selector: 'pojo-add',
  templateUrl: './pojo-add.component.html',
  styleUrls: ['./pojo-add.component.scss']
})
export class PojoAddComponent implements OnInit {
  display: boolean = false;
  title = 'formarray';  
  pojosNames;
  typesSimple = [{type:"String"},{type:"BigDecimal"},{type:"Double"}]
  categories = [{name:"Simple"},{name:"Complexe"}]
  idOrReferenceValue = [{name:'id'},{name:'ref'}]
  form!: FormGroup;  
  fields!: FormArray;  
  constructor(private service:PojoService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pojosNames = this.service.items.map(pojo=>{
      return { name: pojo.name } });
      console.log(this.pojosNames)
     this.form = new FormGroup({  
       name:new FormControl([]),
      fields: new FormArray([])  
    });  
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
        return  arrayControl.at(index).get('category').value.name;

    }
    submit(){
      const result = this.form.value;
       let pojo = new Pojo();
      pojo.name = result.name;
      //console.log(result.fields)
      const fields = this.processFields(result.fields);
      this.processPojo(pojo,fields);
      this.service.items.push(pojo);
      this.service.addDialog = false;

    }
    processPojo(pojo:Pojo,fields:Field[]){
      pojo.fields = fields;
       fields.forEach(field=>{
         field.id ?  pojo.id = field : false;
         field.reference ? pojo.reference = field : false;
         field.list ?  pojo.hasList = true:false
       })
    }
    processFields(formFields):Field[]{
        let fields = new Array<Field>();
        formFields.forEach(formField => {
          console.log(formField)
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


}
