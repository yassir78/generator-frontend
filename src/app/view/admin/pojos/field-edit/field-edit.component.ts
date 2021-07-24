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
          this.field = JSON.parse(JSON.stringify(this.fieldToBeEdited));
          this.form.setValue({
            name: this.fieldToBeEdited.name,
            category: this.fieldToBeEdited.simple?'Simple':'Complexe',
            isList: this.fieldToBeEdited.list,
            simple:this.fieldToBeEdited.type.simpleName,
            generic:this.fieldToBeEdited.type.simpleName,
            idOrReference:this.fieldToBeEdited.id?'id':this.fieldToBeEdited.reference?'ref':'idOrRef',
          })
          this.valuesChanged();
        }
        
      }
    })
    
  }
    valuesChanged(): FormGroup { 
      console.log('this is the create item function')
      this.form.valueChanges.subscribe(value=>{
        console.log(value);
        const name = value.name == null? null:value.name;
        const simpleOrComplexe = value.category == null ? null : value.category.name;
        const genericName = value.generic == null ?null:value.generic.name;
        const simpleName =value.simple == null ? null :value.simple.type;
        const idOrRef  = value.idOrReference == null ? null : value.idOrReference.name;
        const isList = value.isList;
        
        name?this.fieldToBeEdited.name = name:false;

        if(idOrRef){
          if(idOrRef == 'ref'){
            this.fieldToBeEdited.id = false;
            this.fieldToBeEdited.reference = true;
            this.fieldToBeEdited.type.name = this.fieldToBeEdited.type.simpleName+ " REF";
          }else{
            this.fieldToBeEdited.id = true;
            this.fieldToBeEdited.reference = false;
            this.fieldToBeEdited.type.name = this.fieldToBeEdited.type.simpleName+ " ID";
          }
        }
        if(simpleName){
          console.log('testing type changed')
          this.fieldToBeEdited.type.simpleName = simpleName;
          if(!this.fieldToBeEdited.id && !this.fieldToBeEdited.reference)
          this.fieldToBeEdited.type.name = simpleName;
           this.fieldToBeEdited.id?this.fieldToBeEdited.type.name = simpleName+' ID ':
           this.fieldToBeEdited.reference?this.fieldToBeEdited.type.name = simpleName+' REF ':false;
        }
        if(genericName){
          this.fieldToBeEdited.type.simpleName=genericName; 
          if(!this.fieldToBeEdited.id && !this.fieldToBeEdited.reference)
          this.fieldToBeEdited.type.name = genericName;
          this.fieldToBeEdited.id?this.fieldToBeEdited.type.name = simpleName+' ID ':
          this.fieldToBeEdited.reference?this.fieldToBeEdited.type.name = simpleName+' REF ':false;
        }
        if(isList){
          this.fieldToBeEdited.list = true;
          this.fieldToBeEdited.simple = false;
        }
        if(simpleOrComplexe == 'Simple'){
           this.fieldToBeEdited.simple =  true;
           this.fieldToBeEdited.generic = false;
           this.fieldToBeEdited.list = false;
           if(simpleName){
            this.fieldToBeEdited.type.simpleName = simpleName;
            this.fieldToBeEdited.id?this.fieldToBeEdited.type.name = simpleName+' ID ':
            this.fieldToBeEdited.reference?this.fieldToBeEdited.type.name = simpleName+' REF ':false;
           }
        }else if(simpleOrComplexe == 'Complexe'){
          console.log("i'm in")
            this.fieldToBeEdited.simple =  false;
            this.fieldToBeEdited.generic = true;
           if(genericName){
            this.fieldToBeEdited.type.simpleName=genericName; 
            this.fieldToBeEdited.id?this.fieldToBeEdited.type.name = simpleName+' ID ':
            this.fieldToBeEdited.reference?this.fieldToBeEdited.type.name = simpleName+' REF ':false;
           }
           if(isList){
             this.fieldToBeEdited.list = true;
             this.fieldToBeEdited.simple = false;
           }
        }
        console.log(this.fieldToBeEdited)
     
      })
     return this.formBuilder.group({  
      name: [this.fieldToBeEdited.name,Validators.required],  
      category: [''],  
      generic:[''],
      simple: [''],
      isList:this.fieldToBeEdited.list,
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
