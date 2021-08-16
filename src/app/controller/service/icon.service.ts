import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IconService {
  constructor(private http: HttpClient) {}

  getIcons(): Promise<any[]> {
    return this.http
      .get<any>("assets/icons.json")
      .toPromise()
      .then((res) => <any[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
