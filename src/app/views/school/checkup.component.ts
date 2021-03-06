import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Body } from '@angular/http/src/body';
import { error } from 'util';

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { AuthenticationService } from './../../services/authentication.service';
import { NumericTextBoxComponent } from '@syncfusion/ej2-ng-inputs';




import { CheckboxModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { UIChart } from "primeng/components/chart/chart";
@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: 'checkup.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../../node_modules/spinkit/css/spinkit.css',
    'css/checkup.component.css',
    '../../../../node_modules/primeng/resources/themes/omega/theme.css',
    '../../../../node_modules/primeng/resources/primeng.min.css',
    '../../../../node_modules/font-awesome/css/font-awesome.min.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class CheckupComponent implements OnInit {
  date3: Date;
  @ViewChild('EditModal') modalEdit: any;
  @ViewChild("chart") chart: UIChart;
  @ViewChild("addNewStudentModal") addNewStudentModal: any;

  schoolId: number;
  checkupHeaderId: number;
  id: number;
  record: CheckupItem;
  student: any;
  label: string;
  spinnerCubeDisplay = true; // defining variable for spinner
  isLoading = true;
  progress: number | boolean;
  isAactionBtn = false; // for button to disable aur enable variable declaration
  rootUrl: string; // url root where call hit
  oralRating = 0;
  oralRatingMsg = 'Not-Rated';
  gneralExamItem: GeneralExamItem;
  eyeExamItem: EyeExamItem;
  dentalExamItem: DentalExamItem;
  entExamItem: EntExamItem;
  Edit_StudentData: EditStudentData;//here creating an variable of editstudent data type
  // maxDate=new Date();
  isMaleChartUpdated: boolean = false;
  isFemaleChartUpdated: boolean = false;
  constLabels = [2, 2.041666667, 2.125, 2.208333333, 2.291666667, 2.375, 2.458333333, 2.541666667, 2.625, 2.708333333, 2.791666667, 2.875, 2.958333333, 3.041666667, 3.125, 3.208333333, 3.291666667, 3.375, 3.458333333, 3.541666667, 3.625, 3.708333333, 3.791666667, 3.875, 3.958333333, 4.041666667, 4.125, 4.208333333, 4.291666667, 4.375, 4.458333333, 4.541666667, 4.625, 4.708333333, 4.791666667, 4.875, 4.958333333, 5.041666667, 5.125, 5.208333333, 5.291666667, 5.375, 5.458333333, 5.541666667, 5.625, 5.708333333, 5.791666667, 5.875, 5.958333333, 6.041666667, 6.125, 6.208333333, 6.291666667, 6.375, 6.458333333, 6.541666667, 6.625, 6.708333333, 6.791666667, 6.875, 6.958333333, 7.041666667, 7.125, 7.208333333, 7.291666667, 7.375, 7.458333333, 7.541666667, 7.625, 7.708333333, 7.791666667, 7.875, 7.958333333, 8.041666667, 8.125, 8.208333333, 8.291666667, 8.375, 8.458333333, 8.541666667, 8.625, 8.708333333, 8.791666667, 8.875, 8.958333333, 9.041666667, 9.125, 9.208333333, 9.291666667, 9.375, 9.458333333, 9.541666667, 9.625, 9.708333333, 9.791666667, 9.875, 9.958333333, 10.04166667, 10.125, 10.20833333, 10.29166667, 10.375, 10.45833333, 10.54166667, 10.625, 10.70833333, 10.79166667, 10.875, 10.95833333, 11.04166667, 11.125, 11.20833333, 11.29166667, 11.375, 11.45833333, 11.54166667, 11.625, 11.70833333, 11.79166667, 11.875, 11.95833333, 12.04166667, 12.125, 12.20833333, 12.29166667, 12.375, 12.45833333, 12.54166667, 12.625, 12.70833333, 12.79166667, 12.875, 12.95833333, 13.04166667, 13.125, 13.20833333, 13.29166667, 13.375, 13.45833333, 13.54166667, 13.625, 13.70833333, 13.79166667, 13.875, 13.95833333, 14.04166667, 14.125, 14.20833333, 14.29166667, 14.375, 14.45833333, 14.54166667, 14.625, 14.70833333, 14.79166667, 14.875, 14.95833333, 15.04166667, 15.125, 15.20833333, 15.29166667, 15.375, 15.45833333, 15.54166667, 15.625, 15.70833333, 15.79166667, 15.875, 15.95833333, 16.04166667, 16.125, 16.20833333, 16.29166667, 16.375, 16.45833333, 16.54166667, 16.625, 16.70833333, 16.79166667, 16.875, 16.95833333, 17.04166667, 17.125, 17.20833333, 17.29166667, 17.375, 17.45833333, 17.54166667, 17.625, 17.70833333, 17.79166667, 17.875, 17.95833333, 18.04166667, 18.125, 18.20833333, 18.29166667, 18.375, 18.45833333, 18.54166667, 18.625, 18.70833333, 18.79166667, 18.875, 18.95833333, 19.04166667, 19.125, 19.20833333, 19.29166667, 19.375, 19.45833333, 19.54166667, 19.625, 19.70833333, 19.79166667, 19.875, 19.95833333, 20];
  constMaleData: any;
  constFemaleData: any;
  data: any;
  options: any;

  currentUserId: number;

  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });


  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    toasterService: ToasterService, private auth: AuthenticationService, private router: Router) {



    this.toasterService = toasterService;
    // this.rootUrl = auth.apiUrl;

  }

  ngOnInit(): void {

    //this.date3=new Date();
    this.Edit_StudentData = new EditStudentData();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      this.currentUserId = currentUser.userId;
    }
    // asigning object
    this.record = new CheckupItem();
    this.gneralExamItem = new GeneralExamItem;
    this.eyeExamItem = new EyeExamItem;
    this.dentalExamItem = new DentalExamItem;
    this.entExamItem = new EntExamItem;



    this.spinnerCubeDisplay = false;

    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // this.id = params['id'];

      if (params['headerid']) {
        this.checkupHeaderId = parseInt(params['headerid'], 10);
        this.pageLoad(this.checkupHeaderId);
      }
      else {

        if (params['schoolid']) {
          this.schoolId = parseInt(params['schoolid'], 10);
          this.record.schoolid = this.schoolId;
        }
        if (params['schoolname']) {
          this.record.schoolname = params['schoolname'];
        }
        if (params['schoolcity']) {
          this.record.schoolcity = params['schoolcity'];
        }

        this.record.checkupdatems = new Date().getTime();
      }
    });
    //this.loadFemaleData();
    //this.loadmaleChart();
  }
  addNewCheckup() {

    //here we initialize balnk object 
    var tempRecord = this.record;
    tempRecord.id = 0;
    tempRecord.age = null;
    tempRecord.studentname = "";
    tempRecord.studentgender = "";
    tempRecord.dobms = null;
    tempRecord.studentid = 0;
    tempRecord.checkupdatems = new Date().getTime();

    this.record = tempRecord;
    this.gneralExamItem = new GeneralExamItem;
    this.eyeExamItem = new EyeExamItem;
    this.dentalExamItem = new DentalExamItem;
    this.entExamItem = new EntExamItem;

    //here chart related work
    if (this.isMaleChartUpdated == true) {
      this.data.datasets.pop();
      this.data.datasets.pop();
      this.loadmaleChart();
    }
    if (this.isFemaleChartUpdated == true) {
      this.data.datasets.pop();
      this.data.datasets.pop();
      this.loadFemaleChartData();
    }
    this.isMaleChartUpdated = false;
    this.isFemaleChartUpdated = false;

    this.chart.refresh();



  }

  openModalForAddNewStudent() {
    this.Edit_StudentData = new EditStudentData();//blank object
    this.Edit_StudentData.schoolid = this.record.schoolid;
    this.Edit_StudentData.isactive = true;
    this.Edit_StudentData.studentgender = "m";
    this.Edit_StudentData.dob = new Date().toDateString();
    this.addNewStudentModal.show();
  }

  saveStudentKeyDown(Studentform) {
    if (Studentform.valid == true)
      this.SaveStudent();
    else {
      if (Studentform.controls.fullname.status == "INVALID") {
        this.showError("Please Enter full name ");
        return;

      }
      if (Studentform.controls.dob.status == "INVALID") {
        this.showError("Please Enter/select date of birth ");
        return;
      }
      if (Studentform.controls.studentclass.status == "INVALID") {
        this.showError("Please select class");
        return;
      }

    }
  }
  SaveStudent() {
    let fullStudentName = this.Edit_StudentData.fullname.replace(/\s+/g, ' ').trim();
    if (fullStudentName == "") {
      this.showError("please enter student name");
      return;
    }
    var obj = fullStudentName.split(" ");

    if (obj.length > 0) {
      if (obj.length > 0)
        this.Edit_StudentData.firstname = obj[0];
      if (obj.length > 1)
        this.Edit_StudentData.middlename = obj[1];
      if (obj.length > 2)
        this.Edit_StudentData.lastname = obj[2];
    }
    else {
      this.showError("please enter student name correctly");
      return;
    }

    // return;
    var dt = new Date(this.date3);
    this.Edit_StudentData.dobms = dt.getTime();
    if (!this.record.schoolid) {
      this.showError("something wrong please refresh page");
      return;
    }

    this.ShowHideSpiner(true);
    this.http.put<EntityOperationResult>(this.rootUrl + 'students', this.Edit_StudentData).subscribe(data => {
      if (data.isSuccess == true) {
        this.record.studentid = data.id;
        this.record.studentgender = this.Edit_StudentData.studentgender;
        this.record.dobms = this.Edit_StudentData.dobms;
        let studentFullName = this.Edit_StudentData.firstname;
        if (this.Edit_StudentData.middlename)
          studentFullName = studentFullName + " " + this.Edit_StudentData.middlename;
        if (this.Edit_StudentData.lastname)
          studentFullName = studentFullName + " " + this.Edit_StudentData.lastname;
        this.record.studentname = studentFullName;
        this.record.age = (new Date().getFullYear() - dt.getFullYear());

        this.showSuccess(data.successMessage);
        this.addNewStudentModal.hide();

        this.ShowHideSpiner(false);
        this.SaveCheckupHeader();
      }
      else {
        this.showError(data.error);
        this.addNewStudentModal.hide();
        this.ShowHideSpiner(false);
      }
    },
      error => {
        this.ShowHideSpiner(false);
        this.addNewStudentModal.hide();
        console.log(JSON.stringify(error));
      });
  }

  onStudentSelected(e) {
    //
    this.record.studentname = e.fullname;
    this.record.studentid = e.id;
    this.record.schoolid = e.schoolid;
    this.record.dobms = e.dobms;
    this.record.age = (new Date().getFullYear() - new Date(e.dobms).getFullYear());
    //this.record.age=parseInt(this.record.agestring);
    this.record.studentgender = e.studentgender;

    this.modalEdit.hide();
    if (e.studentgender == 'm') {
      this.loadmaleChart();
    }
    else {
      this.loadFemaleChartData();
    }
  }


  pageLoad(headerid) {
    this.ShowHideSpiner(true);
    this.http.get<CheckupItem>(this.rootUrl + 'studentsCheckup/' + headerid).subscribe(data => {

      this.record = data;

      if (data.generalexam)
        this.gneralExamItem = data.generalexam;
      if (data.eyeexam)
        this.eyeExamItem = data.eyeexam;
      if (data.dentalexam) {
        this.dentalExamItem = data.dentalexam;
        if (this.dentalExamItem.overoralhealth > 0) {

          if (this.dentalExamItem.overoralhealth === 4) {
            this.oralRatingMsg = 'Excellent';
          }
          if (this.dentalExamItem.overoralhealth === 3) {
            this.oralRatingMsg = 'Good';
          }
          if (this.dentalExamItem.overoralhealth === 2) {
            this.oralRatingMsg = 'Fair';
          }
          if (this.dentalExamItem.overoralhealth === 1) {
            this.oralRatingMsg = 'Poor';
          }
        }
      }
      if (data.entexam)
        this.entExamItem = data.entexam;

      if (this.record.studentgender == 'm') {
        this.loadmaleChart();
      }
      else {
        this.loadFemaleChartData();
      }
      this.ShowHideSpiner(false);
      this.spinnerCubeDisplay = false;
    }, error => {
      this.record = new CheckupItem();
      console.log(JSON.stringify(error));
      this.ShowHideSpiner(false);
      this.spinnerCubeDisplay = false;
    });
  }

  heightChange(newValue) {
    if (newValue.value != null) {
      if (this.record.studentgender == 'm') {
        if (this.gneralExamItem.weightinkg != null)
          this.updataMaleChart(newValue.value, this.gneralExamItem.weightinkg);
        else
          this.updataMaleChart(newValue.value, 0);
      }
      else {

        if (this.gneralExamItem.weightinkg != null)
          this.updataFemaleChart(newValue.value, this.gneralExamItem.weightinkg);
        else
          this.updataFemaleChart(newValue.value, 0);
      }
    }
  }
  closest(num, arr) {
    var curr = arr[0];
    var diff = Math.abs(num - curr);
    for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs(num - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
      }
    }
    return curr;
  }
  weightChange(newValue) {
    if (newValue.value != null) {
      if (this.record.studentgender == 'm') {
        if (this.gneralExamItem.heightincm != null)
          this.updataMaleChart(this.gneralExamItem.heightincm, newValue.value);
        else
          this.updataMaleChart(0, newValue.value);
      }
      else {

        if (this.gneralExamItem.heightincm != null)
          this.updataFemaleChart(this.gneralExamItem.heightincm, newValue.value);
        else
          this.updataFemaleChart(0, newValue.value);
      }
    }
  }

  //#region  for Male chart

  updataMaleChart(height, weight) {
    if (!this.constMaleData) {
      this.loadmaleChart();
    }
    this.data = this.constMaleData;

    var age = this.record.age;
    var clst = this.closest(age, this.constLabels);

    let index = this.constLabels.findIndex(x => x == clst);
    let tempWeightdata = [];
    let tempHeightdata = [];
    for (var i = 1; i <= index; i++) {
      tempWeightdata.push(null);
      tempHeightdata.push(null);
    }

    tempHeightdata.push(height);
    tempWeightdata.push(weight);
    if (this.isMaleChartUpdated == false) {
      this.isMaleChartUpdated = true;
    }
    else {
      this.data.datasets.pop();
      this.data.datasets.pop();
    }
    this.data.datasets.push({
      yAxisID: 'y2',
      label: 'Weight',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(0,255,0,0.4)',
      borderColor: 'red', // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'black',
      pointBorderWidth: 0.5,
      pointHoverRadius: 2,
      pointHoverBackgroundColor: 'balck',
      pointHoverBorderColor: 'brown',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 2,
      // notice the gap in the data and the spanGaps: true
      data: tempWeightdata,
      spanGaps: true,
    });

    this.data.datasets.push({
      yAxisID: 'y1',
      label: 'Stature',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(167,105,0,0.4)',
      borderColor: 'rgb(167, 105, 0)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'black',
      pointBorderWidth: 0.1,
      pointHoverRadius: 2,
      pointHoverBackgroundColor: 'brown',
      pointHoverBorderColor: 'yellow',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 2,
      // notice the gap in the data and the spanGaps: false
      data: tempHeightdata,
      spanGaps: false,
    });


    this.chart.refresh();
  }


  // lineChart
  loadmaleChart() {

    this.constMaleData =
      {
        labels: this.constLabels,

        datasets: [

          {
            yAxisID: 'y2',
            label: 'P3% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [10.38209025, 10.4414422, 10.55847309, 10.67380261, 10.78798157, 10.90147346, 11.01466395, 11.12786972, 11.24134752, 11.3552982, 11.46987889, 11.58520959, 11.70137143, 11.81842214, 11.93639129, 12.05529277, 12.17512305, 12.29587074, 12.41751102, 12.54001161, 12.66334091, 12.78746137, 12.91233523, 13.03792328, 13.16419231, 13.29110715, 13.41863676, 13.54675344, 13.67543322, 13.8046561, 13.93440617, 14.06467165, 14.19544485, 14.3267205, 14.45850147, 14.59079005, 14.7235931, 14.85692044, 14.99078448, 15.12519986, 15.26018306, 15.39575201, 15.53192567, 15.66872366, 15.80616582, 15.94427185, 16.08306098, 16.22255158, 16.36275897, 16.50370229, 16.64539409, 16.78784656, 16.93106986, 17.07507197, 17.21985864, 17.36543339, 17.51179749, 17.65894807, 17.80688538, 17.95560314, 18.10509471, 18.25535252, 18.4063661, 18.55812709, 18.71062426, 18.86384686, 19.01778428, 19.17242647, 19.32776424, 19.48378967, 19.64049642, 19.79787788, 19.95593574, 20.1146687, 20.27408001, 20.43417606, 20.59496663, 20.75646502, 20.91868832, 21.08165758, 21.24539741, 21.40993987, 21.57531575, 21.74156399, 21.90872739, 22.07685313, 22.24599293, 22.41620302, 22.58754414, 22.76008145, 22.93388449, 23.10902476, 23.28558367, 23.46364195, 23.6432856, 23.8246044, 24.00769173, 24.19264433, 24.37956211, 24.5685479, 24.75970717, 24.95314776, 25.14897956, 25.3473142, 25.54826471, 25.75194512, 25.95847011, 26.16795559, 26.38051177, 26.59626062, 26.81530934, 27.03777112, 27.26375553, 27.49336962, 27.72671746, 27.96389959, 28.20501252, 28.4501482, 28.69939347, 28.95282957, 29.21053153, 29.47256769, 29.73899917, 30.00987927, 30.28525305, 30.56515671, 30.84961718, 31.13865154, 31.43226571, 31.73045808, 32.03321196, 32.34050069, 32.6522856, 32.96851571, 33.28912731, 33.61404373, 33.94317499, 34.27641756, 34.61365176, 34.95474943, 35.29956396, 35.64793577, 35.99969112, 36.354642, 36.71258626, 37.07330766, 37.43657601, 37.80214741, 38.16976444, 38.53915657, 38.91004046, 39.28212045, 39.65508906, 40.02862762, 40.40240687, 40.77608405, 41.14932239, 41.52175462, 41.89302144, 42.26275389, 42.63057829, 42.99611758, 43.3589927, 43.71882106, 44.07523324, 44.42784452, 44.77628678, 45.1202019, 45.45922209, 45.79300591, 46.12121938, 46.4435428, 46.75967279, 47.06932426, 47.37223239, 47.66815456, 47.9568721, 48.23819204, 48.5119486, 48.77800463, 49.03625275, 49.28661635, 49.52905029, 49.76354136, 49.99010333, 50.2087994, 50.41970456, 50.62293176, 50.81862346, 51.00695001, 51.18810764, 51.36231608, 51.52981582, 51.69086489, 51.8457352, 51.99471665, 52.13808124, 52.27611902, 52.4091082, 52.53731392, 52.66097508, 52.78032448, 52.89553346, 53.00673755, 53.11401756, 53.21738885, 53.31678976, 53.41206904, 53.50297229, 53.58912711, 53.67002691, 53.74501298, 53.8132547, 53.87372737, 53.92518731, 53.96613658, 53.99481762, 54.00391729],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P3% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [79.91084447, 80.26037074, 81.0052937, 81.7341574, 82.44845648, 83.14944982, 83.83819399, 84.51558277, 85.18238019, 85.83925011, 86.48678276, 87.12551862, 87.75596799, 88.37863651, 88.93297086, 89.47916294, 90.01765704, 90.54890623, 91.07337426, 91.59152368, 92.10382052, 92.6107295, 93.11271174, 93.61022262, 94.10370972, 94.59361093, 95.08035263, 95.56434805, 96.04599748, 96.52567713, 97.00375833, 97.48058355, 97.95647862, 98.43174768, 98.90667254, 99.3815118, 99.85650001, 100.331847, 100.8077371, 101.2843288, 101.7617545, 102.2401199, 102.719504, 103.1999595, 103.6815122, 104.164162, 104.6478827, 105.1326221, 105.6183068, 106.1048359, 106.592087, 107.0799166, 107.5681606, 108.0566359, 108.5451423, 109.0334636, 109.5213695, 110.0086174, 110.4949545, 110.9801192, 111.4638437, 111.9458554, 112.4258796, 112.9036412, 113.3788664, 113.8512827, 114.3206308, 114.7866522, 115.2491001, 115.7077388, 116.1623461, 116.6127146, 117.0586529, 117.4999879, 117.9365657, 118.3682526, 118.794937, 119.2165297, 119.6329654, 120.0442031, 120.450227, 120.8510473, 121.2467001, 121.6372483, 122.0227817, 122.4034171, 122.7792983, 123.1505962, 123.5175084, 123.8802592, 124.2390993, 124.5943049, 124.9461775, 125.2950434, 125.6412524, 125.9851773, 126.3272131, 126.6677753, 127.0072991, 127.3462381, 127.6850624, 128.0242572, 128.3643208, 128.7057627, 129.0491015, 129.394862, 129.7435732, 130.095765, 130.4519655, 130.8126976, 131.1784756, 131.5498015, 131.9271616, 132.311022, 132.7018251, 133.0999854, 133.5058853, 133.9198714, 134.34225, 134.773284, 135.2131887, 135.6621289, 136.1202156, 136.5875035, 137.0639883, 137.5496052, 138.0442266, 138.5476617, 139.0596548, 139.5798855, 140.1079685, 140.6434536, 141.1858268, 141.7345116, 142.2888712, 142.8482077, 143.4117718, 143.9787585, 144.5483179, 145.1195552, 145.6915401, 146.2633119, 146.8338868, 147.4022657, 147.9674393, 148.5284089, 149.0841789, 149.6337753, 150.1762526, 150.7107013, 151.2362566, 151.7521046, 152.2574887, 152.7517151, 153.2341567, 153.7042563, 154.1615288, 154.6055622, 155.0360175, 155.452628, 155.8551976, 156.243598, 156.6177662, 156.9777005, 157.3234565, 157.6551432, 157.9729166, 158.2769793, 158.5675712, 158.8449655, 159.1094689, 159.3614112, 159.6011441, 159.8290369, 160.0454725, 160.2508441, 160.4455519, 160.6300005, 160.8045956, 160.9697424, 161.1258433, 161.2732955, 161.4124903, 161.5438112, 161.6676329, 161.7843202, 161.8942273, 161.9976976, 162.0950624, 162.1866414, 162.272742, 162.3536592, 162.429676, 162.501063, 162.5680787, 162.6309697, 162.689971, 162.7453061, 162.7971876, 162.8458172, 162.8913862, 162.9340759, 162.9740581, 163.0114951, 163.0465405, 163.0793392, 163.1100283, 163.1387368, 163.1655866, 163.1906925, 163.2141625, 163.2360985, 163.2565964, 163.2757461, 163.2936325, 163.3103353, 163.3259293, 163.3333326],
            spanGaps: false,
          }
          ,

          {
            yAxisID: 'y2',
            label: 'P5% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [10.64009004, 10.70051298, 10.81957536, 10.93681171, 11.05280067, 11.168034, 11.28292555, 11.3978197, 11.51299966, 11.62869248, 11.74507892, 11.86229971, 11.98045644, 12.09962308, 12.21984466, 12.34114672, 12.46353554, 12.5870056, 12.71153714, 12.83710098, 12.96366474, 13.09118938, 13.21963362, 13.34895376, 13.47910915, 13.61005739, 13.74175874, 13.87417598, 14.0072749, 14.14102471, 14.27539832, 14.41037252, 14.54592801, 14.68204842, 14.81872422, 14.95594682, 15.09371211, 15.23201937, 15.37087094, 15.51027205, 15.65023042, 15.79075599, 15.93186059, 16.07355758, 16.21586154, 16.35878793, 16.50235277, 16.64657235, 16.79146158, 16.93703875, 17.08331814, 17.23031439, 17.37804118, 17.52651109, 17.6757355, 17.82572453, 17.97648696, 18.12802886, 18.28035866, 18.4334803, 18.58739757, 18.74211363, 18.89762965, 19.05394835, 19.21107044, 19.36899699, 19.52772926, 19.68726895, 19.84761848, 20.00878127, 20.17076208, 20.33356558, 20.49720276, 20.66168259, 20.82701772, 20.9932234, 21.16031766, 21.32832161, 21.49725951, 21.66715902, 21.83805093, 22.00997207, 22.18295884, 22.35705429, 22.53230492, 22.70876108, 22.8864771, 23.06551129, 23.24592593, 23.42778723, 23.61116524, 23.79613202, 23.98276774, 24.17115246, 24.36137073, 24.55351042, 24.74766249, 24.94392079, 25.14238189, 25.34314479, 25.54631065, 25.75198256, 25.96026515, 26.17126436, 26.38508699, 26.60184044, 26.82163224, 27.0445704, 27.27075818, 27.50030694, 27.73331628, 27.96988937, 28.21012567, 28.45412164, 28.70197022, 28.95376036, 29.20957645, 29.46949781, 29.73359819, 30.00194519, 30.27459974, 30.55161562, 30.83303885, 31.11890724, 31.40924987, 31.70408654, 32.00342738, 32.30727227, 32.61560983, 32.92841993, 33.24566815, 33.56730937, 33.8932863, 34.22352911, 34.5579552, 34.8964689, 35.23896126, 35.58530989, 35.9353771, 36.28901539, 36.64606043, 37.00633501, 37.36964826, 37.73579576, 38.10455963, 38.47570882, 38.84899932, 39.22417451, 39.60096552, 39.97909172, 40.35826115, 40.73817116, 41.118509, 41.49895256, 41.8791711, 42.25882349, 42.63757221, 43.01505816, 43.39092788, 43.76482163, 44.13637714, 44.50523096, 44.87101979, 45.23337973, 45.59195858, 45.94639581, 46.29634576, 46.64147321, 46.98143987, 47.31593016, 47.64463827, 47.96727332, 48.2835611, 48.59324591, 48.89609218, 49.1918862, 49.4804377, 49.76158125, 50.03517772, 50.30111539, 50.55931105, 50.8097108, 51.05229071, 51.28705716, 51.51404335, 51.73332523, 51.94499451, 52.14917717, 52.34602709, 52.53572455, 52.71847428, 52.89450319, 53.06405769, 53.22740059, 53.38480749, 53.53656883, 53.68296205, 53.82427723, 53.96079321, 54.09277512, 54.22046291, 54.34408388, 54.46381004, 54.57977424, 54.69205355, 54.80065842, 54.90552089, 55.00648181, 55.10327703, 55.19552245, 55.28269761, 55.36412796, 55.43896526, 55.50616614, 55.56446839, 55.61235958, 55.64806673, 55.66071006],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P5% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [80.72977321, 81.08868489, 81.83445202, 82.56406112, 83.27898582, 83.98045262, 84.66948449, 85.3469433, 86.01356554, 86.66999332, 87.31680155, 87.95452162, 88.58366128, 89.20472611, 89.77301106, 90.33305814, 90.88532031, 91.43025486, 91.96832362, 92.4999858, 93.02569976, 93.54591978, 94.06109422, 94.57166376, 95.07805975, 95.58070273, 96.08000091, 96.57634888, 97.07012724, 97.56169654, 98.05140652, 98.53958366, 99.026537, 99.51255522, 99.99790605, 100.4828356, 100.9675675, 101.4523027, 101.9372185, 102.4224687, 102.908183, 103.3944666, 103.8814006, 104.3690418, 104.8574227, 105.3465519, 105.8364145, 106.3269721, 106.8181654, 107.3099116, 107.8021076, 108.2946307, 108.7873391, 109.2800738, 109.7726591, 110.2649049, 110.7566073, 111.247551, 111.7375104, 112.2262515, 112.7135338, 113.1991118, 113.6827373, 114.1641607, 114.6431334, 115.1194078, 115.5927447, 116.0629074, 116.5296686, 116.9928104, 117.4521263, 117.9074226, 118.3585201, 118.8052553, 119.2474816, 119.6850711, 120.1179149, 120.5459248, 120.9690339, 121.3871973, 121.8003934, 122.2086239, 122.6119145, 123.0103156, 123.4039024, 123.7927752, 124.1770596, 124.5569064, 124.9324922, 125.3040185, 125.6717122, 126.035825, 126.3966334, 126.7544381, 127.1095636, 127.4623576, 127.8131904, 128.1624542, 128.5105623, 128.857948, 129.2050634, 129.5523785, 129.9003795, 130.2495672, 130.6004555, 130.9535693, 131.309442, 131.6686134, 132.031627, 132.3990267, 132.771354, 133.1491442, 133.5329226, 133.9232006, 134.3204714, 134.7252055, 135.1378458, 135.5588028, 135.9884501, 136.4271185, 136.8750919, 137.3326017, 137.7998222, 138.2768661, 138.7637799, 139.2605402, 139.7670498, 140.2831346, 140.8085414, 141.3429356, 141.8859002, 142.4369354, 142.9954591, 143.5608087, 144.1322433, 144.7089466, 145.2900346, 145.8745579, 146.4615117, 147.0498421, 147.6384567, 148.226234, 148.8120346, 149.394712, 149.9731226, 150.5461431, 151.1126739, 151.6716544, 152.2220718, 152.7629701, 153.2934582, 153.8127163, 154.3200013, 154.814651, 155.2960861, 155.7638123, 156.2174196, 156.6565818, 157.0810539, 157.4906696, 157.8853369, 158.2650343, 158.6298055, 158.9797544, 159.31504, 159.6358703, 159.9424968, 160.2352102, 160.5143338, 160.7802183, 161.0332391, 161.2737894, 161.5022772, 161.7191211, 161.9247473, 162.1195857, 162.3040676, 162.4786229, 162.643678, 162.7996536, 162.9469636, 163.0860132, 163.2171976, 163.3409016, 163.4574984, 163.5673489, 163.6708019, 163.7681929, 163.8598446, 163.9460665, 164.027155, 164.1033935, 164.1750527, 164.2423904, 164.3056523, 164.365072, 164.4208714, 164.473261, 164.5224406, 164.5685992, 164.6119158, 164.6525596, 164.6906907, 164.72646, 164.7600102, 164.7914756, 164.8209832, 164.8486523, 164.8745955, 164.8989187, 164.9217215, 164.9430978, 164.9631357, 164.9819181, 164.9995229, 165.0160233, 165.031488, 165.0388523],
            spanGaps: false,
          }
          ,

          {
            yAxisID: 'y2',
            label: 'P10% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [11.05265567, 11.11490406, 11.23747341, 11.35805876, 11.47727994, 11.59566994, 11.7136834, 11.83170451, 11.95005435, 12.06899744, 12.18874828, 12.30947723, 12.43131521, 12.55435953, 12.67867752, 12.80431149, 12.93128204, 13.05959214, 13.18922941, 13.32016918, 13.45237788, 13.5858142, 13.72043155, 13.85617947, 13.99300607, 14.13085804, 14.26968247, 14.40942768, 14.55004391, 14.69148397, 14.83370375, 14.97666256, 15.12032345, 15.26465308, 15.40962296, 15.55520788, 15.70138696, 15.8481433, 15.9954639, 16.14333947, 16.29176433, 16.44073615, 16.59025577, 16.74032694, 16.8909561, 17.04215212, 17.19392605, 17.34629087, 17.49926081, 17.65285271, 17.80708353, 17.96197153, 18.11753578, 18.2737959, 18.43077195, 18.58848423, 18.74695318, 18.90619877, 19.06624222, 19.22710346, 19.38880264, 19.55135989, 19.71479476, 19.87912757, 20.044378, 20.21056603, 20.37771189, 20.54583618, 20.71496001, 20.88510518, 21.05629437, 21.22855059, 21.40189997, 21.57636833, 21.75198362, 21.92877558, 22.10677591, 22.28601843, 22.46653924, 22.64837687, 22.83157226, 23.01617007, 23.20221593, 23.38975956, 23.57885344, 23.769553, 23.96191672, 24.15600612, 24.35188577, 24.54962324, 24.74928911, 24.95095592, 25.15470129, 25.36060368, 25.56874466, 25.77920825, 25.99208072, 26.20745042, 26.42540754, 26.64604388, 26.86945259, 27.09572788, 27.32496472, 27.55725852, 27.79270478, 28.03139872, 28.27343489, 28.51890714, 28.76790586, 29.02052392, 29.27684696, 29.53696045, 29.80094595, 30.06888124, 30.34083979, 30.61689027, 30.89709604, 31.18151463, 31.47019723, 31.76318818, 32.06052445, 32.36223514, 32.66834099, 32.97885387, 33.29377635, 33.61310119, 33.93681092, 34.26487746, 34.59726137, 34.9339128, 35.27476898, 35.61975555, 35.96878581, 36.32176053, 36.67856768, 37.03908232, 37.40316649, 37.7706691, 38.14142532, 38.51525867, 38.89197851, 39.27138168, 39.65325233, 40.03736224, 40.42347105, 40.81132672, 41.20066588, 41.5912144, 41.98268787, 42.37479226, 42.76722456, 43.15967355, 43.55182054, 43.94334028, 44.33390178, 44.72316843, 45.1108035, 45.49646217, 45.87980164, 46.26047782, 46.63814737, 47.01246901, 47.3831047, 47.74972019, 48.11199053, 48.46959303, 48.82221709, 49.16956302, 49.51133821, 49.84726703, 50.17708708, 50.5005518, 50.81743186, 51.12751661, 51.43061537, 51.72655874, 52.01519982, 52.29641539, 52.57010692, 52.83620153, 53.09465275, 53.34544121, 53.58857507, 53.82409032, 54.05204939, 54.27254708, 54.48570012, 54.69165364, 54.89057819, 55.08266832, 55.26814081, 55.44723255, 55.62019799, 55.78730622, 55.94883747, 56.10508206, 56.25632509, 56.402856, 56.54495425, 56.68288493, 56.81689002, 56.94718918, 57.073957, 57.19732448, 57.31736613, 57.43408908, 57.54742113, 57.6571979, 57.7631489, 57.86488244, 57.96186944, 58.05342591, 58.13869414, 58.2166225, 58.28594368, 58.34514946, 58.39247268, 58.41104572],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P10% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [81.99171445, 82.36400989, 83.11387064, 83.84716151, 84.56534433, 85.26961974, 85.96098331, 86.64027154, 87.30820085, 87.96540055, 88.61244073, 89.24985581, 89.87816458, 90.49788649, 91.08607735, 91.66588835, 92.23778882, 92.80224597, 93.35972283, 93.91067749, 94.45556109, 94.99481672, 95.52887815, 96.05816868, 96.58310008, 97.1040715, 97.62146857, 98.13566246, 98.64700876, 99.15584797, 99.66250203, 100.1672766, 100.6704587, 101.1723164, 101.6730987, 102.1730346, 102.6723326, 103.171181, 103.6697469, 104.1681762, 104.6665937, 105.1651027, 105.6637849, 106.1627011, 106.6618905, 107.1613717, 107.6611426, 108.1611811, 108.6614449, 109.1618735, 109.6623876, 110.1628906, 110.6632694, 111.1633949, 111.6631239, 112.1622995, 112.6607528, 113.158304, 113.654764, 114.1499353, 114.6436141, 115.1355915, 115.625655, 116.1135904, 116.5991827, 117.0822191, 117.562488, 118.0397834, 118.5139049, 118.9846594, 119.4518627, 119.9153408, 120.3749315, 120.830485, 121.281866, 121.7289543, 122.1716458, 122.6098539, 123.04351, 123.4725646, 123.896988, 124.3167709, 124.7319249, 125.1424835, 125.5485022, 125.9500588, 126.3472542, 126.7402123, 127.1290805, 127.5140299, 127.8952551, 128.2729746, 128.6474311, 129.0188908, 129.3876441, 129.7540048, 130.1183106, 130.4809221, 130.8422234, 131.2026207, 131.5625423, 131.9224379, 132.2827776, 132.6440511, 133.0067661, 133.3714475, 133.738635, 134.1088817, 134.4827517, 134.8608171, 135.2436555, 135.6318463, 136.0259671, 136.4265892, 136.8342729, 137.2495627, 137.6729811, 138.1050231, 138.5461496, 138.9967803, 139.4572873, 139.9279871, 140.409134, 140.9009122, 141.403429, 141.9167079, 142.4406823, 142.9751899, 143.5199675, 144.0746481, 144.6387576, 145.2117144, 145.7928297, 146.3813098, 146.9762604, 147.576693, 148.1815319, 148.7896253, 149.3997554, 150.0106525, 150.6210083, 151.2294913, 151.8347622, 152.4354895, 153.0303654, 153.6181187, 154.1975312, 154.7674484, 155.3267913, 155.874565, 156.4098665, 156.9318906, 157.4399327, 157.9333914, 158.4117685, 158.8746672, 159.3217901, 159.7529343, 160.1679874, 160.5669211, 160.9497852, 161.3167006, 161.6678528, 162.0034846, 162.3238889, 162.6294022, 162.9203983, 163.1972811, 163.4604795, 163.7104424, 163.9476322, 164.1725219, 164.3855897, 164.5873165, 164.7781818, 164.9586613, 165.1292244, 165.2903324, 165.4424364, 165.5859761, 165.7213786, 165.8490577, 165.9694129, 166.0828291, 166.1896765, 166.29031, 166.3850695, 166.4742799, 166.5582511, 166.6372787, 166.7116437, 166.7816133, 166.8474411, 166.9093676, 166.9676208, 167.0224162, 167.0739579, 167.1224387, 167.1680405, 167.2109353, 167.251285, 167.2892424, 167.3249515, 167.3585477, 167.3901586, 167.4199044, 167.4478978, 167.4742452, 167.4990462, 167.5223947, 167.5443789, 167.5650814, 167.5845802, 167.602948, 167.6202536, 167.6365611, 167.6519311, 167.6592824],
            spanGaps: false,
          }
          ,

          {
            yAxisID: 'y2',
            label: 'P25% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [11.78597528, 11.85181666, 11.98141892, 12.10888759, 12.23490671, 12.36007175, 12.48489772, 12.60982671, 12.73523417, 12.86143776, 12.98869962, 13.11723187, 13.24720657, 13.37875374, 13.51197197, 13.64692711, 13.78365965, 13.92218431, 14.06249859, 14.2045836, 14.34840318, 14.49391163, 14.64105343, 14.78976688, 14.93998212, 15.0916281, 15.24463077, 15.39891519, 15.55440665, 15.71103166, 15.86871877, 16.0273993, 16.18700795, 16.34748412, 16.50876909, 16.670811, 16.83356209, 16.99697963, 17.16102601, 17.32566884, 17.49088098, 17.65664052, 17.82293074, 17.98974005, 18.15706188, 18.32489457, 18.49324122, 18.66210955, 18.83151262, 19.00146515, 19.17198834, 19.34310643, 19.51484724, 19.68724198, 19.86032494, 20.03413327, 20.20870673, 20.38408835, 20.56032091, 20.73745116, 20.9155269, 21.09459707, 21.2747126, 21.45592408, 21.63828396, 21.82184504, 22.00666068, 22.19278461, 22.38027095, 22.56917407, 22.75954858, 22.95145019, 23.14493249, 23.34005152, 23.53686295, 23.73542282, 23.93578761, 24.13801431, 24.34216053, 24.54828458, 24.7564457, 24.96670281, 25.17911785, 25.39375238, 25.61066925, 25.82993243, 26.05160708, 26.27575951, 26.50245719, 26.73176876, 26.96376399, 27.19851432, 27.43609072, 27.67656629, 27.92001453, 28.16650963, 28.41612623, 28.66893932, 28.92502395, 29.18445509, 29.44730733, 29.7136546, 29.98356997, 30.25712523, 30.53439065, 30.8154346, 31.1003232, 31.38911963, 31.6818858, 31.97867622, 32.27954601, 32.58454356, 32.89371309, 33.20709368, 33.52471882, 33.84661596, 34.17280606, 34.50330312, 34.83811379, 35.17723687, 35.52066292, 35.8683738, 36.22034231, 36.57653175, 36.9368956, 37.3013771, 37.669909, 38.04241318, 38.4188008, 38.79897039, 39.18281045, 39.57019714, 39.96099475, 40.35505561, 40.75222006, 41.15231646, 41.55516124, 41.96055897, 42.36830371, 42.77817554, 43.1899454, 43.6033728, 44.01820683, 44.43418656, 44.8510416, 45.26849262, 45.68625203, 46.10402466, 46.5215085, 46.93839552, 47.35437254, 47.76912213, 48.18232356, 48.59365384, 49.00278873, 49.40940563, 49.81317566, 50.21378283, 50.61090716, 51.0042348, 51.39345743, 51.77827341, 52.15838887, 52.53352018, 52.90338872, 53.26773454, 53.62630488, 53.97885832, 54.32517625, 54.66504759, 54.9982797, 55.32469696, 55.64414166, 55.95647478, 56.26157681, 56.55934839, 56.8497111, 57.13260799, 57.40800416, 57.67588728, 57.93626794, 58.18918, 58.43468077, 58.67285105, 58.90379742, 59.1276417, 59.3445374, 59.55465678, 59.75819326, 59.95536025, 60.1463897, 60.33153027, 60.51104512, 60.68520928, 60.85430662, 61.0186237, 61.17845532, 61.33408787, 61.48580086, 61.63385984, 61.77851223, 61.91996953, 62.05841733, 62.19399335, 62.32678127, 62.45680021, 62.58399337, 62.70821568, 62.8292204, 62.94664487, 63.0599953, 63.16863065, 63.27174585, 63.36835431, 63.45727001, 63.53709257, 63.6061772, 63.6361125],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P25% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [84.10289217, 84.49470553, 85.25887745, 86.0051731, 86.73506945, 87.44977223, 88.15028421, 88.83745411, 89.5120186, 90.17463683, 90.82591867, 91.46644774, 92.09680119, 92.71755946, 93.33440049, 93.94268367, 94.54291151, 95.1355744, 95.72114636, 96.30009195, 96.87286014, 97.43988586, 98.00158958, 98.55837705, 99.11063889, 99.65875031, 100.2030707, 100.7439435, 101.281694, 101.8166373, 102.3490611, 102.8792439, 103.4074438, 103.9339016, 104.4588401, 104.9824642, 105.5049607, 106.026498, 106.5472265, 107.0672782, 107.5867669, 108.1057886, 108.6244211, 109.1427246, 109.6607418, 110.1784984, 110.6960031, 111.2132492, 111.7302112, 112.2468516, 112.7631168, 113.2789389, 113.7942368, 114.3089166, 114.8228726, 115.335988, 115.8481358, 116.3591802, 116.8689769, 117.3773747, 117.8842164, 118.3893397, 118.8925788, 119.3937653, 119.8927292, 120.3893032, 120.8833137, 121.3745956, 121.8629855, 122.3483243, 122.8304588, 123.3092425, 123.784537, 124.2562127, 124.7241502, 125.1882412, 125.6483893, 126.1045113, 126.5565377, 127.0044134, 127.4480994, 127.8875724, 128.3228265, 128.7538732, 129.1807426, 129.6034839, 130.0221657, 130.436877, 130.8477278, 131.2548494, 131.6583952, 132.0585409, 132.4554857, 132.8494521, 133.2406866, 133.6294604, 134.0160697, 134.4008357, 134.7841054, 135.1662516, 135.5476732, 135.9287948, 136.3100669, 136.6919657, 137.0749922, 137.4596717, 137.8465525, 138.2362048, 138.6292185, 139.0262015, 139.4277761, 139.8345767, 140.2472448, 140.6664253, 141.0927603, 141.5268837, 141.9694138, 142.4209457, 142.8820429, 143.353228, 143.8349727, 144.3276874, 144.8317108, 145.3472981, 145.8746111, 146.4137069, 146.9645285, 147.5268957, 148.1004983, 148.6848902, 149.2794857, 149.8835591, 150.4962462, 151.1165487, 151.7433416, 152.3753859, 153.0113368, 153.6497654, 154.2891719, 154.9280091, 155.5647003, 156.1976616, 156.8253238, 157.4461523, 158.0586697, 158.6614636, 159.2532157, 159.8327068, 160.3988301, 160.9505985, 161.4871507, 162.0077536, 162.5118031, 162.9988222, 163.4684575, 163.9204738, 164.3547479, 164.7712603, 165.1700873, 165.5513919, 165.9154147, 166.2624644, 166.5929092, 166.9071674, 167.2056993, 167.4889986, 167.7575872, 168.012004, 168.2528029, 168.4805469, 168.6957988, 168.8991222, 169.0910747, 169.2722058, 169.4430536, 169.6041427, 169.7559826, 169.8990665, 170.0338694, 170.1608483, 170.280441, 170.3930664, 170.4991239, 170.5989941, 170.6930385, 170.7816002, 170.8650043, 170.9435584, 171.0175531, 171.0872629, 171.1529465, 171.2148477, 171.2731962, 171.3282079, 171.3800858, 171.4290208, 171.4751921, 171.5187679, 171.5599062, 171.598755, 171.6354533, 171.6701314, 171.7029114, 171.7339076, 171.7632274, 171.7909712, 171.8172333, 171.8421019, 171.8656596, 171.8879838, 171.9091473, 171.9292179, 171.9482593, 171.9663314, 171.9834901, 171.9997878, 172.0152737, 172.0227268],
            spanGaps: false,
          }
          ,

          {
            yAxisID: 'y2',
            label: 'P50% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [12.6707633, 12.74154396, 12.88102276, 13.01842382, 13.1544966, 13.28989667, 13.42519408, 13.56088113, 13.69737858, 13.83504622, 13.97418299, 14.1150324, 14.25779618, 14.40262749, 14.54964614, 14.69893326, 14.85054151, 15.00449143, 15.16078454, 15.31940246, 15.48030313, 15.64343309, 15.80872535, 15.97610456, 16.14548194, 16.31676727, 16.4898646, 16.66467529, 16.84109948, 17.01903746, 17.1983908, 17.37906341, 17.56096245, 17.74400082, 17.92809121, 18.11315625, 18.29912286, 18.48592413, 18.67349965, 18.86179576, 19.05076579, 19.24037019, 19.43057662, 19.62136007, 19.8127028, 20.0045944, 20.19703171, 20.39001872, 20.58356862, 20.77769565, 20.97242631, 21.16779192, 21.36383013, 21.56058467, 21.75810506, 21.95644627, 22.15566842, 22.35583862, 22.55702268, 22.75929558, 22.9627344, 23.16741888, 23.37343341, 23.58086145, 23.78979096, 24.00031064, 24.21251028, 24.42648043, 24.642312, 24.86009596, 25.07992303, 25.30188584, 25.52606977, 25.75256528, 25.9814599, 26.2128399, 26.44679027, 26.68339457, 26.92273494, 27.16489199, 27.40994539, 27.65796978, 27.90904433, 28.16324264, 28.42063744, 28.68130005, 28.94530029, 29.21270645, 29.48358527, 29.75800198, 30.03602021, 30.31770417, 30.60311107, 30.89230072, 31.18532984, 31.48225315, 31.78312329, 32.08799062, 32.39690313, 32.7099062, 33.02704244, 33.34835148, 33.67386973, 34.00363017, 34.33766207, 34.67599076, 35.01863732, 35.36561737, 35.71694723, 36.07262569, 36.43265996, 36.79704392, 37.1657671, 37.53881268, 37.91615721, 38.2977703, 38.6836143, 39.07364401, 39.46780643, 39.86604044, 40.26827652, 40.67443658, 41.08443363, 41.49817164, 41.91554528, 42.33643978, 42.76073078, 43.18828419, 43.61895703, 44.0525931, 44.48903027, 44.92809483, 45.36960315, 45.81336172, 46.25916729, 46.70680701, 47.15605863, 47.60669074, 48.05846572, 48.51113138, 48.96443224, 49.41810374, 49.87187409, 50.32546478, 50.77859121, 51.23096332, 51.68228625, 52.13226113, 52.58058583, 53.02695588, 53.47106525, 53.91260737, 54.35127608, 54.78676659, 55.21877657, 55.64701131, 56.07116407, 56.49095862, 56.90610886, 57.31634059, 57.72138846, 58.12099696, 58.51492143, 58.90293208, 59.28479948, 59.66032626, 60.02931704, 60.39158721, 60.74698785, 61.09536847, 61.43660077, 61.77057372, 62.09719399, 62.41638628, 62.72809362, 63.03227756, 63.32891841, 63.61801537, 63.89958662, 64.17366943, 64.44032016, 64.69961427, 64.95164625, 65.1965295, 65.43440186, 65.66540015, 65.88970117, 66.10749114, 66.31897311, 66.52436618, 66.72390443, 66.91783563, 67.10641956, 67.28992603, 67.46863255, 67.64281378, 67.8127675, 67.97877331, 68.14111022, 68.30004741, 68.4558454, 68.60872174, 68.75889263, 68.90653028, 69.05176427, 69.19467288, 69.33527376, 69.47351373, 69.60925782, 69.74227758, 69.87223885, 69.99868896, 70.12104381, 70.23857482, 70.35039626, 70.45546105, 70.55252127, 70.59761453],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P50% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [86.45220101, 86.86160934, 87.65247282, 88.42326434, 89.17549228, 89.91040853, 90.62907762, 91.33242379, 92.02127167, 92.69637946, 93.35846546, 94.00822923, 94.64636981, 95.27359106, 95.91474929, 96.54734328, 97.17191309, 97.78897727, 98.3990283, 99.00254338, 99.599977, 100.191764, 100.7783198, 101.3600411, 101.9373058, 102.5104735, 103.0798852, 103.645864, 104.208713, 104.7687256, 105.3261638, 105.8812823, 106.4343146, 106.9854769, 107.534968, 108.0829695, 108.6296457, 109.1751441, 109.7195954, 110.2631136, 110.8057967, 111.3477265, 111.8889694, 112.4295761, 112.9695827, 113.5090108, 114.0478678, 114.5861486, 115.1238315, 115.6608862, 116.1972691, 116.732925, 117.2677879, 117.8017819, 118.3348215, 118.8668123, 119.397652, 119.9272309, 120.455433, 120.9821362, 121.5072136, 122.0305342, 122.5519634, 123.0713645, 123.588599, 124.1035312, 124.6160161, 125.1259182, 125.6331012, 126.1374319, 126.6387804, 127.1370217, 127.6320362, 128.1237104, 128.6119383, 129.096622, 129.5776723, 130.0550101, 130.5285669, 130.9982857, 131.4641218, 131.9260439, 132.3840348, 132.838092, 133.2882291, 133.7344759, 134.1768801, 134.6155076, 135.0504433, 135.4817925, 135.9096813, 136.3342577, 136.7556923, 137.1741794, 137.5899378, 138.0032114, 138.4142703, 138.8234114, 139.2309592, 139.6372663, 140.042714, 140.4477127, 140.8527022, 141.2581515, 141.6645592, 142.072452, 142.4823852, 142.8949403, 143.3107241, 143.7303663, 144.1545167, 144.5838414, 145.0190192, 145.4607359, 145.9096784, 146.3665278, 146.8319513, 147.3065929, 147.7910635, 148.2859294, 148.7917006, 149.3088178, 149.8376391, 150.3784267, 150.9313331, 151.4963887, 152.0734897, 152.6623878, 153.2626819, 153.8738124, 154.495058, 155.1255365, 155.7642086, 156.4098858, 157.0612415, 157.7168289, 158.3750929, 159.034399, 159.6930501, 160.3493168, 161.0014586, 161.6477515, 162.2865119, 162.9161202, 163.535045, 164.1418486, 164.7352199, 165.3139755, 165.8770715, 166.4236087, 166.9528354, 167.4641466, 167.9570814, 168.4313175, 168.8866644, 169.3230548, 169.7405351, 170.139255, 170.5194567, 170.881464, 171.2256717, 171.5525345, 171.8625576, 172.1562865, 172.4342983, 172.6971935, 172.9455898, 173.180112, 173.4013896, 173.6100518, 173.8067179, 173.9919998, 174.1664951, 174.3307855, 174.4854344, 174.6309856, 174.7679617, 174.8968634, 175.0181691, 175.1323345, 175.2397926, 175.340954, 175.4362071, 175.5259191, 175.6104358, 175.690083, 175.7651671, 175.8359757, 175.9027788, 175.9658293, 176.0253641, 176.081605, 176.1347593, 176.1850208, 176.2325707, 176.2775781, 176.3202008, 176.3605864, 176.3988725, 176.4351874, 176.469651, 176.5023751, 176.533464, 176.5630153, 176.5911197, 176.6178621, 176.6433219, 176.6675729, 176.6906844, 176.712721, 176.733743, 176.753807, 176.7729657, 176.7912687, 176.8087622, 176.8254895, 176.8414914, 176.8492322],
            spanGaps: false,
          }
          ,

          {
            yAxisID: 'y2',
            label: 'P75% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [13.63691949, 13.71386029, 13.86589625, 14.0162298, 14.1656725, 14.31493214, 14.46462206, 14.61526973, 14.76732387, 14.9211657, 15.07711012, 15.23541179, 15.3962791, 15.5598683, 15.72629889, 15.89564892, 16.06796532, 16.24326063, 16.4215262, 16.60273167, 16.78682117, 16.97372594, 17.16336229, 17.3556371, 17.55044259, 17.74766896, 17.94720007, 18.14891672, 18.35269841, 18.55842485, 18.76597736, 18.9752401, 19.18610119, 19.39845556, 19.61219848, 19.82723683, 20.04348292, 20.26085668, 20.47928605, 20.69870731, 20.9190654, 21.14031403, 21.36241588, 21.58534268, 21.80907518, 22.03360322, 22.25892561, 22.48505007, 22.71199557, 22.93978291, 23.16844769, 23.39803173, 23.62858485, 23.86016456, 24.09283575, 24.32667035, 24.56174697, 24.79815314, 25.03597537, 25.27531174, 25.51626345, 25.75893543, 26.00343881, 26.24988395, 26.49838713, 26.74906587, 27.00203925, 27.25742737, 27.51535075, 27.77592982, 28.03928438, 28.30553622, 28.57479705, 28.84718437, 29.12281085, 29.40178631, 29.68421748, 29.97020767, 30.25985653, 30.5532598, 30.85050986, 31.15169009, 31.45688766, 31.76617973, 32.07963965, 32.39733625, 32.71933351, 33.04569055, 33.37646157, 33.7116958, 34.05143747, 34.39572894, 34.74459982, 35.09808092, 35.45619608, 35.81896391, 36.18639776, 36.55850564, 36.9352902, 37.31674867, 37.70287276, 38.09364865, 38.48905687, 38.88907228, 39.29366396, 39.70279517, 40.11642323, 40.53449819, 40.95697152, 41.38377162, 41.81483955, 42.25009969, 42.68947235, 43.13287143, 43.58020437, 44.03137211, 44.48626901, 44.94478284, 45.40679475, 45.8721792, 46.34080401, 46.81253029, 47.28721249, 47.76469837, 48.24482905, 48.72743903, 49.21235624, 49.6994021, 50.1883928, 50.67913392, 51.17142989, 51.66507694, 52.15986523, 52.65557906, 53.15199704, 53.64889226, 54.14603254, 54.64318067, 55.14009784, 55.63653354, 56.13223889, 56.62695959, 57.12043787, 57.61241293, 58.10262135, 58.59079757, 59.07667438, 59.55998349, 60.04045606, 60.51782332, 60.99181722, 61.4621711, 61.92862037, 62.3909033, 62.84876169, 63.30194659, 63.75019486, 64.19327833, 64.63095632, 65.06300059, 65.48919135, 65.90931806, 66.32318017, 66.73059164, 67.13136309, 67.52533948, 67.91236375, 68.29228717, 68.66499835, 69.03037911, 69.38833214, 69.73877506, 70.08164061, 70.41687682, 70.74444713, 71.06433046, 71.3765212, 71.68102918, 71.97787966, 72.26711325, 72.54878582, 72.82296841, 73.08974718, 73.34922324, 73.60151968, 73.84675041, 74.08507097, 74.31664141, 74.54163604, 74.76024322, 74.97266503, 75.17911684, 75.37982657, 75.57503388, 75.76498909, 75.94994171, 76.13017744, 76.30596623, 76.47758936, 76.64533092, 76.80948323, 76.97030781, 77.12809294, 77.28310484, 77.43559533, 77.58579719, 77.73391919, 77.88014066, 78.02460556, 78.16741625, 78.30862691, 78.44823694, 78.58618425, 78.72233893, 78.85649725, 78.98838596, 79.11762417, 79.18111482],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P75% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [88.80524943, 89.22804829, 90.05675457, 90.8626041, 91.64711353, 92.41159029, 93.15718995, 93.88495599, 94.59585394, 95.29079906, 95.97067824, 96.63636727, 97.28874542, 97.92869928, 98.58524582, 99.23357783, 99.87425862, 100.5078239, 101.1347788, 101.7556073, 102.370767, 102.9806917, 103.5857927, 104.186459, 104.7830584, 105.3759377, 105.9654232, 106.5518212, 107.1354171, 107.7164829, 108.2952617, 108.8719858, 109.4468665, 110.0200973, 110.5918541, 111.1622955, 111.731563, 112.2997816, 112.86706, 113.4334909, 113.9991516, 114.5641044, 115.128397, 115.6920629, 116.2551221, 116.8175812, 117.3794345, 117.9406648, 118.5012409, 119.0611237, 119.6202624, 120.1785968, 120.7360574, 121.2925663, 121.8480376, 122.4023786, 122.9554895, 123.5072652, 124.057595, 124.6063638, 125.1534527, 125.6987395, 126.2420996, 126.7834065, 127.3225327, 127.8593529, 128.393735, 128.9255543, 129.4546858, 129.9810071, 130.504399, 131.024746, 131.5419375, 132.0558684, 132.5664397, 133.0735595, 133.5771438, 134.0771172, 134.5734138, 135.065978, 135.5547656, 136.0397444, 136.5208952, 136.9982129, 137.4717069, 137.9414029, 138.4073433, 138.8695881, 139.3282163, 139.7833266, 140.2350389, 140.6834944, 141.1288576, 141.5713168, 142.011085, 142.4484014, 142.8835317, 143.3167691, 143.7484354, 144.1788815, 144.6084877, 145.0376645, 145.4668527, 145.8965233, 146.3271773, 146.7593449, 147.1935849, 147.630483, 148.07065, 148.5147188, 148.9633421, 149.4171874, 149.876933, 150.3432618, 150.8168546, 151.2983826, 151.7884983, 152.2878255, 152.7969484, 153.3163996, 153.8466466, 154.3880792, 154.9409947, 155.505584, 156.0819181, 156.6699351, 157.2694285, 157.8800378, 158.5012409, 159.1323501, 159.7725112, 160.4207062, 161.0757603, 161.7363527, 162.4010311, 163.0682321, 163.7362982, 164.4035075, 165.0680948, 165.7282823, 166.3823042, 167.0284338, 167.6650085, 168.2904522, 168.9032981, 169.5021963, 170.0859388, 170.6534628, 171.2038574, 171.7363673, 172.2503918, 172.7454817, 173.2213335, 173.6777819, 174.1147899, 174.5324388, 174.9309165, 175.310506, 175.6715733, 176.0145556, 176.3399504, 176.648304, 176.9402021, 177.2162598, 177.4771134, 177.7234122, 177.9558135, 178.174973, 178.381543, 178.5761676, 178.7594756, 178.9320817, 179.0945815, 179.2475503, 179.3915415, 179.5270853, 179.6546885, 179.7748338, 179.8879797, 179.9945609, 180.0949883, 180.1896498, 180.278911, 180.3631154, 180.4425858, 180.5176249, 180.5885165, 180.6555257, 180.7189006, 180.7788732, 180.8356596, 180.8894616, 180.9404676, 180.9888527, 181.0347806, 181.0784033, 181.1198626, 181.1592906, 181.1968103, 181.232536, 181.2665744, 181.2990249, 181.3299799, 181.3595256, 181.3877426, 181.4147056, 181.4404846, 181.4651449, 181.4887473, 181.5113488, 181.5330026, 181.5537583, 181.5736625, 181.5927588, 181.6110879, 181.6286882, 181.6455954, 181.6537998],
            spanGaps: false,
          }
          ,

          {
            yAxisID: 'y2',
            label: 'P90% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [14.58339799, 14.6671577, 14.83331632, 14.99847794, 15.16351231, 15.32917196, 15.49610261, 15.66485286, 15.83588309, 16.00957526, 16.18623907, 16.36611917, 16.54940494, 16.73623287, 16.92669619, 17.12084685, 17.31870281, 17.52024974, 17.72544898, 17.93423997, 18.14654091, 18.36225594, 18.58127627, 18.80348418, 19.02875229, 19.25695041, 19.48794495, 19.72160147, 19.95778649, 20.19636905, 20.43722215, 20.68022399, 20.92525904, 21.17221993, 21.42100482, 21.67152294, 21.92369204, 22.17743954, 22.43270288, 22.6894297, 22.94757799, 23.20711615, 23.46802293, 23.73028735, 23.99390857, 24.25889565, 24.52526733, 24.79305175, 25.06228739, 25.33301794, 25.60529875, 25.87919213, 26.15476795, 26.43210324, 26.71128177, 26.99239357, 27.27553447, 27.56080718, 27.84831538, 28.13817063, 28.43048732, 28.72538282, 29.02297867, 29.32339625, 29.62676053, 29.93319702, 30.24283177, 30.55579074, 30.87219924, 31.19218135, 31.51585929, 31.8433549, 32.17478161, 32.51025437, 32.84988252, 33.19377093, 33.54201944, 33.8947225, 34.25196875, 34.61384061, 34.98041447, 35.35175676, 35.72793225, 36.10899472, 36.49499102, 36.8859604, 37.28193426, 37.68293608, 38.08898133, 38.50007744, 38.9162238, 39.33741401, 39.76362815, 40.19484291, 40.63102576, 41.07213642, 41.51812687, 41.96894158, 42.42451755, 42.88478457, 43.34966531, 43.81907554, 44.29292431, 44.77111415, 45.2535413, 45.74009589, 46.23066219, 46.72511793, 47.22334049, 47.72519072, 48.23053714, 48.73923662, 49.25114312, 49.76610635, 50.28397203, 50.80458216, 51.32777521, 51.85338637, 52.38124777, 52.91118868, 53.44303574, 53.97661318, 54.51174297, 55.04824506, 55.58593751, 56.1246367, 56.66415748, 57.20431332, 57.74491716, 58.2857783, 58.82670813, 59.36751587, 59.90801, 60.44799828, 60.98728788, 61.52568545, 62.06299719, 62.59902894, 63.13358794, 63.66647721, 64.19750276, 64.72646954, 65.25318239, 65.77744608, 66.29906539, 66.81784516, 67.33359031, 67.846106, 68.35519765, 68.86067105, 69.36233252, 69.85998897, 70.35344811, 70.8425186, 71.32701026, 71.80673678, 72.2815034, 72.75113236, 73.21543801, 73.6742397, 74.12735965, 74.57462329, 75.01585966, 75.45090384, 75.87958721, 76.30175821, 76.71726244, 77.12594864, 77.5276843, 77.92233231, 78.30976593, 78.68986591, 79.0625209, 79.42762779, 79.78509216, 80.13482859, 80.47676112, 80.81082354, 81.1369598, 81.45512442, 81.76528289, 82.06741212, 82.3615009, 82.64755047, 82.92557908, 83.19560496, 83.45767612, 83.71184998, 83.95819995, 84.19681638, 84.42780754, 84.6513007, 84.86744322, 85.07640364, 85.27837286, 85.47355853, 85.66221241, 85.84459728, 86.02100855, 86.1917714, 86.35724712, 86.51781277, 86.6739, 86.82596904, 86.97451776, 87.12008338, 87.26324432, 87.40462203, 87.54488282, 87.6847398, 87.82495478, 87.96634036, 88.10976202, 88.25614046, 88.40645399, 88.56174643, 88.72311137, 88.80643527],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P90% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [90.92619137, 91.35753004, 92.22966054, 93.07608163, 93.89827114, 94.69757027, 95.47522083, 96.23239427, 96.97021533, 97.68978097, 98.39217521, 99.0784807, 99.74978771, 100.4071992, 101.0690065, 101.7233762, 102.3708617, 103.011988, 103.6472524, 104.2771267, 104.9020571, 105.5224653, 106.1387493, 106.7512837, 107.3604207, 107.9664906, 108.569802, 109.1706428, 109.76928, 110.3659614, 110.9609139, 111.5543461, 112.1464475, 112.7373894, 113.327325, 113.9163901, 114.5047033, 115.0923665, 115.6794655, 116.2660704, 116.8522359, 117.4380018, 118.0233939, 118.6084238, 119.1930903, 119.777379, 120.3612638, 120.9447067, 121.5276587, 122.1100607, 122.6918435, 123.272929, 123.8532304, 124.4326533, 125.0110959, 125.5884499, 126.1646012, 126.7394306, 127.3128143, 127.8846249, 128.4547316, 129.0230015, 129.5892999, 130.153491, 130.7154389, 131.2750083, 131.8320643, 132.3864745, 132.9381089, 133.4868407, 134.0325473, 134.5751108, 135.1144188, 135.6503652, 136.1828511, 136.7117853, 137.2370854, 137.7586784, 138.2765017, 138.7905039, 139.3006456, 139.8069003, 140.3092555, 140.8077133, 141.3022916, 141.793025, 142.2799654, 142.7631838, 143.2427702, 143.7188356, 144.1915122, 144.6609548, 145.1273417, 145.5908755, 146.0517839, 146.510321, 146.9667676, 147.421432, 147.8746507, 148.326789, 148.7782409, 149.2294296, 149.6808068, 150.1328531, 150.5860767, 151.0410123, 151.4982199, 151.9582822, 152.4218027, 152.8894016, 153.3617127, 153.839378, 154.3230425, 154.8133474, 155.3109233, 155.8163811, 156.3303034, 156.8532337, 157.3856659, 157.9280318, 158.4806894, 159.0439098, 159.6178646, 160.2026132, 160.7980913, 161.4041, 162.0202967, 162.6461885, 163.2811271, 163.9243081, 164.5747721, 165.2314109, 165.892976, 166.5580917, 167.2252714, 167.8929368, 168.5594402, 169.2230883, 169.8821678, 170.5349712, 171.1798224, 171.8151013, 172.4392666, 173.0508762, 173.6486051, 174.2312589, 174.7977852, 175.347281, 175.8789961, 176.392334, 176.8868489, 177.3622413, 177.8183499, 178.2551431, 178.6727081, 179.0712394, 179.4510272, 179.8124447, 180.1559363, 180.4820061, 180.791206, 181.0841263, 181.3613851, 181.6236202, 181.871481, 182.1056218, 182.3266957, 182.5353493, 182.7322187, 182.9179257, 183.093075, 183.2582518, 183.4140202, 183.5609217, 183.6994748, 183.8301738, 183.9534894, 184.0698683, 184.1797333, 184.2834844, 184.3814989, 184.4741322, 184.5617185, 184.644572, 184.7229873, 184.7972407, 184.867591, 184.9342803, 184.9975349, 185.0575666, 185.114573, 185.1687386, 185.2202359, 185.2692255, 185.3158575, 185.3602719, 185.4025992, 185.4429613, 185.4814718, 185.5182368, 185.5533551, 185.5869193, 185.6190155, 185.6497244, 185.6791212, 185.7072763, 185.7342556, 185.7601205, 185.7849287, 185.8087343, 185.8315877, 185.8535364, 185.874625, 185.8948951, 185.914386, 185.9331347, 185.9511757, 185.9599411],
            spanGaps: false,
          }
          ,

          {
            yAxisID: 'y2',
            label: 'P95% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [15.18777349, 15.27629562, 15.45242405, 15.62818936, 15.80450043, 15.98213866, 16.16176896, 16.34395025, 16.52914562, 16.71773017, 16.91000204, 17.10619066, 17.30646132, 17.51092666, 17.7196494, 17.93265202, 18.14992024, 18.37141087, 18.59705318, 18.8267549, 19.06040859, 19.29789203, 19.53907323, 19.78381251, 20.03196776, 20.28339348, 20.53794512, 20.79548054, 21.05586181, 21.31895671, 21.58464011, 21.85279508, 22.12331387, 22.3960982, 22.67106204, 22.94812899, 23.22723469, 23.50832656, 23.79136391, 24.07631802, 24.36317198, 24.65192058, 24.94257, 25.23513755, 25.52965118, 25.82614911, 26.12467926, 26.42529873, 26.72807261, 27.03307565, 27.34038832, 27.6500983, 27.96229925, 28.27709021, 28.59457486, 28.91486092, 29.23805946, 29.56428369, 29.89365038, 30.2262764, 30.56227989, 30.90177938, 31.24489263, 31.59173734, 31.94242919, 32.29708214, 32.65580771, 33.01871449, 33.38590769, 33.75748861, 34.13355425, 34.51419632, 34.89950266, 35.28955426, 35.68442647, 36.08418823, 36.48890176, 36.89862215, 37.31339712, 37.73326669, 38.15826287, 38.5884101, 39.02372343, 39.46421007, 39.90986854, 40.36068858, 40.81665117, 41.27772848, 41.74388392, 42.21507216, 42.69123922, 43.17232241, 43.65825106, 44.14894598, 44.64432008, 45.1442785, 45.64871885, 46.15753154, 46.67060006, 47.18780128, 47.70900582, 48.23407839, 48.76287816, 49.29525914, 49.83107058, 50.37015732, 50.91236024, 51.45751679, 52.00546039, 52.55602363, 53.10903452, 53.66432034, 54.22170647, 54.7810171, 55.34207557, 55.90470472, 56.46872726, 57.03396609, 57.6002446, 58.167387, 58.73521857, 59.30356596, 59.87225739, 60.44112289, 61.00999451, 61.5787065, 62.14709543, 62.71500036, 63.28226272, 63.84872734, 64.41424088, 64.97865313, 65.54181664, 66.1035867, 66.66382131, 67.22238111, 67.77912926, 68.33393136, 68.88665453, 69.43716965, 69.98534819, 70.53106367, 71.07419108, 71.6146066, 72.15218736, 72.68681109, 73.21835588, 73.7466998, 74.27172061, 74.79329538, 75.31130018, 75.82560968, 76.33609688, 76.84263269, 77.34508562, 77.84332029, 78.33720309, 78.82658994, 79.31133801, 79.79129954, 80.26632286, 80.73625224, 81.20092786, 81.66018503, 82.11385795, 82.56177239, 83.00375329, 83.43962339, 83.8691966, 84.29228904, 84.70871297, 85.1182789, 85.52079616, 85.91607365, 86.30392061, 86.68414749, 87.0565669, 87.42099463, 87.77725073, 88.12516072, 88.46455683, 88.79527942, 89.11717836, 89.43011463, 89.73396054, 90.02860798, 90.31395969, 90.58993909, 90.85649043, 91.11358115, 91.36120451, 91.59938232, 91.82816795, 92.04764958, 92.25795363, 92.4592488, 92.65174946, 92.83571985, 93.0114792, 93.17940638, 93.33994398, 93.49360895, 93.64099003, 93.7827601, 93.91968135, 94.05261232, 94.18251529, 94.31046411, 94.43765234, 94.56540179, 94.69517136, 94.82856611, 94.96734651, 95.11343784, 95.26893942, 95.43613181, 95.61749303, 95.71431427],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P95% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [92.19687928, 92.63176749, 93.53406648, 94.40884914, 95.25754106, 96.08148848, 96.88197981, 97.66026663, 98.4175791, 99.15513792, 99.87416352, 100.5758831, 101.2615351, 101.9323762, 102.5930445, 103.2470198, 103.8948257, 104.5369608, 105.1739016, 105.8060983, 106.4339786, 107.0579468, 107.6783842, 108.2956497, 108.9100797, 109.5219891, 110.1316713, 110.7393989, 111.3454248, 111.9499779, 112.5532737, 113.1555037, 113.7568423, 114.3574452, 114.9574502, 115.5569776, 116.1561304, 116.7549954, 117.3536426, 117.9521268, 118.5504872, 119.1487482, 119.7469201, 120.3449993, 120.9429688, 121.540799, 122.1384479, 122.7358617, 123.3329768, 123.9297176, 124.5259991, 125.1217272, 125.7167992, 126.3111047, 126.9045258, 127.4969382, 128.0882119, 128.6782115, 129.2667977, 129.8538272, 130.4391542, 131.0226304, 131.6041067, 132.183433, 132.7604599, 133.335037, 133.9070206, 134.4762655, 135.0426312, 135.6059815, 136.1661852, 136.7231173, 137.2766592, 137.8267001, 138.3731376, 138.9158785, 139.4548395, 139.9899485, 140.5211451, 141.0483813, 141.5716229, 142.0908498, 142.6060571, 143.1172562, 143.6244753, 144.1277605, 144.6271767, 145.1228083, 145.6147602, 146.103159, 146.5881531, 147.0699143, 147.5486382, 148.0245452, 148.4978811, 148.9689178, 149.4379538, 149.9053151, 150.3713549, 150.8364543, 151.3010223, 151.7654951, 152.2303363, 152.6960355, 153.1631074, 153.6320904, 154.103544, 154.5780465, 155.0561919, 155.5385858, 156.0258407, 156.5185711, 157.0173867, 157.522886, 158.0356481, 158.5562242, 159.085128, 159.622826, 160.1697263, 160.7261679, 161.2924091, 161.8686162, 162.4548526, 163.0510679, 163.657089, 164.2726114, 164.897193, 165.5302497, 166.1710534, 166.8187329, 167.4722776, 168.1305444, 168.7922681, 169.4560742, 170.1204959, 170.7839909, 171.444966, 172.1017957, 172.7528491, 173.3965112, 174.0312083, 174.6554295, 175.2677481, 175.8668393, 176.4514947, 177.0206409, 177.5733406, 178.1088034, 178.6263873, 179.1255987, 179.6060885, 180.0676464, 180.5101936, 180.9337725, 181.3385364, 181.7247376, 182.0927156, 182.4428851, 182.7757235, 183.09176, 183.3915648, 183.6757386, 183.9449038, 184.1996965, 184.4407585, 184.6687321, 184.8842531, 185.0879485, 185.2804307, 185.4622948, 185.6341183, 185.7964565, 185.949843, 186.0947883, 186.2317794, 186.3612801, 186.4837302, 186.5995468, 186.7091242, 186.8128348, 186.9110296, 187.0040394, 187.0921753, 187.1757295, 187.2549767, 187.3301745, 187.4015645, 187.4693732, 187.5338128, 187.5950821, 187.6533672, 187.7088422, 187.7616702, 187.8120038, 187.8599859, 187.9057499, 187.9494211, 187.9911165, 188.0309455, 188.0690108, 188.1054085, 188.1402284, 188.1735549, 188.2054669, 188.2360386, 188.2653392, 188.293434, 188.3203841, 188.3462469, 188.3710763, 188.394923, 188.4178347, 188.4398562, 188.4610297, 188.481395, 188.5009894, 188.5198484, 188.5290125],
            spanGaps: false,
          }
          ,

          {
            yAxisID: 'y2',
            label: 'P97% Weight',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(225,0,0,0.4)',
            borderColor: 'red', // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'black',
            pointBackgroundColor: 'white',
            pointBorderWidth: 0.5,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'yellow',
            pointHoverBorderColor: 'brown',
            pointHoverBorderWidth: 2,
            pointRadius: 0.5,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: true
            data: [15.59648294, 15.68840631, 15.87169941, 16.05514188, 16.23967114, 16.42608957, 16.61507584, 16.80719583, 17.00291386, 17.2025984, 17.40653734, 17.61494698, 17.8279717, 18.04570363, 18.26817893, 18.49539445, 18.72730763, 18.96385009, 19.20492292, 19.45040584, 19.70016918, 19.95406774, 20.21194963, 20.47365655, 20.73903469, 21.00792648, 21.28017953, 21.55564717, 21.83419011, 22.11567799, 22.39999059, 22.68701888, 22.97666583, 23.26884512, 23.56348925, 23.86053886, 24.15995003, 24.46169255, 24.76574995, 25.07211926, 25.38081076, 25.69184758, 26.00526525, 26.32111112, 26.63944376, 26.96033222, 27.28385531, 27.6101008, 27.93916194, 28.27114631, 28.60616106, 28.94432077, 29.2857444, 29.63055429, 29.97887524, 30.33083356, 30.68655618, 31.04616685, 31.40979543, 31.77756321, 32.14959054, 32.52599493, 32.90688716, 33.29237745, 33.68256717, 34.07755271, 34.47742403, 34.88226421, 35.2921491, 35.707147, 36.12731836, 36.55271218, 36.98337837, 37.41934991, 37.86065382, 38.30730842, 38.75932329, 39.21669915, 39.67942783, 40.14749235, 40.62086606, 41.09951874, 41.58340237, 42.07246636, 42.56665066, 43.06588662, 43.57009739, 44.07919809, 44.59309597, 45.11169064, 45.63487433, 46.16252884, 46.69453697, 47.23076853, 47.77108893, 48.31535768, 48.86342877, 49.41515104, 49.97036852, 50.52892088, 51.09064381, 51.65536941, 52.22292668, 52.79314187, 53.36583897, 53.94084012, 54.51796605, 55.09703793, 55.67786843, 56.26028801, 56.84410756, 57.42914961, 58.01523548, 58.60218796, 59.18983178, 59.77799389, 60.36650388, 60.95519425, 61.54390076, 62.13246268, 62.72072311, 63.30852916, 63.89573222, 64.48218816, 65.06775743, 65.65230527, 66.23570179, 66.81782206, 67.39854494, 67.97775861, 68.5553511, 69.13121752, 69.70525793, 70.27737718, 70.8474848, 71.41549477, 71.98132532, 72.54489869, 73.10613746, 73.66497514, 74.22134215, 74.77517319, 75.32640513, 75.87497649, 76.42082697, 76.96389688, 77.50412655, 78.04145573, 78.57582294, 79.10716478, 79.63541524, 80.16050495, 80.68236046, 81.20090348, 81.71605007, 82.22770492, 82.73578555, 83.24017154, 83.74075385, 84.23740907, 84.73000377, 85.21839391, 85.70242429, 86.18192445, 86.65672655, 87.12662858, 87.59143077, 88.05092631, 88.50487158, 88.95303286, 89.39515827, 89.83098491, 90.26023965, 90.68264001, 91.09789536, 91.50570814, 91.90577541, 92.29779046, 92.6814447, 93.05642962, 93.42243904, 93.77917145, 94.12633257, 94.46363806, 94.79080897, 95.10760779, 95.41378755, 95.70913474, 95.99346235, 96.26661385, 96.52846743, 96.77894046, 97.01799447, 97.24564034, 97.46194398, 97.66704065, 97.8611107, 98.04442516, 98.21733128, 98.38026471, 98.53374986, 98.67844376, 98.8150862, 98.94455298, 99.06785516, 99.18615007, 99.30075287, 99.41314881, 99.5250061, 99.63818945, 99.75477412, 99.87706036, 100.0075883, 100.1491529, 100.3048189, 100.477926, 100.6721384, 100.7783809],
            spanGaps: true,
          }
          ,
          {
            yAxisID: 'y1',
            label: 'P97% Stature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(167,105,0,0.4)',
            borderColor: 'rgb(167, 105, 0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'white',
            pointBackgroundColor: 'black',
            pointBorderWidth: 0.1,
            pointHoverRadius: 2,
            pointHoverBackgroundColor: 'brown',
            pointHoverBorderColor: 'yellow',
            pointHoverBorderWidth: 2,
            pointRadius: 0.1,
            pointHitRadius: 2,
            // notice the gap in the data and the spanGaps: false
            data: [93.02265441, 93.45923029, 94.38278047, 95.27761711, 96.14511823, 96.98662531, 97.8034532, 98.59690538, 99.36828331, 100.1188932, 100.8500508, 101.5630853, 102.2593402, 102.940182, 103.5982668, 104.2502776, 104.8967054, 105.5380208, 106.1746779, 106.8071048, 107.4357106, 108.0608826, 108.6829866, 109.3023669, 109.9193463, 110.5342263, 111.1472879, 111.7587911, 112.3689778, 112.9780622, 113.5862516, 114.1937245, 114.800644, 115.4071549, 116.0133837, 116.6194398, 117.2254154, 117.831386, 118.4374113, 119.0435349, 119.6497853, 120.2561762, 120.8627069, 121.4693629, 122.0761162, 122.682926, 123.2897392, 123.8964899, 124.5031042, 125.1094938, 125.7155618, 126.3212019, 126.926299, 127.5307299, 128.134364, 128.737064, 129.3386866, 129.9390834, 130.5381015, 131.1355844, 131.7313729, 132.3253057, 132.9172205, 133.5069548, 134.0943467, 134.6792321, 135.2614591, 135.8408704, 136.4173156, 136.9906494, 137.5607324, 138.1274323, 138.6906245, 139.2501934, 139.8060325, 140.3580462, 140.9061502, 141.4502723, 141.9903534, 142.5263486, 143.0582274, 143.5859753, 144.109594, 144.6291028, 145.1445387, 145.6559581, 146.1634368, 146.6670713, 147.1669794, 147.6633011, 148.1561991, 148.6458598, 149.132494, 149.6163372, 150.0976507, 150.5767217, 151.0538639, 151.5294179, 152.0037511, 152.4772579, 152.9503596, 153.4235035, 153.8971624, 154.3718335, 154.8480367, 155.3263129, 155.8072211, 156.2913356, 156.7792423, 157.2715342, 157.7688063, 158.27165, 158.7806462, 159.2963578, 159.8193221, 160.3500415, 160.8889743, 161.4365245, 161.993032, 162.5587616, 163.133893, 163.7185106, 164.3125939, 164.9160089, 165.5285004, 166.1496863, 166.7790531, 167.4159536, 168.0596069, 168.7091009, 169.3633976, 170.0213408, 170.6816665, 171.3430163, 172.0039535, 172.662978, 173.3185527, 173.9691164, 174.6131123, 175.2490052, 175.8753066, 176.490594, 177.0935299, 177.6828795, 178.2575211, 178.8164693, 179.3588685, 179.8840066, 180.3913154, 180.8803698, 181.3508837, 181.8027041, 182.2358034, 182.6502694, 183.0462946, 183.4241646, 183.7842466, 184.1269767, 184.4528488, 184.7624031, 185.0562159, 185.3348893, 185.5990431, 185.8493063, 186.0863109, 186.3106859, 186.5230505, 186.7240141, 186.914169, 187.0940877, 187.2643258, 187.4254148, 187.5778643, 187.7221607, 187.8587671, 187.9881233, 188.1106465, 188.2267311, 188.3367503, 188.4410559, 188.5399798, 188.6338345, 188.7229142, 188.8074955, 188.8878386, 188.9641878, 189.0367727, 189.1058089, 189.1714988, 189.2340323, 189.2935878, 189.3503326, 189.4044237, 189.4560086, 189.5052256, 189.5522044, 189.5970671, 189.6399279, 189.6808943, 189.7200672, 189.7575413, 189.7934056, 189.8277438, 189.8606344, 189.8921514, 189.9223642, 189.9513383, 189.9791351, 190.0058126, 190.0314253, 190.0560245, 190.0796588, 190.1023738, 190.1242124, 190.1452154, 190.1654212, 190.1848658, 190.1943135],
            spanGaps: false,
          }
          ,




        ]
      };

    this.options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          id: 'y1',
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 200
          },
          scaleLabel: {
            display: true,
            labelString: 'Height (cm)',
            fontSize: 20
          }
        },
        {
          id: 'y2',
          position: 'right',
          ticks: {
            beginAtZero: false,
            min: 0,
            max: 200
          },
          scaleLabel: {
            display: true,
            labelString: 'Weight (kg)',
            fontSize: 20
          }
        }],
        xAxes: [{
          id: 'x1',
          display: false
        },
        {
          id: 'x2',
          type: 'linear',
          position: 'bottom',
          ticks: {
            max: 20,
            min: 2,
            stepSize: 1
          },
          scaleLabel: {
            display: true,
            labelString: 'Age (Years)',
            fontSize: 20
          }
        }]
      }
    };





    this.data = Object.assign({}, this.constMaleData);

  }



  //#endregion


  //#region  for FeMale chart
  updataFemaleChart(height, weight) {
    if (!this.constFemaleData) {
      this.loadFemaleChartData();
    }
    this.data = this.constFemaleData;
    var age = this.record.age;
    var clst = this.closest(age, this.constLabels);

    let index = this.constLabels.findIndex(x => x == clst);
    let tempWeightdata = [];
    let tempHeightdata = [];
    for (var i = 1; i <= index; i++) {
      tempWeightdata.push(null);
      tempHeightdata.push(null);
    }

    tempHeightdata.push(height);
    tempWeightdata.push(weight);
    if (this.isFemaleChartUpdated == false) {
      this.isFemaleChartUpdated = true;
    }
    else {
      this.data.datasets.pop();
      this.data.datasets.pop();
    }


    this.data.datasets.push({
      yAxisID: 'y2',
      label: 'Weight',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(225,0,0,0.4)',
      borderColor: 'red', // The main line color
      borderCapStyle: 'square',
      borderDash: [], // try [5, 15] for instance
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'black',
      pointBorderWidth: 0.5,
      pointHoverRadius: 2,
      pointHoverBackgroundColor: 'yellow',
      pointHoverBorderColor: 'brown',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 2,
      // notice the gap in the data and the spanGaps: true
      data: tempWeightdata,
      spanGaps: true,
    });

    this.data.datasets.push({
      yAxisID: 'y1',
      label: 'Stature',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(167,105,0,0.4)',
      borderColor: 'rgb(167, 105, 0)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'black',
      pointBorderWidth: 0.1,
      pointHoverRadius: 2,
      pointHoverBackgroundColor: 'brown',
      pointHoverBorderColor: 'yellow',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 2,
      // notice the gap in the data and the spanGaps: false
      data: tempHeightdata,
      spanGaps: false,
    }
    );


    this.chart.refresh();
  }


  loadFemaleChartData() {
    this.constFemaleData = {
      labels: this.constLabels,
      datasets: [
        {
          yAxisID: 'y2',
          label: 'P3% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [9.985667562, 10.04880792, 10.17173432, 10.29079033, 10.40664383, 10.51990171, 10.63111516, 10.74078194, 10.84934933, 10.95721927, 11.0647471, 11.17224778, 11.27999893, 11.38824099, 11.49718137, 11.60699649, 11.71783343, 11.82981465, 11.94303682, 12.05757491, 12.17348363, 12.29079939, 12.40954207, 12.52971675, 12.65131534, 12.77431816, 12.89869431, 13.0244072, 13.15141009, 13.279651, 13.40907302, 13.53961547, 13.67121491, 13.80380614, 13.9373231, 14.07169977, 14.20687088, 14.34277271, 14.47934293, 14.61652406, 14.75426001, 14.89249907, 15.03119376, 15.17030121, 15.30978338, 15.4496077, 15.5897467, 15.73017845, 15.87088741, 16.01186303, 16.15310112, 16.29460329, 16.43637669, 16.57843458, 16.72079656, 16.86348713, 17.00653572, 17.14997871, 17.2938564, 17.43821437, 17.58310295, 17.72857693, 17.87469542, 18.02152302, 18.16912246, 18.31756871, 18.46693089, 18.61728653, 18.76871394, 18.92129383, 19.07510898, 19.23024402, 19.38678267, 19.54481057, 19.70441527, 19.86568272, 20.02869944, 20.19355165, 20.36032458, 20.52910239, 20.6999678, 20.8730018, 21.04828336, 21.22588911, 21.40589307, 21.58836636, 21.77337689, 21.96098914, 22.15126389, 22.34425792, 22.54002382, 22.73860975, 22.94005917, 23.14441069, 23.35169781, 23.56194878, 23.77518637, 23.99142774, 24.21068424, 24.43296131, 24.65825833, 24.88656847, 25.11787864, 25.35216934, 25.58941249, 25.82958069, 26.0726318, 26.31852113, 26.56719327, 26.81859231, 27.0726516, 27.3292989, 27.5884554, 27.85003573, 28.11394809, 28.38009427, 28.64837137, 28.91866389, 29.1908599, 29.46483511, 29.74046108, 30.01760377, 30.29612378, 30.57587654, 30.85671255, 31.13847695, 31.42101289, 31.70415418, 31.98773757, 32.27158972, 32.55553716, 32.83940314, 33.12300797, 33.40616909, 33.68870064, 33.97041915, 34.25113618, 34.5306634, 34.80881186, 35.08539244, 35.36021624, 35.63309497, 35.90384139, 36.17226975, 36.43819618, 36.70143915, 36.96181994, 37.21916305, 37.47329665, 37.72405025, 37.97126574, 38.2147829, 38.45444923, 38.69011819, 38.92164966, 39.14891037, 39.37177435, 39.59012338, 39.80384736, 40.01284477, 40.21702302, 40.41629881, 40.61059851, 40.79985847, 40.98402528, 41.16305606, 41.33691866, 41.50559186, 41.66906547, 41.82734048, 41.98042905, 42.12835452, 42.27115134, 42.40886495, 42.54155162, 42.66927817, 42.79212167, 42.91016914, 43.02351704, 43.13227083, 43.23654442, 43.33645956, 43.43214518, 43.52373663, 43.61137495, 43.69520604, 43.77537971, 43.85204883, 43.9253721, 43.99549743, 44.06258481, 44.12678882, 44.18826162, 44.24715174, 44.30360275, 44.35775192, 44.40972877, 44.45965358, 44.50763581, 44.5537724, 44.598146, 44.64082307, 44.68185184, 44.72126019, 44.75905693, 44.79521204, 44.82968627, 44.86239882, 44.89323794, 44.92205384, 44.94865678, 44.97281279, 44.99423978, 45.01260329, 45.02751676, 45.03852094, 45.04509979, 45.04654822],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P3% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [78.43754166, 78.82133263, 79.60197647, 80.37554759, 81.1356973, 81.87746051, 82.59711819, 83.29206184, 83.96065415, 84.60209562, 85.21630353, 85.80378996, 86.36557262, 86.90307328, 87.43482018, 87.95945137, 88.47849954, 88.99330218, 89.50502066, 90.01465759, 90.52307278, 91.03099757, 91.5390479, 92.04773605, 92.55748123, 93.06861913, 93.58141046, 94.09604867, 94.61266684, 95.13134395, 95.65211042, 96.17495324, 96.69982047, 97.2266254, 97.75525036, 98.28555005, 98.81735475, 99.35047319, 99.88469514, 100.4197939, 100.9555286, 101.4916463, 102.0278838, 102.5639698, 103.0996264, 103.6345709, 104.1685175, 104.7011761, 105.2322625, 105.7614857, 106.2885612, 106.8132066, 107.3351443, 107.8541019, 108.3698135, 108.8820206, 109.3904733, 109.8949308, 110.3951624, 110.890948, 111.3820796, 111.868361, 112.3496093, 112.825655, 113.2963432, 113.7615336, 114.2211014, 114.674938, 115.1229513, 115.5650666, 116.001227, 116.4313942, 116.8555488, 117.2736916, 117.6858437, 118.092048, 118.4923693, 118.8868959, 119.2757403, 119.6590402, 120.0369603, 120.4096928, 120.7774598, 121.140514, 121.4991408, 121.8536605, 122.2044292, 122.551842, 122.8963342, 123.2383839, 123.5785142, 123.9172948, 124.2553446, 124.5933332, 124.9319822, 125.2720662, 125.6144133, 125.9599043, 126.3094709, 126.6640931, 127.0247941, 127.3926332, 127.7686986, 128.1540923, 128.5499184, 128.9572634, 129.3771753, 129.8106385, 130.2585454, 130.7216652, 131.2006102, 131.6958014, 132.2074327, 132.7354383, 133.2794613, 133.8388331, 134.4125492, 134.9992687, 135.5973139, 136.2046931, 136.8191174, 137.4380555, 138.0587804, 138.6784334, 139.2940935, 139.902849, 140.5018697, 141.0884738, 141.6601883, 142.2147984, 142.7503859, 143.2653544, 143.7584411, 144.2287179, 144.6755805, 145.0987292, 145.4981426, 145.8740473, 146.2268836, 146.5572714, 146.8659759, 147.1538752, 147.4219304, 147.6711585, 147.902609, 148.1173446, 148.3164186, 148.5008727, 148.6717163, 148.8299213, 148.976416, 149.1120814, 149.2377485, 149.3541954, 149.4621532, 149.5622993, 149.6552628, 149.7416255, 149.8219242, 149.8966533, 149.9662668, 150.0311812, 150.0917784, 150.1484074, 150.2013879, 150.2510113, 150.2975443, 150.3412298, 150.3822898, 150.4209266, 150.4573249, 150.4916531, 150.524065, 150.5547008, 150.5836887, 150.6111457, 150.6371789, 150.661886, 150.6853568, 150.7076733, 150.7289106, 150.749138, 150.7684187, 150.7868111, 150.8043689, 150.8211416, 150.8371748, 150.8525106, 150.8671882, 150.8812435, 150.8947102, 150.9076191, 150.9199994, 150.9318778, 150.9432795, 150.9542279, 150.9647448, 150.9748507, 150.9845649, 150.9939053, 151.0028889, 151.0115315, 151.0198482, 151.0278532, 151.0355596, 151.0429803, 151.0501271, 151.0570114, 151.0636438, 151.0700346, 151.0761934, 151.0821295, 151.0878515, 151.0933679, 151.0986866, 151.1038152, 151.1087609, 151.1111674],
          spanGaps: false,
        }
        ,

        {
          yAxisID: 'y2',
          label: 'P5% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [10.2102741, 10.27482893, 10.40066415, 10.52273569, 10.64171007, 10.7581918, 10.8727282, 10.98581228, 11.09788597, 11.2093447, 11.32053778, 11.43177357, 11.54332263, 11.65541879, 11.76826286, 11.88202491, 11.99684628, 12.11284345, 12.23010816, 12.34871076, 12.46870194, 12.59011469, 12.71296607, 12.837259, 12.96298387, 13.09012012, 13.21863694, 13.34849756, 13.47965651, 13.61206342, 13.74566354, 13.88039891, 14.0162093, 14.15303322, 14.29080875, 14.42947441, 14.56896986, 14.70923661, 14.85021811, 14.9918623, 15.13411929, 15.27694359, 15.42029408, 15.56413437, 15.70843301, 15.85316397, 15.99830645, 16.1438452, 16.28977109, 16.43608019, 16.58277468, 16.72986243, 16.87735682, 17.02527707, 17.17364841, 17.32250091, 17.47186953, 17.62179544, 17.77232382, 17.92350474, 18.07539265, 18.2280462, 18.38152794, 18.53590513, 18.69124428, 18.84762137, 19.00510849, 19.16378421, 19.32372789, 19.48502077, 19.64774563, 19.8119865, 19.9778266, 20.14535023, 20.31464276, 20.48578791, 20.65886924, 20.83396942, 21.01116968, 21.19054959, 21.37218677, 21.55615653, 21.74253164, 21.93138197, 22.12277423, 22.31677169, 22.51343388, 22.71281638, 22.91497052, 23.11994316, 23.32777646, 23.53850764, 23.7521688, 23.96878672, 24.18838263, 24.4109721, 24.63656488, 24.86516468, 25.09676913, 25.33136962, 25.56895119, 25.80949245, 26.05296553, 26.29933598, 26.5485612, 26.80059725, 27.05538753, 27.31287184, 27.57298031, 27.83564104, 28.10077256, 28.3682877, 28.63809288, 28.91008824, 29.18416775, 29.46021931, 29.73812611, 30.01776074, 30.29899746, 30.58170029, 30.86572924, 31.15093935, 31.43718091, 31.72429973, 32.01213742, 32.30053116, 32.58931625, 32.87832086, 33.16737518, 33.45630184, 33.74492348, 34.03306041, 34.3205311, 34.60715224, 34.89273857, 35.17710718, 35.46007223, 35.74144871, 36.0210521, 36.29869877, 36.57420636, 36.84739419, 37.11808367, 37.38609874, 37.65126622, 37.91341628, 38.17238283, 38.42800396, 38.68012233, 38.92858345, 39.17324412, 39.41396159, 39.65060094, 39.8830339, 40.11113919, 40.33480295, 40.55391906, 40.76838955, 40.97812493, 41.18304453, 41.3830768, 41.57815964, 41.76824065, 41.95327736, 42.1332375, 42.30809914, 42.4778509, 42.642492, 42.80203238, 42.95649273, 43.10590449, 43.25030973, 43.38976112, 43.52432169, 43.65406467, 43.77907316, 43.89943983, 44.01526649, 44.12666366, 44.23375003, 44.33665192, 44.43550259, 44.53044156, 44.62161386, 44.70916923, 44.79326117, 44.8740461, 44.95168231, 45.02633189, 45.09814744, 45.16728964, 45.23391322, 45.29816896, 45.36020233, 45.42015206, 45.47814866, 45.53431283, 45.58875384, 45.64156773, 45.69283549, 45.74262109, 45.79096943, 45.83790409, 45.88342504, 45.92750914, 45.97009344, 46.01109826, 46.05040055, 46.08784264, 46.12322421, 46.15630107, 46.18678082, 46.21431895, 46.23851477, 46.2589107, 46.27497563, 46.28611635, 46.28963394],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P5% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [79.25981989, 79.64776859, 80.44225735, 81.22666181, 81.99539596, 82.74410888, 83.46956585, 84.16952943, 84.84263937, 85.48829708, 86.10655881, 86.69803144, 87.26378819, 87.80528157, 88.34236213, 88.87255864, 89.39733426, 89.91797078, 90.43558554, 90.95114701, 91.4654891, 91.97932415, 92.49325483, 93.00778484, 93.52332863, 94.04022021, 94.55872109, 95.07902737, 95.60127628, 96.12555202, 96.65189097, 97.18028656, 97.7106936, 98.24303219, 98.77719141, 99.31303257, 99.85039229, 100.3890853, 100.9289069, 101.4696357, 102.0110354, 102.5528574, 103.0948423, 103.6367221, 104.1782217, 104.7190606, 105.258955, 105.797617, 106.3347618, 106.8701003, 107.4033481, 107.9342229, 108.4624465, 108.987746, 109.5098548, 110.0285133, 110.5434704, 111.0544841, 111.5613221, 112.0637632, 112.5615976, 113.054628, 113.54267, 114.0255532, 114.5031216, 114.9752341, 115.4417656, 115.9026074, 116.3576679, 116.8068731, 117.2501678, 117.6875155, 118.1188998, 118.5443251, 118.9638171, 119.3774239, 119.7852171, 120.1872927, 120.5837721, 120.9748035, 121.3605632, 121.7412571, 122.1171219, 122.4884272, 122.8554769, 123.2186111, 123.5782083, 123.9346869, 124.2885075, 124.6401749, 124.9902397, 125.3393004, 125.6880049, 126.0370512, 126.3871885, 126.7392174, 127.0939883, 127.4524005, 127.8153983, 128.1839668, 128.5591249, 128.9419168, 129.3334014, 129.7346372, 130.1466666, 130.5704957, 131.0070717, 131.4572565, 131.9217986, 132.4013028, 132.8961979, 133.4067049, 133.9328066, 134.4742195, 135.0303699, 135.6003795, 136.1830524, 136.7768804, 137.3800519, 137.9904798, 138.6058289, 139.2235689, 139.8410247, 140.4554388, 141.064036, 141.6640898, 142.2529855, 142.8282787, 143.3877452, 143.9294218, 144.4516354, 144.9530205, 145.4325259, 145.8894106, 146.3232308, 146.7338197, 147.1212613, 147.4858611, 147.8281145, 148.148675, 148.4483225, 148.7279342, 148.9884574, 149.2308852, 149.4562355, 149.6655332, 149.8597926, 150.0400107, 150.2071532, 150.3621482, 150.5058813, 150.6391923, 150.7628729, 150.877665, 150.9842639, 151.0833153, 151.1754186, 151.2611287, 151.3409575, 151.415377, 151.4848208, 151.5496874, 151.610342, 151.6671193, 151.7203255, 151.7702407, 151.8171212, 151.8612008, 151.9026934, 151.9417942, 151.9786817, 152.013519, 152.0464549, 152.0776257, 152.1071558, 152.1351593, 152.1617405, 152.1869949, 152.2110102, 152.2338667, 152.2556383, 152.2763929, 152.296193, 152.3150959, 152.3331548, 152.3504187, 152.3669327, 152.3827387, 152.3978755, 152.412379, 152.4262827, 152.4396177, 152.4524128, 152.464695, 152.4764895, 152.4878198, 152.498708, 152.5091747, 152.5192393, 152.52892, 152.5382338, 152.5471971, 152.5558248, 152.5641315, 152.5721307, 152.5798353, 152.5872574, 152.5944085, 152.6012996, 152.6079412, 152.6143431, 152.6205147, 152.626465, 152.6322026, 152.6377356, 152.6430718, 152.6482187, 152.6507234],
          spanGaps: false,
        }
        ,

        {
          yAxisID: 'y2',
          label: 'P10% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [10.57373483, 10.64075988, 10.77166654, 10.89898512, 11.02338047, 11.14545358, 11.26574591, 11.38474303, 11.50287836, 11.62053698, 11.7380584, 11.85574032, 11.9738418, 12.0925858, 12.21216229, 12.33273088, 12.45442324, 12.57734604, 12.7015826, 12.82719552, 12.95422865, 13.08270906, 13.21264896, 13.3440474, 13.47689199, 13.61116044, 13.74682181, 13.88383882, 14.02216781, 14.16176079, 14.30256641, 14.44453095, 14.58759933, 14.731716, 14.87682577, 15.02287453, 15.16981002, 15.31758235, 15.46614444, 15.61545325, 15.76546914, 15.91615695, 16.06748615, 16.21943117, 16.37197155, 16.52509225, 16.67878363, 16.83304163, 16.98786798, 17.14326985, 17.29926017, 17.4558574, 17.61308542, 17.77097356, 17.92955656, 18.08887399, 18.24897012, 18.40989435, 18.57170012, 18.73444512, 18.89819089, 19.06300261, 19.22894873, 19.39610118, 19.56453273, 19.73432134, 19.90554403, 20.07828129, 20.25261432, 20.42862531, 20.60639712, 20.7860129, 20.96755499, 21.15110555, 21.33674635, 21.52455736, 21.71461721, 21.90700268, 22.10178826, 22.29904589, 22.49884459, 22.7012502, 22.90632506, 23.1141277, 23.32471257, 23.53812979, 23.75442484, 23.97363834, 24.19580583, 24.4209575, 24.64911804, 24.88030638, 25.11453557, 25.35181259, 25.59213818, 25.83550673, 26.08190616, 26.33131782, 26.58371638, 26.8390698, 27.09733925, 27.35847906, 27.62243677, 27.88915304, 28.15856107, 28.43058954, 28.70515783, 28.98217994, 29.26156199, 29.5432056, 29.82700474, 30.11284746, 30.4006158, 30.69018587, 30.98142809, 31.27420739, 31.56838398, 31.8638107, 32.16033905, 32.45781366, 32.75607548, 33.05496144, 33.35430482, 33.6539355, 33.95368036, 34.25336333, 34.55280676, 34.85182934, 35.15025041, 35.44788577, 35.74455149, 36.04006296, 36.33423538, 36.62688403, 36.91782442, 37.20687443, 37.49385217, 37.77857793, 38.06087423, 38.34056621, 38.61748204, 38.89145331, 39.16231542, 39.42990799, 39.69407521, 39.95466626, 40.21153565, 40.4645436, 40.71355642, 40.95844577, 41.19909297, 41.4353838, 41.66721226, 41.89448008, 42.11709702, 42.33498116, 42.54805916, 42.7562665, 42.95954776, 43.1578568, 43.35115698, 43.53942133, 43.72263271, 43.90078396, 44.07387796, 44.24192774, 44.40495652, 44.5629977, 44.71609485, 44.86430165, 45.00768175, 45.14630867, 45.28026556, 45.40964499, 45.5345486, 45.65508683, 45.77137845, 45.88355015, 45.99173597, 46.09607679, 46.19671962, 46.29381699, 46.38752609, 46.47800802, 46.56542689, 46.64994883, 46.73174101, 46.81097052, 46.88780489, 46.96240411, 47.03492965, 47.10553608, 47.17437139, 47.24157543, 47.30727836, 47.37159889, 47.43464251, 47.49649958, 47.55724333, 47.61692775, 47.6755854, 47.733225, 47.78982906, 47.84535121, 47.89971542, 47.9528045, 48.00447244, 48.05452712, 48.10273611, 48.14881709, 48.1924379, 48.23321202, 48.27069475, 48.3043794, 48.33369518, 48.35799667, 48.37656825, 48.38346004],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P10% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [80.52476467, 80.91946302, 81.73540957, 82.5369944, 83.31968453, 84.07997909, 84.81531679, 85.52398013, 86.20500071, 86.85806752, 87.48343922, 88.08186325, 88.6544988, 89.20284893, 89.74875322, 90.28810699, 90.82227549, 91.35246174, 91.87972051, 92.40497144, 92.92901112, 93.45252422, 93.97609374, 94.50021028, 95.02528063, 95.55163545, 96.07953634, 96.60918226, 97.14071535, 97.67422621, 98.20975881, 98.74731484, 99.28685775, 99.82831652, 100.371589, 100.9165451, 101.4630296, 102.0108651, 102.5598541, 103.1097819, 103.6604184, 104.2115203, 104.762833, 105.3140925, 105.8650274, 106.4153599, 106.9648081, 107.5130874, 108.0599112, 108.6049935, 109.148049, 109.6887954, 110.2269537, 110.7622502, 111.2944168, 111.8231928, 112.3483251, 112.8695701, 113.3866939, 113.8994733, 114.407697, 114.9111662, 115.4096953, 115.9031127, 116.391262, 116.874002, 117.351208, 117.8227724, 118.2886054, 118.7486357, 119.2028114, 119.651101, 120.0934937, 120.5300007, 120.9606563, 121.3855185, 121.8046703, 122.2182208, 122.6263066, 123.029093, 123.4267753, 123.8195805, 124.2077692, 124.5916364, 124.9715143, 125.3477734, 125.7208245, 126.0911208, 126.4591593, 126.8254825, 127.1906801, 127.5553896, 127.9202978, 128.2861404, 128.6537014, 129.0238124, 129.3973496, 129.7752299, 130.1584061, 130.5478595, 130.9445907, 131.3496084, 131.7639151, 132.1884911, 132.6242751, 133.072142, 133.5328789, 134.0071586, 134.4955119, 134.9982982, 135.5156778, 136.0475846, 136.5937022, 137.1534445, 137.7259419, 138.3100351, 138.9042785, 139.5069517, 140.1160824, 140.7294775, 141.3447662, 141.9594471, 142.5709442, 143.1766639, 143.7740547, 144.3606631, 144.9341866, 145.4925187, 146.0337866, 146.5563788, 147.0589626, 147.5404925, 148.0002085, 148.437627, 148.8525242, 149.2449147, 149.6150259, 149.9632704, 150.2902174, 150.5965645, 150.8831097, 151.1507267, 151.4003414, 151.6329115, 151.8494087, 152.0508033, 152.238053, 152.4120911, 152.5738202, 152.7241057, 152.8637721, 152.9936001, 153.1143251, 153.2266371, 153.3311804, 153.4285552, 153.5193185, 153.6039864, 153.6830356, 153.7569057, 153.8260015, 153.8906954, 153.951329, 154.0082162, 154.0616446, 154.1118775, 154.1591564, 154.2037023, 154.2457175, 154.2853872, 154.3228809, 154.3583538, 154.3919483, 154.4237944, 154.4540118, 154.4827098, 154.509989, 154.5359417, 154.5606528, 154.5842002, 154.6066558, 154.6280858, 154.6485512, 154.6681084, 154.6868095, 154.7047027, 154.7218327, 154.7382408, 154.7539655, 154.7690427, 154.7835054, 154.7973849, 154.81071, 154.8235077, 154.8358035, 154.8476208, 154.8589821, 154.8699082, 154.8804186, 154.8905318, 154.9002654, 154.9096356, 154.9186579, 154.9273472, 154.9357171, 154.9437809, 154.9515511, 154.9590395, 154.9662574, 154.9732154, 154.9799237, 154.9863922, 154.9926299, 154.9986458, 155.0044483, 155.0100454, 155.0154449, 155.0180729],
          spanGaps: false,
        }
        ,

        {
          yAxisID: 'y2',
          label: 'P25% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [11.23356786, 11.30566642, 11.44696728, 11.58501268, 11.72046615, 11.8539236, 11.98591692, 12.11691911, 12.24734867, 12.37757256, 12.50791249, 12.63864672, 12.77001339, 12.90221529, 13.03542218, 13.16977393, 13.3053838, 13.44233976, 13.58070885, 13.72053844, 13.86185877, 14.00468502, 14.14901929, 14.29485248, 14.44216593, 14.59093307, 14.74112146, 14.89269209, 15.04560355, 15.19981137, 15.35526953, 15.51193144, 15.66975084, 15.82868259, 15.9886834, 16.14971251, 16.31173224, 16.47470852, 16.63861163, 16.80341543, 16.96909934, 17.13564756, 17.30304956, 17.4713002, 17.64039992, 17.81035463, 17.98117606, 18.15288153, 18.32549376, 18.49904125, 18.67355775, 18.84908224, 19.02565892, 19.20333679, 19.38216922, 19.56221428, 19.74353436, 19.92619507, 20.110266, 20.29581981, 20.48293203, 20.67168066, 20.86214582, 21.05440884, 21.24855446, 21.44466518, 21.64282737, 21.84312554, 22.04564463, 22.25046892, 22.45768158, 22.6673643, 22.87959773, 23.09445998, 23.31202608, 23.53236883, 23.75555744, 23.98165745, 24.21073043, 24.44283365, 24.67801969, 24.9163362, 25.15782551, 25.40252443, 25.65046392, 25.90166889, 26.15615792, 26.41394306, 26.67502964, 26.93941607, 27.20709368, 27.47804659, 27.75225159, 28.029678, 28.31028765, 28.59403476, 28.88086594, 29.17072015, 29.4635287, 29.7592153, 30.05769609, 30.35887971, 30.66266737, 30.96895298, 31.27762411, 31.58855853, 31.90163028, 32.21670522, 32.5336442, 32.85229967, 33.17251956, 33.49414573, 33.81701463, 34.14095759, 34.46580111, 34.79136727, 35.11747352, 35.44393549, 35.77056256, 36.09716305, 36.4235422, 36.7495031, 37.07484703, 37.39937399, 37.72288302, 38.04517298, 38.36604173, 38.68528952, 39.0027151, 39.31812066, 39.63130927, 39.94208624, 40.25025974, 40.55564134, 40.85804669, 41.15729406, 41.45320759, 41.74561603, 42.03435353, 42.31926009, 42.60018191, 42.87697183, 43.14948969, 43.4176027, 43.68118578, 43.94012186, 44.19430225, 44.4436269, 44.68800466, 44.92735442, 45.16160204, 45.39068521, 45.61455072, 45.83315528, 46.0464657, 46.25445894, 46.45712228, 46.65445329, 46.84645992, 47.03316051, 47.21458375, 47.39076866, 47.56176451, 47.72763073, 47.8884368, 48.04426208, 48.19519564, 48.34133606, 48.4827912, 48.6196779, 48.7521217, 48.88025651, 49.0042242, 49.12417422, 49.24026312, 49.35265405, 49.46151622, 49.5670243, 49.66935776, 49.76870017, 49.86523842, 49.95916191, 50.05066163, 50.13992923, 50.22715595, 50.31253151, 50.39624297, 50.47847336, 50.55939966, 50.6391944, 50.71801935, 50.79602716, 50.87335876, 50.95014153, 51.02648735, 51.10249055, 51.17822572, 51.25374544, 51.32907793, 51.40422448, 51.47915686, 51.55381463, 51.62810228, 51.70188628, 51.7749921, 51.84720202, 51.91824859, 51.98781418, 52.05553129, 52.12097097, 52.1836449, 52.24300075, 52.2984187, 52.34920805, 52.39460282, 52.4337619, 52.46576117, 52.47876433],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P25% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [82.63523563, 83.04213246, 83.89430336, 84.72592034, 85.53389245, 86.31588888, 87.07028387, 87.7960919, 88.49290603, 89.16083624, 89.80044644, 90.41270297, 90.99890839, 91.56065781, 92.12298263, 92.67925322, 93.23069622, 93.77840211, 94.3233355, 94.86634477, 95.40817129, 95.94945793, 96.49075704, 97.03253788, 97.57519341, 98.11904662, 98.66435637, 99.2113227, 99.76009185, 100.3107608, 100.8633813, 101.4179641, 101.9744822, 102.5328747, 103.0930492, 103.6548853, 104.2182371, 104.7829358, 105.348792, 105.9155982, 106.4831306, 107.0511517, 107.6194116, 108.1876502, 108.7555991, 109.3229831, 109.8895213, 110.4549317, 111.0189247, 111.5812164, 112.1415202, 112.6995522, 113.2550319, 113.8076835, 114.3572371, 114.9034294, 115.4460056, 115.9847196, 116.5193358, 117.0496296, 117.5753884, 118.0964128, 118.6125173, 119.1235313, 119.6293, 120.1296849, 120.6245654, 121.113839, 121.5974226, 122.0752529, 122.5472882, 123.0135084, 123.4739166, 123.92854, 124.3774309, 124.8206679, 125.2583572, 125.6906338, 126.1176628, 126.5396411, 126.9567984, 127.3693994, 127.7777448, 128.1821733, 128.5830629, 128.9808329, 129.3759451, 129.7689053, 130.1602643, 130.5506193, 130.9406135, 131.330937, 131.7223254, 132.1155587, 132.5114586, 132.9108849, 133.3147302, 133.7239135, 134.1393714, 134.5620476, 134.9928804, 135.4327874, 135.8826474, 136.3432832, 136.8154369, 137.299748, 137.7967284, 138.3067365, 138.8299523, 139.3663536, 139.9156938, 140.4774848, 141.0509836, 141.6351863, 142.228829, 142.8303943, 143.4381342, 144.0500909, 144.6641345, 145.2779986, 145.8893375, 146.4957662, 147.0949169, 147.6844892, 148.2622979, 148.8263158, 149.3747099, 149.9058698, 150.4184277, 150.9112703, 151.3835413, 151.8346381, 152.2642007, 152.6720956, 153.0583966, 153.4233611, 153.7674066, 154.0910856, 154.3950608, 154.6800825, 154.9469659, 155.1965718, 155.4297888, 155.6475179, 155.8506598, 156.0401024, 156.2167175, 156.3813442, 156.5347914, 156.6778321, 156.8112003, 156.9355896, 157.0516529, 157.1600033, 157.2612106, 157.3558081, 157.4442908, 157.5271178, 157.6047139, 157.6774719, 157.7457539, 157.809894, 157.8701998, 157.9269542, 157.9804176, 158.0308292, 158.0784088, 158.1233583, 158.1658633, 158.2060942, 158.2442076, 158.2803474, 158.3146459, 158.3472249, 158.3781962, 158.407663, 158.4357202, 158.4624554, 158.4879492, 158.5122763, 158.5355056, 158.5577008, 158.578921, 158.5992207, 158.6186507, 158.6372582, 158.6550869, 158.6721776, 158.6885682, 158.7042942, 158.7193886, 158.7338824, 158.7478045, 158.7611821, 158.7740404, 158.7864036, 158.798294, 158.8097328, 158.8207399, 158.8313341, 158.8415332, 158.851354, 158.8608124, 158.8699234, 158.8787012, 158.8871595, 158.8953111, 158.9031682, 158.9107425, 158.918045, 158.9250863, 158.9318765, 158.9384252, 158.9447416, 158.9508345, 158.9567122, 158.9623829, 158.9651429],
          spanGaps: false,
        }
        ,

        {
          yAxisID: 'y2',
          label: 'P50% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [12.05503983, 12.13455523, 12.2910249, 12.44469258, 12.59622335, 12.74620911, 12.89517218, 13.04357164, 13.19180874, 13.34022934, 13.48913319, 13.63877446, 13.78936547, 13.94108332, 14.09407175, 14.24844498, 14.40429169, 14.56167529, 14.72064045, 14.88121352, 15.04340553, 15.20721443, 15.37262729, 15.53962221, 15.70817017, 15.87823668, 16.04978452, 16.2227706, 16.39715363, 16.57289122, 16.74994187, 16.92826587, 17.10782615, 17.28858894, 17.47052444, 17.65360733, 17.83781722, 18.02313904, 18.20956418, 18.3970876, 18.58571243, 18.77544728, 18.966307, 19.15831267, 19.35149163, 19.54587708, 19.74150854, 19.93843145, 20.13669623, 20.33635961, 20.53748298, 20.74013277, 20.94438028, 21.15030093, 21.35797332, 21.56748045, 21.77890902, 21.99234686, 22.20788541, 22.4256177, 22.64563824, 22.86804258, 23.09292679, 23.32038549, 23.55051871, 23.78341652, 24.01917703, 24.25789074, 24.49964778, 24.74453536, 24.99263735, 25.24403371, 25.49880264, 25.7570168, 26.01874261, 26.28404312, 26.55297507, 26.82558904, 27.1019295, 27.38203422, 27.66593402, 27.9536524, 28.24520531, 28.54060085, 28.83983907, 29.14291171, 29.44980208, 29.76048479, 30.0749257, 30.39308176, 30.71490093, 31.0403221, 31.36927506, 31.7016805, 32.03744999, 32.37648607, 32.71868225, 33.06392318, 33.4120847, 33.76303402, 34.1166299, 34.47272283, 34.83115524, 35.19176177, 35.55437176, 35.91879976, 36.28486194, 36.65236365, 37.02110818, 37.39088668, 37.76148905, 38.1326991, 38.50429603, 38.87605489, 39.24774707, 39.61914076, 39.98999994, 40.36009244, 40.72917544, 41.09701099, 41.46335907, 41.82797963, 42.19063313, 42.55108107, 42.90908653, 43.2644155, 43.61683402, 43.9661169, 44.31203579, 44.65437319, 44.99291356, 45.32744704, 45.65777013, 45.98368656, 46.30500858, 46.62155183, 46.93314404, 47.23962058, 47.54082604, 47.83661466, 48.12685082, 48.41140938, 48.69017613, 48.9630481, 49.22993391, 49.49075409, 49.74544132, 49.99394068, 50.23620985, 50.47222213, 50.70195581, 50.92540942, 51.14259229, 51.3535268, 51.55824831, 51.75680513, 51.94925841, 52.13568193, 52.31616197, 52.49079703, 52.65969757, 52.82298572, 52.9807949, 53.13326946, 53.28056425, 53.42284417, 53.5602837, 53.69306637, 53.82138422, 53.94543725, 54.06543278, 54.18158486, 54.29411356, 54.40324431, 54.50920717, 54.61223603, 54.71256787, 54.81044184, 54.90609842, 54.99977846, 55.09172217, 55.18216811, 55.271352, 55.35950558, 55.44685531, 55.53362107, 55.62001464, 55.70623826, 55.79247939, 55.87892356, 55.96573022, 56.05304601, 56.14099882, 56.22969564, 56.3192203, 56.40963105, 56.50095811, 56.59320107, 56.68632619, 56.78026364, 56.87490465, 56.97009856, 57.06564989, 57.16131528, 57.25679821, 57.35175792, 57.44578172, 57.53840429, 57.62910094, 57.7172758, 57.80226553, 57.88333502, 57.95967458, 58.0303973, 58.09453209, 58.15103575, 58.1987714, 58.21897289],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P50% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [84.97555512, 85.3973169, 86.29026318, 87.15714182, 87.9960184, 88.8055115, 89.58476689, 90.33341722, 91.0515436, 91.7396352, 92.39854429, 93.02945392, 93.63382278, 94.21335709, 94.79643239, 95.37391918, 95.94692677, 96.51644912, 97.08337211, 97.6484807, 98.21246579, 98.77593069, 99.33939735, 99.9033122, 100.4680516, 101.033927, 101.6011898, 102.1700358, 102.7406094, 103.3130077, 103.8872839, 104.4634511, 105.0414853, 105.6213287, 106.2028921, 106.7860583, 107.3706841, 107.9566031, 108.5436278, 109.1315521, 109.7201531, 110.3091934, 110.8984228, 111.4875806, 112.0763967, 112.6645943, 113.2518902, 113.8380006, 114.4226317, 115.0054978, 115.5863089, 116.1647782, 116.7406221, 117.3135622, 117.8833259, 118.4496481, 119.0122722, 119.5709513, 120.1254495, 120.6755427, 121.22102, 121.7616844, 122.2973542, 122.827864, 123.3530652, 123.8728276, 124.38704, 124.8956114, 125.398472, 125.895574, 126.3868929, 126.8724284, 127.3522056, 127.8262759, 128.2947187, 128.757642, 129.2151839, 129.6675143, 130.1148354, 130.5573839, 130.995432, 131.4292887, 131.8593015, 132.2858574, 132.7093845, 133.1303527, 133.5492749, 133.9667073, 134.3832499, 134.7995463, 135.2162826, 135.634186, 136.0540223, 136.4765925, 136.9027281, 137.3332846, 137.7691339, 138.2111552, 138.6602228, 139.1171933, 139.5828898, 140.0580848, 140.5434787, 141.0396832, 141.5471945, 142.0663731, 142.59742, 143.1403553, 143.6949981, 144.2609497, 144.8375809, 145.4240246, 146.0191748, 146.621692, 147.2300177, 147.8423918, 148.4568879, 149.0714413, 149.6838943, 150.2920328, 150.8936469, 151.4865636, 152.0686985, 152.6380955, 153.1929631, 153.7317031, 154.2529332, 154.755501, 155.2384904, 155.7012216, 156.1432438, 156.564323, 156.9644258, 157.3436995, 157.7024507, 158.0411233, 158.3602756, 158.6605588, 158.9426964, 159.2074654, 159.455679, 159.688172, 159.9057871, 160.1093647, 160.299733, 160.4776996, 160.6440526, 160.7995428, 160.9448916, 161.0807857, 161.2078755, 161.3267744, 161.4380593, 161.5422726, 161.639917, 161.7314645, 161.8173534, 161.8979913, 161.9737558, 162.0449969, 162.1120386, 162.17518, 162.2346979, 162.2908474, 162.343864, 162.3939652, 162.4413513, 162.4862071, 162.5287029, 162.5689958, 162.6072309, 162.6435418, 162.6780519, 162.7108751, 162.7421168, 162.7718741, 162.8002371, 162.8272889, 162.8531067, 162.8777619, 162.9013208, 162.9238449, 162.9453912, 162.9660131, 162.9857599, 163.0046776, 163.0228094, 163.0401953, 163.0568727, 163.0728768, 163.0882404, 163.1029943, 163.1171673, 163.1307866, 163.1438776, 163.1564644, 163.1685697, 163.1802146, 163.1914194, 163.202203, 163.2125835, 163.2225779, 163.2322024, 163.2414722, 163.2504019, 163.2590052, 163.2672954, 163.2752848, 163.2829854, 163.2904086, 163.297565, 163.304465, 163.3111185, 163.3175349, 163.3237231, 163.3296918, 163.3354491, 163.338251],
          spanGaps: false,
        }
        ,

        {
          yAxisID: 'y2',
          label: 'P75% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [12.98666951, 13.07613207, 13.25293458, 13.42753123, 13.60059358, 13.77271274, 13.94440383, 14.11611337, 14.28822545, 14.46106492, 14.6349076, 14.80998135, 14.98647034, 15.16452247, 15.34425164, 15.52574208, 15.7090529, 15.89421842, 16.08125551, 16.27016402, 16.4609302, 16.65352914, 16.84792719, 17.04408407, 17.24195488, 17.44149184, 17.64264736, 17.84537017, 18.04961414, 18.25533469, 18.46249096, 18.67104666, 18.88097086, 19.09223862, 19.30483153, 19.51873814, 19.73395429, 19.95048336, 20.16833747, 20.38753372, 20.60809964, 20.83006969, 21.05348599, 21.27839816, 21.50486316, 21.7329446, 21.96271325, 22.19424627, 22.42762598, 22.66294138, 22.90028597, 23.13975807, 23.38146064, 23.62550009, 23.87198507, 24.12102802, 24.37274421, 24.62724833, 24.88465774, 25.14508981, 25.40866182, 25.67549032, 25.94569055, 26.21937378, 26.49665657, 26.77764034, 27.06243533, 27.35113996, 27.64385046, 27.94065757, 28.24164611, 28.54689431, 28.85647669, 29.17045929, 29.4888987, 29.8118461, 30.13934341, 30.47142364, 30.80811106, 31.14942058, 31.49535747, 31.8459171, 32.20108468, 32.56083507, 32.92513255, 33.29393074, 33.66717239, 34.04478937, 34.42670255, 34.8128218, 35.20304599, 35.59726302, 35.99534989, 36.3971728, 36.80258726, 37.21143829, 37.62356058, 38.03877869, 38.45690737, 38.87775177, 39.30110778, 39.72676238, 40.15449395, 40.58407272, 41.01526401, 41.44781609, 41.88148136, 42.31600037, 42.75111318, 43.18654635, 43.62202704, 44.05727678, 44.49201341, 44.92595166, 45.35880379, 45.79028017, 46.22008796, 46.64794172, 47.07354407, 47.4966064, 47.91683947, 48.33395608, 48.74767177, 49.15770541, 49.56377988, 49.96562365, 50.36296721, 50.75555403, 51.14312509, 51.52543729, 51.90225139, 52.273337, 52.63847339, 52.99745045, 53.35007037, 53.69614073, 54.03548596, 54.36794129, 54.69335479, 55.01158787, 55.32251577, 55.62602801, 55.9220288, 56.21043748, 56.49118881, 56.76423337, 57.02953776, 57.2870849, 57.53687418, 57.77892568, 58.01326503, 58.23994486, 58.45903143, 58.67060766, 58.87477302, 59.07164337, 59.26135066, 59.44404265, 59.61988254, 59.78904852, 59.95173329, 60.10814351, 60.25849917, 60.40303292, 60.54198938, 60.67562433, 60.80420388, 60.92800363, 61.04730771, 61.16240788, 61.27360245, 61.38119533, 61.48549489, 61.58681291, 61.68546339, 61.7817614, 61.87602186, 61.96855832, 62.05968162, 62.14969862, 62.23891075, 62.32761268, 62.41609075, 62.50462147, 62.59346994, 62.68288814, 62.77311319, 62.86436555, 62.95684135, 63.05073398, 63.14619584, 63.24336091, 63.34233618, 63.44319934, 63.54599643, 63.65073939, 63.75740358, 63.86592525, 63.97619897, 64.08807505, 64.20135697, 64.31579883, 64.43110284, 64.54691678, 64.66282755, 64.77837954, 64.89303137, 65.00619161, 65.11720439, 65.22534243, 65.32980994, 65.42973979, 65.52419173, 65.61215061, 65.69251821, 65.76413346, 65.8257417, 65.85237979],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P75% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [87.31121356, 87.74917522, 88.683435, 89.5875095, 90.46017565, 91.30065173, 92.10858598, 92.88403041, 93.62741325, 94.33950841, 95.02140026, 95.67445723, 96.30028751, 96.9007148, 97.50723533, 98.10854769, 98.70568284, 99.2995686, 99.89103539, 100.4808219, 101.0695807, 101.6578832, 102.2462253, 102.8350319, 103.4246616, 104.0154114, 104.6075204, 105.2011743, 105.7965086, 106.3936129, 106.9925336, 107.5932772, 108.1958137, 108.8000793, 109.405979, 110.0133894, 110.6221611, 111.2321213, 111.8430758, 112.4548114, 113.0670984, 113.6796918, 114.2923342, 114.9047572, 115.5166834, 116.1278283, 116.7379017, 117.3466121, 117.9536599, 118.5587525, 119.1615941, 119.7618926, 120.3593603, 120.9537147, 121.5446807, 122.1319914, 122.7153896, 123.2946291, 123.8694758, 124.4397092, 125.0051231, 125.5655273, 126.1207484, 126.6706308, 127.2150383, 127.7538545, 128.2869845, 128.8143555, 129.3359181, 129.8516474, 130.3615441, 130.8656354, 131.3639763, 131.8566506, 132.3437724, 132.8254867, 133.3019713, 133.7734371, 134.2401302, 134.7023324, 135.1603626, 135.6145777, 136.0653737, 136.5131864, 136.9584917, 137.4018066, 137.8436884, 138.2847346, 138.7255822, 139.1669053, 139.6094137, 140.0538485, 140.5009788, 140.9515953, 141.406504, 141.8665172, 142.3324443, 142.8050794, 143.2851879, 143.7734919, 144.2706527, 144.7772534, 145.2937779, 145.8205935, 146.3579283, 146.9058529, 147.4642617, 148.0328573, 148.6111378, 149.1983881, 149.7936767, 150.3958583, 151.0035823, 151.6153083, 152.2293288, 152.8437944, 153.4567526, 154.0661803, 154.6700274, 155.2662534, 155.8528786, 156.4280126, 156.9898953, 157.5369262, 158.0676887, 158.5809683, 159.0757636, 159.5512908, 160.006982, 160.4424774, 160.8576139, 161.252409, 161.6270427, 161.9818377, 162.317239, 162.633793, 162.9321282, 163.2129368, 163.476957, 163.7249588, 163.9577297, 164.1760637, 164.3807514, 164.572572, 164.7522868, 164.920633, 165.0783248, 165.2260411, 165.3644316, 165.4941133, 165.6156697, 165.7296508, 165.8365737, 165.9369248, 166.0311556, 166.1196904, 166.202924, 166.281224, 166.3549321, 166.4243655, 166.4898188, 166.5515647, 166.6098562, 166.6649274, 166.7169951, 166.7662599, 166.8129074, 166.8571093, 166.8990246, 166.9388003, 166.9765723, 167.0124668, 167.0466004, 167.0790811, 167.110009, 167.1394771, 167.1675715, 167.1943721, 167.2199532, 167.244384, 167.2677286, 167.2900467, 167.3113942, 167.3318229, 167.3513812, 167.3701145, 167.388065, 167.4052723, 167.4217734, 167.437603, 167.4527938, 167.4673763, 167.4813792, 167.4948296, 167.5077529, 167.520173, 167.5321128, 167.5435933, 167.554635, 167.5652567, 167.5754766, 167.5853118, 167.5947785, 167.6038921, 167.6126671, 167.6211174, 167.6292563, 167.6370963, 167.6446494, 167.6519269, 167.6589397, 167.6656981, 167.6722121, 167.678491, 167.684544, 167.6903797, 167.6960062, 167.6987436],
          spanGaps: false,
        }
        ,

        {
          yAxisID: 'y2',
          label: 'P90% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [13.93766409, 14.03902482, 14.24016506, 14.43983825, 14.63872906, 14.83743315, 15.03646393, 15.23626013, 15.43719269, 15.63957012, 15.8436466, 16.04962601, 16.25766706, 16.46788956, 16.68037834, 16.89518784, 17.11234657, 17.33185956, 17.55371382, 17.77788046, 18.00431807, 18.23297548, 18.46379435, 18.69671155, 18.9316613, 19.16857713, 19.40739437, 19.64804889, 19.8904825, 20.13464164, 20.38047905, 20.62795467, 20.87703643, 21.12770084, 21.37993353, 21.63372961, 21.88909396, 22.14604136, 22.40459718, 22.66479513, 22.92668027, 23.19030686, 23.45573857, 23.72304816, 23.99231712, 24.263635, 24.53709941, 24.8128152, 25.09089343, 25.3714519, 25.65461346, 25.94050589, 26.22926131, 26.52101516, 26.815905, 27.11407112, 27.41565556, 27.72079958, 28.02964533, 28.3423338, 28.65900443, 28.97979428, 29.30483741, 29.63426278, 29.96819988, 30.30676532, 30.65007797, 30.99824532, 31.3513695, 31.70954484, 32.07285742, 32.44138436, 32.81519554, 33.19435025, 33.5788965, 33.9688734, 34.3643086, 34.76521834, 35.17160751, 35.58346914, 36.00078421, 36.42352136, 36.85163675, 37.28507392, 37.72376365, 38.16762389, 38.61655976, 39.0704635, 39.52921454, 39.99267955, 40.46071256, 40.9331551, 41.40983639, 41.89057352, 42.37517172, 42.86342465, 43.35511467, 43.85001322, 44.34788119, 44.84846931, 45.35151857, 45.8567607, 46.36391866, 46.87270712, 47.38283479, 47.89399722, 48.40589011, 48.91819978, 49.43061053, 49.94279684, 50.45443246, 50.96518685, 51.47472671, 51.98271665, 52.48881992, 52.99269914, 53.49401569, 53.99243685, 54.48762378, 54.97924502, 55.4669708, 55.9504751, 56.42943635, 56.90353811, 57.37246984, 57.83592807, 58.29361488, 58.74524431, 59.19053344, 59.62921442, 60.06102656, 60.48572025, 60.90305741, 61.31281247, 61.71477365, 62.10873877, 62.49452276, 62.87195405, 63.24087599, 63.60114743, 63.95264314, 64.29525433, 64.62888901, 64.95347244, 65.26894746, 65.57527484, 65.87243353, 66.16042095, 66.43925318, 66.70896797, 66.96961412, 67.22126661, 67.46401722, 67.69797665, 67.92327441, 68.14005866, 68.34849595, 68.5487709, 68.74108582, 68.92566027, 69.10273048, 69.27254876, 69.43538282, 69.59151495, 69.74124122, 69.8848705, 70.0227235, 70.15513163, 70.28243588, 70.40498554, 70.52313696, 70.63725215, 70.74769732, 70.85484146, 70.95905471, 71.06070688, 71.16016568, 71.25779513, 71.35395381, 71.44899305, 71.54325519, 71.63707172, 71.73076142, 71.82462845, 71.91896047, 72.01402668, 72.11007585, 72.20733438, 72.3059993, 72.40625667, 72.50824833, 72.61209121, 72.71786996, 72.82563495, 72.93540037, 73.04714239, 73.16079731, 73.27625982, 73.39338138, 73.51196857, 73.63178167, 73.75253327, 73.87388701, 73.99545642, 74.11679995, 74.23743894, 74.35682105, 74.47435424, 74.58938617, 74.70121281, 74.80907365, 74.91215216, 75.00957518, 75.10041216, 75.18366937, 75.25830602, 75.32321054, 75.35164989],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P90% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [89.40951159, 89.86315834, 90.83504785, 91.77420584, 92.67968776, 93.55096822, 94.38792816, 95.19083262, 95.96030359, 96.69728978, 97.40303421, 98.07904266, 98.72704954, 99.34898744, 99.97896123, 100.6040005, 101.2250993, 101.8431523, 102.4589604, 103.0732359, 103.6866076, 104.2996257, 104.9127666, 105.5264371, 106.1409795, 106.7566748, 107.3737475, 107.9923687, 108.6126601, 109.2346972, 109.8585126, 110.4840992, 111.1114131, 111.7403765, 112.3708801, 113.0027865, 113.6359317, 114.2701285, 114.9051683, 115.5408235, 116.1768496, 116.8129879, 117.4489667, 118.0845041, 118.7193096, 119.3530862, 119.9855318, 120.6163423, 121.2452109, 121.8718331, 122.4959057, 123.1171295, 123.7352109, 124.3498634, 124.9608087, 125.5677788, 126.1705167, 126.7687784, 127.3623338, 127.9509681, 128.5344832, 129.1126986, 129.6854529, 130.2526047, 130.8140342, 131.3696436, 131.9193587, 132.4631302, 133.000934, 133.5327731, 134.0586782, 134.5787089, 135.0929548, 135.6015364, 136.1046066, 136.602351, 137.0949894, 137.5827768, 138.0660041, 138.5449986, 139.0201256, 139.4917879, 139.9604267, 140.4265216, 140.8905903, 141.3531879, 141.8149059, 142.2763706, 142.7382405, 143.2012034, 143.6659721, 144.1332799, 144.6038739, 145.0785079, 145.5579335, 146.0428902, 146.5340936, 147.0322225, 147.5379045, 148.0517004, 148.5740881, 149.1054445, 149.6460289, 150.1959657, 150.7552278, 151.3236226, 151.9007796, 152.4861414, 153.0789588, 153.6782905, 154.2830074, 154.8918033, 155.5032105, 156.1156207, 156.7273114, 157.336476, 157.9412574, 158.5397832, 159.1302018, 159.710717, 160.2796226, 160.8353311, 161.3763995, 161.9015501, 162.4096857, 162.8998985, 163.3714746, 163.8238923, 164.2568163, 164.6700879, 165.0637118, 165.4378408, 165.7927589, 166.1288638, 166.4466488, 166.7466859, 167.0296087, 167.2960978, 167.5468664, 167.7826481, 168.0041861, 168.2122241, 168.4074983, 168.5907313, 168.7626268, 168.9238654, 169.0751026, 169.2169651, 169.3500504, 169.4749261, 169.5921291, 169.7021662, 169.8055142, 169.9026209, 169.9939056, 170.0797608, 170.160553, 170.236624, 170.3082921, 170.3758539, 170.4395847, 170.4997408, 170.5565599, 170.6102627, 170.6610542, 170.7091243, 170.7546494, 170.7977929, 170.8387064, 170.8775306, 170.914396, 170.9494236, 170.9827258, 171.014407, 171.0445641, 171.0732871, 171.1006598, 171.1267599, 171.1516601, 171.1754277, 171.1981258, 171.2198128, 171.2405436, 171.2603693, 171.2793375, 171.2974929, 171.3148774, 171.33153, 171.3474874, 171.362784, 171.3774521, 171.3915221, 171.4050225, 171.4179802, 171.4304205, 171.4423671, 171.4538427, 171.4648684, 171.4754644, 171.4856495, 171.4954418, 171.5048583, 171.5139151, 171.5226274, 171.5310098, 171.5390761, 171.5468394, 171.5543121, 171.561506, 171.5684326, 171.5751024, 171.5815258, 171.5877126, 171.5936721, 171.5994132, 171.6049444, 171.6102738, 171.6128653],
          spanGaps: false,
        }
        ,

        {
          yAxisID: 'y2',
          label: 'P95% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [14.56636479, 14.67658551, 14.89587242, 15.1142761, 15.33249457, 15.55113065, 15.770701, 15.99164336, 16.21432377, 16.43904429, 16.66604785, 16.89552564, 17.12762297, 17.3624437, 17.60005585, 17.84049621, 18.08377443, 18.329878, 18.57877485, 18.83041754, 19.08474635, 19.34169227, 19.60117968, 19.86312888, 20.12745836, 20.3940868, 20.66293462, 20.93392691, 21.20699305, 21.48206912, 21.75909881, 22.0380343, 22.31883709, 22.60147865, 22.88594093, 23.17221677, 23.46031012, 23.75023626, 24.04202158, 24.33570429, 24.63133325, 24.92896835, 25.22868007, 25.5305491, 25.83466581, 26.14112991, 26.45004964, 26.76154129, 27.07572865, 27.39274198, 27.71271759, 28.03579694, 28.36212579, 28.69185351, 29.02513239, 29.36211644, 29.70296069, 30.04782073, 30.39685131, 30.75020585, 31.10803553, 31.47048848, 31.83770901, 32.2098371, 32.58700628, 32.96934568, 33.35697585, 33.75001097, 34.14855665, 34.55270981, 34.96255799, 35.37817885, 35.79963916, 36.2269949, 36.66029091, 37.09955982, 37.54482215, 37.99608589, 38.45334608, 38.91658465, 39.38577014, 39.86085756, 40.3417882, 40.82848957, 41.32087531, 41.8188452, 42.32228515, 42.83106725, 43.34504991, 43.86407795, 44.38798278, 44.91658265, 45.44968284, 45.98707597, 46.52854232, 47.07385017, 47.62275619, 48.17500585, 48.73033386, 49.28846466, 49.84911291, 50.41198402, 50.9767747, 51.54317357, 52.11086123, 52.67951305, 53.2487963, 53.81837358, 54.38790173, 54.95703466, 55.52542195, 56.0927106, 56.65854557, 57.22257051, 57.78442851, 58.34376285, 58.90021802, 59.45343918, 60.00307549, 60.5487783, 61.09020319, 61.62701045, 62.15886584, 62.68544133, 63.20641583, 63.72147556, 64.2303163, 64.73264089, 65.22816347, 65.7166078, 66.19770861, 66.67121259, 67.13687835, 67.59447719, 68.04379345, 68.4846261, 68.91678763, 69.34010551, 69.75442235, 70.15959636, 70.55550168, 70.94202872, 71.31908448, 71.68659282, 72.04449469, 72.39274832, 72.73132942, 73.06023127, 73.37946482, 73.68905842, 73.98905915, 74.27953085, 74.5605553, 74.83223179, 75.09467698, 75.34802466, 75.5924255, 75.82804673, 76.05507182, 76.27369999, 76.48414576, 76.68663841, 76.88142138, 77.06875157, 77.24889863, 77.42214413, 77.58878071, 77.74911109, 77.90344707, 78.05210841, 78.19542171, 78.33371911, 78.46733702, 78.59661472, 78.72189292, 78.84351231, 78.96181194, 79.07712765, 79.18979044, 79.30012477, 79.40844685, 79.51506292, 79.62026752, 79.72434173, 79.82755144, 79.9301456, 80.03235456, 80.13438837, 80.23643485, 80.33865934, 80.44120111, 80.54417335, 80.64766146, 80.75172168, 80.85638, 80.96163098, 81.06743678, 81.17372627, 81.28039424, 81.38730069, 81.49427023, 81.60109165, 81.70751748, 81.8132637, 81.91800816, 82.02139464, 82.12302792, 82.22248225, 82.3192791, 82.41291688, 82.50285304, 82.58850833, 82.66926695, 82.74447678, 82.81344962, 82.87546122, 82.92975179, 82.95375457],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P95% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [90.66354871, 91.12706971, 92.12167631, 93.08254082, 94.00872819, 94.89974364, 95.75551171, 96.57635253, 97.36295103, 98.11632342, 98.83778417, 99.52890698, 100.191497, 100.8275527, 101.4726459, 102.112939, 102.7494191, 103.3829734, 104.0143944, 104.6443859, 105.2735676, 105.9024803, 106.5315907, 107.161296, 107.7919282, 108.4237579, 109.0569988, 109.6918111, 110.3283052, 110.9665451, 111.6065515, 112.2483051, 112.8917498, 113.536795, 114.1833188, 114.8311708, 115.4801741, 116.1301284, 116.780812, 117.4319846, 118.0833889, 118.7347537, 119.3857953, 120.03622, 120.685726, 121.3340057, 121.9807474, 122.6256361, 123.2683596, 123.9086035, 124.5460585, 125.1804203, 125.8113907, 126.4386798, 127.0620077, 127.6811055, 128.2957169, 128.9056, 129.5105281, 130.1102914, 130.7046982, 131.2935761, 131.876773, 132.4541587, 133.025626, 133.5910912, 134.150496, 134.7038082, 135.2510227, 135.7921628, 136.3272809, 136.8564598, 137.3798137, 137.8974887, 138.4096645, 138.9165546, 139.4184075, 139.9155075, 140.4081749, 140.8967672, 141.3816789, 141.8633417, 142.3422248, 142.818834, 143.2937108, 143.7674316, 144.2406053, 144.7138712, 145.1878952, 145.6633664, 146.1409913, 146.6214882, 147.1055797, 147.5939843, 148.0874065, 148.586526, 149.0919854, 149.6043767, 150.1242269, 150.6519828, 151.1879951, 151.7325029, 152.2856189, 152.8473131, 153.4174019, 153.9955367, 154.581196, 155.1736815, 155.7721177, 156.3754566, 156.9824866, 157.591847, 158.2020466, 158.8114866, 159.4184879, 160.0213216, 160.6182378, 161.2075007, 161.7874182, 162.3563754, 162.9128551, 163.4554684, 163.9829705, 164.4942764, 164.9884705, 165.4648118, 165.9227345, 166.3618445, 166.7819123, 167.1828627, 167.5647631, 167.9278093, 168.2723104, 168.5986736, 168.9073892, 169.1990151, 169.474163, 169.7334849, 169.9776618, 170.207392, 170.4233822, 170.6263392, 170.8169629, 170.9959407, 171.1639423, 171.3216174, 171.469589, 171.6084579, 171.7387957, 171.8611461, 171.9760242, 172.0839168, 172.1852824, 172.2805514, 172.3701297, 172.4543957, 172.5337038, 172.6083849, 172.6787478, 172.7450799, 172.8076491, 172.8667045, 172.9224777, 172.9751838, 173.025023, 173.0721808, 173.1168298, 173.1591301, 173.1992303, 173.2372685, 173.2733728, 173.3076624, 173.3402478, 173.3712319, 173.4007102, 173.4287717, 173.455499, 173.4809691, 173.5052538, 173.5284198, 173.5505296, 173.5716411, 173.5918087, 173.6110831, 173.6295117, 173.6471389, 173.6640061, 173.6801522, 173.6956138, 173.710425, 173.7246179, 173.7382228, 173.751268, 173.7637802, 173.7757847, 173.787305, 173.7983636, 173.8089816, 173.8191789, 173.8289744, 173.8383858, 173.8474302, 173.8561235, 173.8644808, 173.8725166, 173.8802445, 173.8876774, 173.8948277, 173.9017071, 173.9083268, 173.9146973, 173.9208289, 173.9267311, 173.9324132, 173.9378839, 173.9431517, 173.9482244, 173.9506901],
          spanGaps: false,
        }
        ,

        {
          yAxisID: 'y2',
          label: 'P97% Weight',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(225,0,0,0.4)',
          borderColor: 'red', // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'black',
          pointBackgroundColor: 'white',
          pointBorderWidth: 0.5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'yellow',
          pointHoverBorderColor: 'brown',
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: true
          data: [15.00156359, 15.1183895, 15.35122084, 15.58362686, 15.8163176, 16.0499034, 16.28490586, 16.52176469, 16.76084508, 17.00244749, 17.24680927, 17.49411514, 17.74450372, 17.9980699, 18.25487219, 18.51493707, 18.77826268, 19.04482627, 19.31458378, 19.58747608, 19.86343169, 20.14236985, 20.42420335, 20.70884106, 20.99619028, 21.28615884, 21.57865549, 21.8735972, 22.17090276, 22.47049907, 22.7723211, 23.07631287, 23.3824283, 23.69063187, 24.00089913, 24.31321719, 24.62758492, 24.94401317, 25.26252369, 25.5831532, 25.90594748, 26.23096473, 26.55827443, 26.88795694, 27.2201029, 27.55481321, 27.89219758, 28.2323743, 28.57547042, 28.92161906, 29.27096042, 29.62364011, 29.97980811, 30.33961853, 30.70322948, 31.07080008, 31.44248988, 31.81846107, 32.19887352, 32.58388611, 32.97365535, 33.3683346, 33.76807319, 34.17301785, 34.5833014, 34.99906317, 35.42042208, 35.84749737, 36.28039703, 36.71922013, 37.16405609, 37.61498429, 38.07206991, 38.53536809, 39.00492396, 39.48076746, 39.96291669, 40.45137672, 40.94613881, 41.44718044, 41.95446506, 42.46794195, 42.98754609, 43.51319807, 44.04480409, 44.58225593, 45.12543098, 45.67419242, 46.22838923, 46.78785646, 47.3524154, 47.92187383, 48.49602631, 49.07465451, 49.65752758, 50.24440253, 50.83502464, 51.42912799, 52.02643587, 52.62666135, 53.22950783, 53.8346696, 54.44183245, 55.0506743, 55.66086287, 56.27206944, 56.88394797, 57.49615297, 58.10832895, 58.72012509, 59.33118206, 59.94113978, 60.54963673, 61.15631078, 61.76079992, 62.36274309, 62.96178288, 63.55755646, 64.14971608, 64.73791012, 65.32179369, 65.90102746, 66.47527837, 67.04422046, 67.60753554, 68.16491273, 68.7160548, 69.26066574, 69.7984699, 70.32919455, 70.85258197, 71.36838696, 71.87637634, 72.37632936, 72.86803693, 73.35131006, 73.82596855, 74.2918484, 74.74880046, 75.19669066, 75.63540025, 76.0648259, 76.48487978, 76.8954897, 77.29659902, 77.68816668, 78.0701671, 78.44259001, 78.80544037, 79.15873364, 79.5025122, 79.83682168, 80.16172522, 80.47729968, 80.78363524, 81.08083497, 81.36901438, 81.64830091, 81.91883344, 82.18076174, 82.43424593, 82.67945587, 82.91657062, 83.1457778, 83.36727297, 83.581259, 83.78794544, 83.98754779, 84.18028693, 84.36638832, 84.54608137, 84.71959869, 84.88717537, 85.04904822, 85.205455, 85.35663368, 85.50282159, 85.64425466, 85.78116658, 85.91378798, 86.04234557, 86.16706131, 86.28815157, 86.40582627, 86.52028803, 86.63173131, 86.74034162, 86.84629466, 86.9497625, 87.05088422, 87.14980899, 87.24666536, 87.34156823, 87.43461808, 87.52590032, 87.61548453, 87.70342388, 87.78975439, 87.87449436, 87.95764367, 88.03918325, 88.11907438, 88.19725823, 88.27365525, 88.34816753, 88.42066003, 88.49100174, 88.55903385, 88.62454872, 88.68734305, 88.74718402, 88.80381758, 88.85696942, 88.90634626, 88.95164479, 88.99252982, 89.02866893, 89.04485133],
          spanGaps: true,
        }
        ,
        {
          yAxisID: 'y1',
          label: 'P97% Stature',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(167,105,0,0.4)',
          borderColor: 'rgb(167, 105, 0)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: 'black',
          pointBorderWidth: 0.1,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: 'brown',
          pointHoverBorderColor: 'yellow',
          pointHoverBorderWidth: 2,
          pointRadius: 0.1,
          pointHitRadius: 2,
          // notice the gap in the data and the spanGaps: false
          data: [91.47728689, 91.94741225, 92.95684975, 93.9320912, 94.87214661, 95.77649339, 96.64504712, 97.47813528, 98.27646264, 99.04107435, 99.77332166, 100.4748164, 101.1474075, 101.7931359, 102.448488, 103.0991159, 103.7460086, 104.3900531, 105.0320405, 105.6726719, 106.3125633, 106.9522508, 107.5921959, 108.2327896, 108.8743573, 109.5171624, 110.1614111, 110.8072554, 111.4547971, 112.1040915, 112.7551501, 113.4079442, 114.0624076, 114.7184401, 115.3759096, 116.0346553, 116.6944901, 117.3552032, 118.0165629, 118.6783183, 119.3402023, 120.0019338, 120.6632194, 121.3237564, 121.9832342, 122.6413368, 123.297745, 123.9521353, 124.6041916, 125.2535916, 125.9000218, 126.5431735, 127.1827453, 127.8184451, 128.4499914, 129.0771148, 129.69956, 130.3170863, 130.9294701, 131.5365053, 132.1380052, 132.7338033, 133.323755, 133.9077383, 134.4856552, 135.0574328, 135.6230245, 136.1824107, 136.7356, 137.2826306, 137.8235707, 138.3585197, 138.8876092, 139.411004, 139.9289024, 140.4415378, 140.9491785, 141.4521292, 141.9507308, 142.4453609, 142.936434, 143.4244013, 143.9097502, 144.3930034, 144.8747179, 145.3554829, 145.8359173, 146.3166671, 146.798401, 147.2818057, 147.7675803, 148.2564292, 148.7490543, 149.2461456, 149.7483713, 150.2563656, 150.7707169, 151.2919534, 151.8205297, 152.3568114, 152.9010603, 153.4534201, 154.0139039, 154.5823786, 155.1585578, 155.741993, 156.3320686, 156.9280012, 157.5288429, 158.1334886, 158.740688, 159.3490618, 159.9571223, 160.5632969, 161.1659545, 161.7634371, 162.3540831, 162.9362629, 163.5084028, 164.0690181, 164.6167234, 165.1502647, 165.6685285, 166.1705539, 166.6555396, 167.1228459, 167.5719943, 168.0026622, 168.4146759, 168.8080012, 169.1827317, 169.5390766, 169.8773471, 170.1979436, 170.5013414, 170.7880784, 171.0587419, 171.3139575, 171.5543778, 171.780673, 171.9935219, 172.1936047, 172.3815959, 172.5581591, 172.7239426, 172.8795764, 173.0256638, 173.1627906, 173.2915138, 173.4123635, 173.5258431, 173.6324287, 173.7325694, 173.8266863, 173.9151788, 173.9984185, 174.0767538, 174.1505102, 174.2199918, 174.2854819, 174.3472447, 174.405526, 174.4605545, 174.5125428, 174.5616886, 174.6081757, 174.6521747, 174.6938442, 174.7333314, 174.7707732, 174.8062967, 174.8400201, 174.8720532, 174.902498, 174.9314494, 174.9589959, 174.9852197, 175.0101973, 175.034, 175.0566944, 175.0783424, 175.099002, 175.1187272, 175.1375685, 175.155573, 175.1727851, 175.1892459, 175.2049944, 175.2200667, 175.2344971, 175.2483174, 175.2615577, 175.2742464, 175.2864101, 175.2980736, 175.3092608, 175.3199938, 175.3302936, 175.3401801, 175.349672, 175.358787, 175.367542, 175.3759527, 175.3840343, 175.391801, 175.3992664, 175.4064433, 175.4133439, 175.4199799, 175.4263623, 175.4325015, 175.4384076, 175.4440902, 175.4495583, 175.4548206, 175.4598853, 175.4647604, 175.4671292],
          spanGaps: false,
        }




      ]
    };
    this.options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          id: 'y1',
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 200
          },
          scaleLabel: {
            display: true,
            labelString: 'Height (cm)',
            fontSize: 20
          }
        },
        {
          id: 'y2',
          position: 'right',
          ticks: {
            beginAtZero: false,
            min: 0,
            max: 200
          },
          scaleLabel: {
            display: true,
            labelString: 'Weight (kg)',
            fontSize: 20
          }
        }],
        xAxes: [{
          id: 'x1',
          display: false
        },
        {
          id: 'x2',
          type: 'linear',
          position: 'bottom',
          ticks: {
            max: 20,
            min: 2,
            stepSize: 1
          },
          scaleLabel: {
            display: true,
            labelString: 'Age (Years)',
            fontSize: 20
          }
        }]
      }
    };



    this.data = this.constFemaleData;
  }

  //#endregion



  openAddPopup() {

    this.modalEdit.show();
    this.label = "Select Student";
  }

  medicalCheckup() {
    this.router.navigate(['school/students-checkup']);
  }
  SaveCheckupHeader() {
    this.ShowHideSpiner(true);

    if (!this.record.studentid) {
      this.showError("select student");
      return;
    }


    this.http.put<EntityOperationResult>(this.rootUrl + 'studentsCheckup', this.record).subscribe(data => {
      if (data.isSuccess == true) {
        this.showSuccess(data.successMessage);
        this.record.id = data.id;
        this.gneralExamItem = new GeneralExamItem();
        this.ShowHideSpiner(false);
      }
      else {
        this.showError(data.error);

        this.ShowHideSpiner(false);
      }
    },
      error => {
        this.ShowHideSpiner(false);
        this.modalEdit.hide();
        this.showError(error.error.error);

        // console.log(JSON.stringify(error));
      });
  }

  ShowHideSpiner(isShow) {
    // this function take an boolean value and then is does spinner show of hide
    // and also button disable of enable

    if (isShow === true) {
      this.isLoading = true;
      this.progress = 0; // starts spinner
      this.isAactionBtn = true; // disable button
    } else {
      this.isLoading = false;
      this.progress = false; // stops spinner
      this.isAactionBtn = false; // enable button
    }
  }
  Update(item) { }
  Edit(item) {
    this.label = 'Edit Medical Checkup';

  }

  Cancel() {

    this.modalEdit.hide();
  }

  Delete(item) { }

  handleOralRatingCancel() {
    this.oralRatingMsg = 'Not-Rated';
    this.dentalExamItem.overoralhealth = 0;
  }
  handleOralRating(e) {
    // this.dentalExamItem.overoralhealth = e.value;
    console.log(e.value);
    if (this.dentalExamItem.overoralhealth === 4) {
      this.oralRatingMsg = 'Excellent';
    }
    if (this.dentalExamItem.overoralhealth === 3) {
      this.oralRatingMsg = 'Good';
    }
    if (this.dentalExamItem.overoralhealth === 2) {
      this.oralRatingMsg = 'Fair';
    }
    if (this.dentalExamItem.overoralhealth === 1) {
      this.oralRatingMsg = 'Poor';
    }
  }

  saveGeneral() {
    if (this.gneralExamItem.id > 0) {
      //update
      this.gneralExamItem.headerid = this.record.id;
      this.gneralExamItem.lastupdatedby = this.currentUserId;
      this.ShowHideSpiner(true);
      this.http.post<EntityOperationResult>(this.rootUrl + 'generalexam', this.gneralExamItem).subscribe(data => {
        if (data.isSuccess == true) {
          this.showSuccess(data.successMessage);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }
        else {
          this.showError(data.error);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }

      }, error => {

        console.log(JSON.stringify(error));
        this.ShowHideSpiner(false);
        this.spinnerCubeDisplay = false;
      });

    }
    else {
      //insert
      this.gneralExamItem.headerid = this.record.id;
      this.gneralExamItem.createdby = this.currentUserId;
      this.gneralExamItem.lastupdatedby = this.currentUserId;
      this.ShowHideSpiner(true);
      this.http.put<EntityOperationResult>(this.rootUrl + 'generalexam', this.gneralExamItem).subscribe(data => {
        if (data.isSuccess == true) {
          this.gneralExamItem.id = data.id;
          this.showSuccess(data.successMessage);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }
        else {
          this.showError(data.error);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }

      }, error => {

        console.log(JSON.stringify(error));
        this.ShowHideSpiner(false);
        this.spinnerCubeDisplay = false;
      });

    }
  }
  saveEyes() {

    if (this.eyeExamItem.id > 0) {
      //update
      this.eyeExamItem.headerid = this.record.id;
      this.eyeExamItem.lastupdatedby = this.currentUserId;
      this.ShowHideSpiner(true);
      this.http.post<EntityOperationResult>(this.rootUrl + 'eyeexam', this.eyeExamItem).subscribe(data => {
        if (data.isSuccess == true) {

          this.showSuccess(data.successMessage);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }
        else {
          this.showError(data.error);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }

      }, error => {

        console.log(JSON.stringify(error));
        this.ShowHideSpiner(false);
        this.spinnerCubeDisplay = false;
      });

    }
    else {
      //insert
      this.eyeExamItem.headerid = this.record.id;
      this.eyeExamItem.createdby = this.currentUserId;
      this.eyeExamItem.lastupdatedby = this.currentUserId;
      this.ShowHideSpiner(true);
      this.http.put<EntityOperationResult>(this.rootUrl + 'eyeexam', this.eyeExamItem).subscribe(data => {
        if (data.isSuccess == true) {
          this.eyeExamItem.id = data.id;
          this.showSuccess(data.successMessage);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }
        else {
          this.showError(data.error);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }

      }, error => {

        console.log(JSON.stringify(error));
        this.ShowHideSpiner(false);
        this.spinnerCubeDisplay = false;
      });

    }
  }
  saveEnt() {
    if (this.entExamItem.id > 0) {
      //update
      this.entExamItem.headerid = this.record.id;
      this.entExamItem.lastupdatedby = this.currentUserId;
      this.ShowHideSpiner(true);
      this.http.post<EntityOperationResult>(this.rootUrl + 'entexam', this.entExamItem).subscribe(data => {
        if (data.isSuccess == true) {
          this.showSuccess(data.successMessage);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }
        else {
          this.showError(data.error);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }

      }, error => {

        console.log(JSON.stringify(error));
        this.ShowHideSpiner(false);
        this.spinnerCubeDisplay = false;
      });

    }
    else {
      //insert
      this.entExamItem.headerid = this.record.id;
      this.entExamItem.createdby = this.currentUserId;
      this.entExamItem.lastupdatedby = this.currentUserId;
      this.ShowHideSpiner(true);
      this.http.put<EntityOperationResult>(this.rootUrl + 'entexam', this.entExamItem).subscribe(data => {
        if (data.isSuccess == true) {
          this.entExamItem.id = data.id;
          this.showSuccess(data.successMessage);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }
        else {
          this.showError(data.error);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }

      }, error => {

        console.log(JSON.stringify(error));
        this.ShowHideSpiner(false);
        this.spinnerCubeDisplay = false;
      });

    }
  }
  saveDental() {
    if (this.dentalExamItem.id > 0) {
      //update
      this.dentalExamItem.headerid = this.record.id;
      this.dentalExamItem.lastupdatedby = this.currentUserId;
      this.ShowHideSpiner(true);
      this.http.post<EntityOperationResult>(this.rootUrl + 'dentalexam', this.dentalExamItem).subscribe(data => {
        if (data.isSuccess == true) {
          this.showSuccess(data.successMessage);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }
        else {
          this.showError(data.error);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }

      }, error => {

        console.log(JSON.stringify(error));
        this.ShowHideSpiner(false);
        this.spinnerCubeDisplay = false;
      });

    }
    else {
      //insert
      this.dentalExamItem.headerid = this.record.id;
      this.dentalExamItem.createdby = this.currentUserId;
      this.dentalExamItem.lastupdatedby = this.currentUserId;
      this.ShowHideSpiner(true);
      this.http.put<EntityOperationResult>(this.rootUrl + 'dentalexam', this.dentalExamItem).subscribe(data => {
        if (data.isSuccess == true) {
          this.dentalExamItem.id = data.id;
          this.showSuccess(data.successMessage);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }
        else {
          this.showError(data.error);
          this.ShowHideSpiner(false);
          this.spinnerCubeDisplay = false;
        }

      }, error => {

        console.log(JSON.stringify(error));
        this.ShowHideSpiner(false);
        this.spinnerCubeDisplay = false;
      });

    }
  }
  showSuccess(msg) {

    this.toasterService.pop('success', 'Success', msg);
  }

  showError(msg) {

    this.toasterService.pop('error', 'Error', msg);
  }

  getTestModel(): CheckupItem {
    const ret: CheckupItem = new CheckupItem();
    ret.id = 100;
    ret.checkupdatems = 1515090600;
    ret.schoolid = 3
    return ret;
  }


}
// classes for the page
class CheckupItem {

  id: number;
  checkupdatems: number;
  schoolid: number;
  schoolname: string;
  schoolcity: string;
  comments: string;
  studentid: number;
  studentname: string;
  dobms: number;
  studentgender: string;
  studentage: number;
  generalexam: GeneralExamItem;
  eyeexam: EyeExamItem;
  entexam: EntExamItem;
  dentalexam: DentalExamItem;
  age: number;
  diff_years(dt2, dt1) {
    let diff: number = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25));
  }
  get agestring(): string {
    const now = new Date();
    const examDate = new Date(this.checkupdatems);
    const dobfromms = new Date(this.dobms);
    let dob: any = null;
    let ret: any = null;
    if (dobfromms) {
      dob = new Date(dobfromms.getFullYear(), dobfromms.getMonth() + 1, dobfromms.getDate());
      ret = this.diff_years(examDate, dob);
    }

    return ret ? ret.toString() : '';
  }
}

class GeneralExamItem {
  id: number;
  headerid: number;
  createdby: number;
  createdbyname: string;
  creationdatetimems: number;
  lastupdatedby: number;
  lastupdatedbyname: string;
  lastupdatetimems: number;
  complaints: string;

  squint: string;
  vitamindef: string;
  headnscalp: string;
  lymphnodes: string;
  pallor: string;
  nails: string;
  bonesnjoints: string;
  skin: string;
  allergies: string;
  perabdomen: string;
  nervoussystem: string;
  respiratory: string;
  cardio: string;
  closingcomments: string;
  heightincm: number;
  weightinkg: number;
}

class EyeExamItem {
  id: number;
  headerid: number;
  createdby: number;
  createdbyname: string;
  creationdatetimems: number;
  lastupdatedby: number;
  lastupdatedbyname: string;
  lastupdatetimems: number;
  eyes_refraction: string;
  eyes_covertest: string;
  eyes_acuity: string;
  eyes_fundus: string;
  eyes_color: string;
  eyes_squint: string;
  eyes_comments: string;

}

class EntExamItem {
  id: number;
  headerid: number;
  createdby: number;
  createdbyname: string;
  creationdatetimems: number;
  lastupdatedby: number;
  lastupdatedbyname: string;
  lastupdatetimems: number;
  ent_prepostaural: string;
  ent_externalearinfection: string;
  ent_tympanicmembrane: string;
  ent_ottitismedia: string;
  ent_nasalseptum: string;
  ent_nasalcavities: string;
  ent_oralmucosa: string;
  ent_tongue: string;
  ent_necknodes: string;
  ent_comments: string;
}

class DentalExamItem {
  id: number;
  headerid: number;
  createdby: number;
  createdbyname: string;
  creationdatetimems: number;
  lastupdatedby: number;
  lastupdatedbyname: string;
  lastupdatetimems: number;
  deciduousdentition: boolean;
  transitionaldentition: boolean;
  permanentdentition: boolean;
  normalocclusion: boolean;
  malalignedteeth: boolean;
  overretainedteeth: boolean;
  normalgingiva: boolean;
  ulcerinflamation: boolean;
  recommend_obviouscavaties: boolean;
  recommend_dentalcheckup: boolean;
  recommend_improvehomeoralcare: boolean;
  recommend_fast: boolean;
  recommend_urgentdentistvisit: boolean;
  recommend_orthodonticevaluation: boolean;
  overoralhealth: number;
  closing_comments: string;
  carious_lua: boolean;
  carious_lla: boolean;
  carious_rua: boolean;
  carious_rla: boolean;
  carious_lub: boolean;
  carious_llb: boolean;
  carious_rub: boolean;
  carious_rlb: boolean;
  carious_luc: boolean;
  carious_llc: boolean;
  carious_ruc: boolean;
  carious_rlc: boolean;
  carious_lud: boolean;
  carious_lld: boolean;
  carious_rud: boolean;
  carious_rld: boolean;
  carious_lue: boolean;
  carious_lle: boolean;
  carious_rue: boolean;
  carious_rle: boolean;
  carious_lu8: boolean;
  carious_ll8: boolean;
  carious_ru8: boolean;
  carious_rl8: boolean;
  carious_lu7: boolean;
  carious_ll7: boolean;
  carious_ru7: boolean;
  carious_rl7: boolean;
  carious_lu6: boolean;
  carious_ll6: boolean;
  carious_ru6: boolean;
  carious_rl6: boolean;
  carious_lu5: boolean;
  carious_ll5: boolean;
  carious_ru5: boolean;
  carious_rl5: boolean;
  carious_lu4: boolean;
  carious_ll4: boolean;
  carious_ru4: boolean;
  carious_rl4: boolean;
  carious_lu3: boolean;
  carious_ll3: boolean;
  carious_ru3: boolean;
  carious_rl3: boolean;
  carious_lu2: boolean;
  carious_ll2: boolean;
  carious_ru2: boolean;
  carious_rl2: boolean;
  carious_lu1: boolean;
  carious_ll1: boolean;
  carious_ru1: boolean;
  carious_rl1: boolean;
}


class EntityOperationResult {
  isSuccess: boolean;
  id: number;
  error: string;
  successMessage: string;
}

class EditStudentData {
  id: number;
  studentid: number;
  schoolid: number;
  fullname: string;
  firstname: string;
  lastname: string;
  dob: string;
  fathername: string;
  mothername: string;
  studentgender: string;
  studentclass: number;
  studentsection: string;
  isactive: boolean;
  notes: string;
  middlename: string;
  dobms: number;

}

