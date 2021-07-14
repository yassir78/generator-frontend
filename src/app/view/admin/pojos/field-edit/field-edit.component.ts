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

  form!: FormGroup;  
  fields!: FormArray;  
  pojosNames;
  typesSimple = [{type:"String"},{type:"BigDecimal"},{type:"Double"}]
  categories = [{name:"Simple"},{name:"Complexe"}]
  idOrReferenceValue = [{name:'id'},{name:'ref'}]
  editField$:Observable<boolean> = this.service.editField$.asObservable();

  constructor(private service:PojoService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
     this.pojosNames = this.service.items.map(pojo=>{
      return { name: pojo.name } });
      this.form = new FormGroup({  
      name:new FormControl([]),
      fields: new FormArray([])  
    });  
  
    this.editField$.subscribe(value=>{
      if(value){
        console.log("i'm in")
        this.addField();
        console.log(this.fieldToBeEdited)
      }
    })
   
  }
    createItem(): FormGroup {  
      console.log('this is the create item function')
      this.form.get('fields').valueChanges.subscribe(value=>{
        const simpleOrComplexe = value[0].category == null ? null : value[0].category.name;
        const genericName = value[0].generic == null ?null:value[0].generic.name;
        const simpleName =value[0].simple == null ? null :value[0].simple.type;
        const idOrRef  = value[0].idOrReference == null ? null : value[0].idOrReference.name;
        const isList = value[0].isList;
        if(idOrRef){
          if(idOrRef == 'ref'){
            this.fieldToBeEdited.id = false;
            this.fieldToBeEdited.reference = true;
            this.fieldToBeEdited.type.simpleName += " REF";
          }else{
            this.fieldToBeEdited.id = true;
            this.fieldToBeEdited.reference = false;
              this.fieldToBeEdited.type.simpleName += " ID";
          }
        }
        if(simpleOrComplexe == 'Simple'){
           this.fieldToBeEdited.simple =  true;
           this.fieldToBeEdited.generic = false;
           this.fieldToBeEdited.list = false;
           this.fieldToBeEdited.type.simpleName = 'Simple'
               this.fieldToBeEdited.type.name = 'Simple'
           if(simpleName){
             this.fieldToBeEdited.type.simpleName = simpleName;
              this.fieldToBeEdited.type.name = simpleName;
           }
        }else if(simpleOrComplexe == 'Complexe'){
          console.log("i'm in")
            this.fieldToBeEdited.simple =  false;
            this.fieldToBeEdited.generic = true;
            this.fieldToBeEdited.type.simpleName = 'Complexe'
             this.fieldToBeEdited.type.name = 'Complexe'
           if(genericName){
             this.fieldToBeEdited.type.simpleName=genericName; 
              this.fieldToBeEdited.type.name = genericName;
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
    return this.form.get('categorie')
  } 
  addField(): void {  
    this.fields = this.form.get('fields') as FormArray;  
    this.fields.push(this.createItem());  
  }  
     fieldValueByIndex(index) {
      var arrayControl = this.form.get('fields') as FormArray;
      const value = arrayControl.at(index).get('category').value;
        return value == null ? false : arrayControl.at(index).get('category').value.name;

    }
    hide(){
      var arrayControl = this.form.get('fields') as FormArray;
   arrayControl.clear();
    }
  submit(){
   // TODO 
   // reset the form 
   var arrayControl = this.form.get('fields') as FormArray;
   arrayControl.clear();
   // close the dialog
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
