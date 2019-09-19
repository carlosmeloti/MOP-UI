import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { TreeNode } from "primeng/api";



@Injectable()
export class NodeService {

    constructor(private http: Http) {}

    getFiles() {
        return this.http.get('http://10.132.90.58:4200/assets/json/files.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
    }
}
