import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Body } from '@angular/http/src/body';
import { error } from 'util';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import * as FileSaver from 'file-saver';
import { ResponseContentType } from '@angular/http';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { AuthenticationService } from './../../services/authentication.service';
//ng select
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';

@Component({

  templateUrl: 'billing.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss',
    '../../../../node_modules/spinkit/css/spinkit.css'
    , "../../../../node_modules/font-awesome/css/font-awesome.min.css",
    "../../../../node_modules/primeng/resources/themes/omega/theme.css",
    "../../../../node_modules/primeng/resources/primeng.min.css",
    "../../../../src/scss/vendors/bs-datepicker/bs-datepicker.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BillingComponent implements OnInit {


  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  //



  //here 30 is day 24 is hour 60 is minute, 60 is seconds,1000 is milliseconds
  //we creating 30 days ago for starting range date picker
  //if you want to change then only change 30 value acccording to your day
  bsRangeValue: any = [new Date(new Date().getTime() - (180 * 24 * 60 * 60 * 1000)), new Date()];
  IsShowProgress = false;

  selectedSchoolId = 0;
  School_Data: SchoolData;//here passing reference of School data type

  rootUrl: string;//url root where call hit
  spinnerCubeDisplay = false;//defining variable for spinner
  isLoading = true;
  progress: number | boolean;//
  isAactionBtn = false;//for button to disable aur enable variable declaration


  constructor(private http: HttpClient, toasterService: ToasterService, private auth: AuthenticationService, private router: Router) {
    this.toasterService = toasterService;
    // this.rootUrl=auth.apiUrl;

  }
  ngOnInit(): void {

    this.School_Data = new SchoolData();
    this.LoadSchoolList();

  }




  LoadSchoolList() {
    this.spinnerCubeDisplay = true;
    this.http.get<SchoolData>(this.rootUrl + 'schools?all=1').subscribe(data => {
      this.School_Data = data;
      this.spinnerCubeDisplay = false;
    }, error => {
      this.spinnerCubeDisplay = false;
      console.log(JSON.stringify(error));
    });
  }
  // DownloadFile(schoolId)
  // {
  //   this.spinnerCubeDisplay= true;
  //   this.http.get(this.rootUrl+'CheckupExcel/'+schoolId+'?fromYear='+new Date(this.bsRangeValue[0]).getTime()+'&toYear='+new Date(this.bsRangeValue[1]).getTime()).subscribe(data => {
  //     var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //     var blob = new Blob([data], { type: contentType });
  //     FileSaver.saveAs(blob, "MedicalReport.xlsx");
  //     this.spinnerCubeDisplay= false;
  //   },error=>{
  //     this.spinnerCubeDisplay= false;
  //     console.log(JSON.stringify(error));
  //   });
  // }


  DownloadFile(schoolId) {
    this.IsShowProgress = true;
    this.export(schoolId, new Date(this.bsRangeValue[0]).getTime(), new Date(this.bsRangeValue[1]).getTime())
      .subscribe(data =>
        this.IsShowProgress = false,

      ),//console.log(data),
      error => console.log("Error downloading the file."),
      () => console.log('Completed file download.');
  }


  export(schoolId, fromYear, toYear): Observable<Object[]> {

    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();

      var self = this;
      xhr.open('GET', this.rootUrl + 'CheckupExcel/' + schoolId + '?fromYear=' + fromYear + '&toYear=' + toYear, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.auth.token);
      xhr.responseType = 'blob';

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            var blob = new Blob([xhr.response], { type: contentType });
            observer.next(blob);
            observer.complete();
            FileSaver.saveAs(blob, "MedicalReport.xlsx");

          } else {
            observer.error(xhr.response);

            self.IsShowProgress = false
          }
        }

      }
      xhr.send();

    });
  }

  ShowHideSpiner(isShow) {
    //this function take an boolean value and then is does spinner show of hide
    //and also button disable of enable

    if (isShow == true) {
      this.isLoading = true;
      this.progress = 0; // starts spinner
      this.isAactionBtn = true;//disable button
    }
    else {
      this.isLoading = false;
      this.progress = false; // stops spinner
      this.isAactionBtn = false;//enable button
    }
  }

  showSuccess(msg) {

    this.toasterService.pop('success', 'Success', msg);
  }

  showError(msg) {

    this.toasterService.pop('error', 'Error', msg);
  }

}

class EntityOperationResult {
  isSuccess: boolean;
  id: number;
  error: string;
  successMessage: string;
}

class SchoolData {
  total: number;
  rows: [{
    id: string;
    schoolname: string;
    address: string;
    city: string;
    email: string;
    mobile: string;
    contactperson: string;
    contactpersonemail: string;
    contactpersonmobile: string;
    isactive: boolean;
    notes: string;
  }];


}
