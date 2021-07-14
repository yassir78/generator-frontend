import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
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
         
      }
    })
   
  }
    createItem(): FormGroup {  
      console.log('this is the create item function')
      this.form.get('fields').valueChanges.subscribe(value=>{
        console.log(value)
        // check the emitted value and change the values in the fieldObject
        const simpleOrComplexe = value[0].category.name;
           if(simpleOrComplexe=="Simple"){
          this.fieldToBeEdited.simple = true
        }else{
              this.fieldToBeEdited.simple = false
        }
     
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
  submit(){
   // TODO 
   // reset the form 
   // close the dialog
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
