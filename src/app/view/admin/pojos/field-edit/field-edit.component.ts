import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { Field } from 'src/app/controller/model/field';
import { PojoService } from 'src/app/controller/service/pojo.service';

@Component({
  selector: 'field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.scss']
})
export class FieldEditComponent implements OnInit {
  field: Field = new Field();
  pojosNames;
  typesSimple = [{type:"Long"},{type:"String"},{type:"Date"},{type:"BigDecimal"},{type:"Double"}]
  categories = [{name:"Simple"},{name:"Complexe"}]
  idOrReferenceValue = [{name:'id'},{name:'ref'}]
  editField$:Observable<boolean> = this.service.editField$.asObservable();

  constructor(private service:PojoService,private formBuilder:FormBuilder) { }
  form = new FormGroup({  
    name:new FormControl("",[]),  
    category:new FormControl([]),  
    simple:new FormControl([]),  
    generic:new FormControl([]),  
    isList:new FormControl(false,[]),  
    idOrReference:new FormControl("",[]),  
  });  

  ngOnInit(): void {
     this.pojosNames = this.service.items.map(pojo=>{
      return { name: pojo.name } });
     
  
    this.editField$.subscribe(value=>{
      if(value){
        if(this.fieldToBeEdited){
          this.field = {...this.fieldToBeEdited, type:{...this.fieldToBeEdited.type}};
          this.form.setValue({
            name: this.field.name,
            category: this.field.simple?'Simple':'Complexe',
            isList: this.field.list,
            simple:this.field.type.simpleName,
            generic:this.field.type.simpleName,
            idOrReference:this.field.id?'id':this.field.reference?'ref':'idOrRef',
          })
          this.valuesChanged();
        }
        
      }
    })
    
  }
    valuesChanged(): FormGroup { 
      this.form.valueChanges.subscribe(value=>{
        const name = value.name == null? null:value.name;
        const simpleOrComplexe = value.category == null ? null : value.category.name;
        const genericName = value.generic == null ?null:value.generic.name;
        const simpleName =value.simple == null ? null :value.simple.type;
        const idOrRef  = value.idOrReference == null ? null : value.idOrReference.name;
        const isList = value.isList;
        
        name?this.field.name = name:false;

        if(idOrRef){
          if(idOrRef == 'ref'){
            this.field.id = false;
            this.field.reference = true;
            this.field.type.name = this.field.type.simpleName+ " REF";
          }else{
            this.field.id = true;
            this.field.reference = false;
            this.field.type.name = this.field.type.simpleName+ " ID";
          }
        }
        if(simpleName){
          this.field.type.simpleName = simpleName;
          if(!this.field.id && !this.field.reference)
          this.field.type.name = simpleName;
           this.field.id?this.field.type.name = simpleName+' ID ':
           this.field.reference?this.field.type.name = simpleName+' REF ':false;
        }
        if(genericName){
          this.field.type.simpleName=genericName; 
          if(!this.field.id && !this.field.reference)
          this.field.type.name = genericName;
          this.field.id?this.field.type.name = simpleName+' ID ':
          this.field.reference?this.field.type.name = simpleName+' REF ':false;
        }
        if(isList){
          this.field.list = true;
          this.field.simple = false;
        }
        if(simpleOrComplexe == 'Simple'){
           this.field.simple =  true;
           this.field.generic = false;
           this.field.list = false;
           if(simpleName){
            this.field.type.simpleName = simpleName;
            if(!this.field.id && !this.field.reference)
            this.field.type.name = simpleName;
            this.field.id?this.field.type.name = simpleName+' ID ':
            this.field.reference?this.field.type.name = simpleName+' REF ':false;
           }
        }else if(simpleOrComplexe == 'Complexe'){
            this.field.simple =  false;
            this.field.generic = true;
           if(genericName){
            this.field.type.simpleName=genericName; 
            if(!this.field.id && !this.field.reference)
           this.field.type.name = genericName;
            this.field.id?this.field.type.name = simpleName+' ID ':
            this.field.reference?this.field.type.name = simpleName+' REF ':false;
           }
           if(isList){
             this.field.list = true;
             this.field.simple = false;
           }
        }
      })
     return this.formBuilder.group({  
      name: [this.field.name,Validators.required],  
      category: [''],  
      generic:[''],
      simple: [''],
      isList:this.field.list,
      idOrReference:[''],
    });    
    
 
  }     
  get category(){
    return this.form.get('category')
  }  
    //  fieldValueByIndex(index) {
    //   var arrayControl = this.form.get('fields') as FormArray;
    //   const value = arrayControl.at(index).get('category').value;
    //     return value == null ? false : arrayControl.at(index).get('category').value.name;

    // }
    hide(){
      this.form.reset();
      this.editFieldDialog = false; 
    }

    submit(){
    this.fieldToBeEdited = {...this.field};
    this.form.reset();
    this.editFieldDialog = false; 
    this.service.editField$.next(false);
    }

    get fieldToBeEdited(): Field {
    return this.service.fieldToBeEdited;
    }

  set fieldToBeEdited(value: Field) {
    this.service.fieldToBeEdited = value;
  }
   get editFieldDialog(): boolean {
    return this.service.editFieldDialog;
  }

  set editFieldDialog(value: boolean) {
    this.service.editFieldDialog = value;
  }
}
