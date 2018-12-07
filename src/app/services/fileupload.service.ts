import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
//import { resolve } from 'path';
import { reject } from 'q';
/* Naming NOTE
  The API's file field is `file` thus, we name it the same below
  it's like saying <input type='file' name='file' />
  on a standard file field
*/


@Injectable()
export class FileUploadService {
  apiBaseURL: string;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    //this.apiBaseURL = auth.apiUrl;

  }

  fileUploadLabs(file: File, extraData?: object): any {
    let apiEndpoint = this.apiBaseURL + 'UploadLabs';
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key])
      }
    }

    const req = new HttpRequest('POST', apiEndpoint, formData);
    return this.http.request(req)
  }

  fileUploadCollectionCenters(file: File, extraData?: object): any {
    let apiEndpoint = this.apiBaseURL + 'UploadCollectionCenters';
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key])
      }
    }

    const req = new HttpRequest('POST', apiEndpoint, formData);

    return this.http.request(req);

  }
  fileUploadAssessors(file: File, extraData?: object): any {
    let apiEndpoint = this.apiBaseURL + 'UploadAssessors';
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key])
      }
    }

    const req = new HttpRequest('POST', apiEndpoint, formData);
    return this.http.request(req);
  }


  //// files upload to server for Corrective Action for an Assessment 

  // uploadDoc(file: File, extraData?: object, docfor?: string): any {
  //   let apiEndpoint = this.apiBaseURL + 'DocsController';
  //   const formData: FormData = new FormData();

  //   formData.append('file', file, file.name);

  //   if (extraData) {
  //     for(let key in extraData){
  //         // iterate and set other form data
  //       formData.append(key, extraData[key])
  //     }
  //   }

  //   if(docfor){
  //     formData.append('asmt', docfor, "c.a."); // Assessment corrective action
  //   }

  //   const req = new HttpRequest('POST', apiEndpoint, formData);

  //    return this.http.request(req);

  // }

  uploadMultipleDocs(files: File[], extraData?: object, docsfor?: string): any {
    let apiEndpoint = this.apiBaseURL + 'DocsController';
    const formData: FormData = new FormData();

    for (let vfile of files) {
      var i = 0;
      formData.append("files", vfile, vfile.name); // "10-geninfo-1"
      i++;
    }

    formData.append("docsfor", docsfor); // "10-geninfo-1"


    // if (extraData) {      
    //   for(let key in extraData){        
    //       // iterate and set other form data
    //     formData.append(key, extraData[key])
    //   }
    // }

    // if(docsfor){
    //   formData.append('asmt', docsfor, "coract"); // Assessment corrective action
    // }

    const req = new HttpRequest('POST', apiEndpoint, formData);

    return this.http.request(req);

  }


  uploadOAMultipleDocs(files: File[], extraData?: object, docsfor?: string): any {
    // multi docs for Offline assessment
    let apiEndpoint = this.apiBaseURL + 'OfflineAsmtDocsController';
    const formData: FormData = new FormData();

    for (let vfile of files) {
      var i = 0;
      formData.append("files", vfile, vfile.name);
      i++;
    }

    formData.append("docsfor", docsfor); // scfid


    // if (extraData) {      
    //   for(let key in extraData){        
    //       // iterate and set other form data
    //     formData.append(key, extraData[key])
    //   }
    // }

    // if(docsfor){
    //   formData.append('asmt', docsfor, "coract"); // Assessment corrective action
    // }

    const req = new HttpRequest('POST', apiEndpoint, formData);

    return this.http.request(req);

  }

  //// files upload to server for Corrective Action for an Assessment 


}
