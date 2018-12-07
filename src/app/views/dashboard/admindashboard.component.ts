import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation  } from '@angular/core';  // rrc for toaster service
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';  // rrc
import { AnonymousSubject } from 'rxjs';


// @Component({
//   templateUrl: 'admindashboard.component.html',
//   styleUrls: ['../../../../node_modules/font-awesome/css/font-awesome.min.css']
// })  // rrc

// rrc
@Component({
  templateUrl: 'admindashboard.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss',
   '../../../../node_modules/spinkit/css/spinkit.css',
   '../../../../node_modules/font-awesome/css/font-awesome.min.css'],

   encapsulation: ViewEncapsulation.None      // rrc for toaster service

})  // rrc

export class AdminDashboardComponent implements OnInit {

  private toasterService: ToasterService;  // rrc
  public toasterconfig : ToasterConfig = new ToasterConfig({tapToDismiss: true,timeout: 5000});  // rrc

  recordData: RecordData;
  rootUrl: string;

  // rrc widgets

  public brandPrimary:string =  '#20a8d8';
  public brandSuccess:string =  '#4dbd74';
  public brandInfo:string =   '#63c2de';
  public brandWarning:string =  '#f8cb00';
  public brandDanger:string =   '#f86c6b';

data1Ary:string[] = [];
  // rrc widgets

  constructor(private http: HttpClient,toasterService: ToasterService, private auth: AuthenticationService ) {    // rrc - added toasterService
    this.toasterService = toasterService;  // rrc
    this.rootUrl = auth.apiUrl;
  }

  ngOnInit(): void {
    this.recordData = new RecordData();
    this.data1Ary.length = 0; // rrc    

    this.http.get<RecordData>(this.rootUrl + '/totalrecordviewer').subscribe(data => {
      this.recordData = data;

      //rrc
      this.data1Ary.push(this.recordData.scftotal_applicant.toString());
      this.data1Ary.push(this.recordData.scftotal_allocated.toString());
      this.data1Ary.push(this.recordData.scftotal_adp.toString());
      this.data1Ary.push(this.recordData.totalAccreditedCollectionCenters.toString());
      this.data1Ary.push(this.recordData.totalnotrecgscf.toString());
      this.data1Ary.push(this.recordData.totalderecgscf.toString());
      
      this.recordData.str_scftotal_applicant = this.recordData.scftotal_applicant.toString();
      this.recordData.str_scftotal_allocated = this.recordData.scftotal_allocated.toString();      
      this.recordData.str_scftotal_adp = this.recordData.scftotal_adp.toString();

      this.recordData.str_totalrecgscf = this.recordData.totalAccreditedCollectionCenters.toString();
      this.recordData.str_totalnotrecgscf = this.recordData.totalnotrecgscf.toString();
      this.recordData.str_totalderecgscf = this.recordData.totalderecgscf.toString();      

    // make graph here
      
      //rrc
      
    }, error => {
      console.log(JSON.stringify(error));

    });
  }


    // rrc

  downloadTrainings(){
    this.showSuccess("Dwnld Training Manual");
  }

  showSuccess(msg) {
    this.toasterService.pop('success', 'Success', msg);
  }
  
  showError(msg) {
    this.toasterService.pop('error', 'Error', msg);
  }


// widgets data functions

public chartHovered(e:any):void {
  console.log(e);
}

public chartClicked(e:any):void {
  console.log(e);
  console.log(this.data1Ary);
}

// barChart1
  public barChart1Data:Array<any> = [
    {
      
      //data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      //data: [this.recordData.totalderecgscf, this.recordData.totalnotrecgscf, this.recordData.totalderecgscf],
      data: this.data1Ary,
      //data: [1,2,3],
      label: 'SCF' // Series A
    }
  ];

   // say total = 50 SCF, (50 - 2) recg, (50 - 12) not recg, (50 - 5) de-recg
   public barChart1Labels:Array<any> = ['Recognised', 'Not recognised', 'De-recognised'];
   //public barChart1Labels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];

  public barChart1Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };

  public barChart1Colours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];

  public barChart1Legend:boolean = false;
  public barChart1Type:string = 'bar';


  // barChart3
  public barChart3Data:Array<any> = [
    {
      data: [2, 12, 5],
      label: 'SCF' // Series A
    }
  ];
  public barChart3Labels:Array<any> = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  public barChart3Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart3Primary:Array<any> = [
    {
      backgroundColor: this.brandPrimary,
      borderColor: 'transparent',
      borderWidth: 1
    }
  ];
  public barChart3Danger:Array<any> = [
    {
      backgroundColor: this.brandDanger,
      borderColor: 'transparent',
      borderWidth: 1
    }
  ];
  public barChart3Success:Array<any> = [
    {
      backgroundColor: this.brandSuccess,
      borderColor: 'transparent',
      borderWidth: 1
    }
  ];
  public barChart3Legend:boolean = false;
  public barChart3Type:string = 'bar';


    // rrc


}  // ends export class



class RecordData {
  totalLabs: number;
  totalActiveLabs: number;
  totalDeactiveLabs:number;
  totalCollectionCenters: number;
  totalAccreditedCollectionCenters: number;
  totalUser: number;
  totalActiveUser:number;
  totalDeactiveUser:number;
  totalAssessorUser: number;
  totalAssessmentRecord:number;

  // rrc

  scftotal_applicant:number;
  scftotal_allocated:number;
  scftotal_adp:number; // Assessed & Decision Pending

  totalnotrecgscf:number;
  totalderecgscf:number;
  
  str_scftotal_applicant:string;
  str_scftotal_allocated:string;
  str_scftotal_adp:string; // Assessed & Decision Pending

  str_totalrecgscf:string;
  str_totalnotrecgscf:string;
  str_totalderecgscf:string;
  // rrc

}
