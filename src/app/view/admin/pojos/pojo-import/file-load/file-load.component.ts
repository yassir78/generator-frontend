import { RequestVo } from './../../../../../controller/model/request-vo.model';
import { PojoService } from './../../../../../controller/service/pojo.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-file-load',
  templateUrl: './file-load.component.html',
  styleUrls: ['./file-load.component.scss']
})
export class FileLoadComponent implements OnInit {

  fileToUpload: File | null = null;

  constructor(private pojoSerice: PojoService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
  }

  get requestVo(): RequestVo {
    return this.pojoSerice.requestVo;
  }

  handleFileInput(event: any) {
    // console.log("I'm here")
    this.fileToUpload = event.files.item(0);
    // console.log(event.files)
  }

  uploadDocument() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // console.log(fileReader.result);
      this.ref.close(fileReader.result.toString());
    }
    fileReader.readAsText(this.fileToUpload);
  }

}
