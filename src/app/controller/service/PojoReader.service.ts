import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PojoReaderService {
   url:string = "http://localhost:8036/generator/pojo/uploadFile";
  constructor(private http :HttpClient) { }
  
}
