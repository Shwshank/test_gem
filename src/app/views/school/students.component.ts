import { Component, ViewChild, ElementRef,ViewEncapsulation, Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Body } from '@angular/http/src/body';
import { error } from 'util';
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
import { AuthenticationService } from './../../services/authentication.service';
//ng select
import {NgSelectModule} from '@ng-select/ng-select';
// import { Input } from '@syncfusion/ej2-ng-inputs';
// import { EventEmitter } from 'selenium-webdriver';
@Component({
  templateUrl: 'students.component.html', selector:'student-master',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss',
   '../../../../node_modules/spinkit/css/spinkit.css'
   ,"../../../../node_modules/font-awesome/css/font-awesome.min.css",
   "../../../../node_modules/primeng/resources/themes/omega/theme.css",
   "../../../../node_modules/primeng/resources/primeng.min.css",
   "../../../../src/scss/vendors/bs-datepicker/bs-datepicker.scss"],
  encapsulation: ViewEncapsulation.None
})
export class StudentsComponent implements OnInit {
  @Input() schoolId:number;
  @Output() selectEvent=new EventEmitter();
  rangeValues: number[] = [3,17];//range slider default selected values
  @ViewChild('EditModal') modalEdit: any;

  private toasterService: ToasterService;

  public toasterconfig : ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

   maxDate = new Date();

   bsValue: Date = new Date();



   //
   SCHOONAME:string;
  selectedSchoolId:number;//here we declre selectedschoolId=null
  gender:string="*";//here we assiging * for all types of gender by default
  School_Data: SchoolData;//here passing reference of School data type
  offset:number;//for skipping records
  limit=10;//this is the number of record per page limit
  skip:number=0;
  rootUrl:string;//url root where call hit
  filterKeys:string="";//this is use as variable for elastic search
  studNameOrId:string="";
  Student_Data: StudentData;//here creating an variable of student data type
  Edit_StudentData:EditStudentData;//here creating an variable of editstudent data type

  currentYear=new Date().getFullYear();
  fromYear=this.currentYear-this.rangeValues[1];
  toYear=this.currentYear-this.rangeValues[0];

  label:string;
  spinnerCubeDisplay=false;//defining variable for spinner
  isLoading=true;
  progress:number|boolean;//
  isAactionBtn=false;//for button to disable aur enable variable declaration


  constructor(private http: HttpClient,toasterService: ToasterService,private auth:AuthenticationService) {
    this.toasterService = toasterService;
    this.rootUrl=auth.apiUrl;
    }
  ngOnInit (): void {
    this.selectedSchoolId = this.schoolId;
    this.Student_Data=new StudentData();//asigning object/instantiate object/
    this.Edit_StudentData=new EditStudentData();
    this.School_Data=new SchoolData();
    this.LoadSchoolList();
    this.search(false);
   }

   rangeSliderChange(e)
   {
    this.fromYear=this.currentYear-e.values[1];
    this.toYear=this.currentYear-e.values[0];

    console.log(e.values[1] +" "+e.values[0]);
    //this.search(false);


   }
   RadioClicked(genderType)
   {
  this.gender=genderType;
  this.search(false);
   }

   SelectStudent(record)
   {
    this.selectEvent.emit(record);
   }
search(isPagedCall)
{
  this.spinnerCubeDisplay= true;
  var url="students?";
  if(this.limit!=0)
  url+='limit='+this.limit;
  if(this.studNameOrId!="")
  url+='&searchTerms='+this.studNameOrId;
  if(this.selectedSchoolId!=null)
  url+='&schoolId='+this.selectedSchoolId;


  if(this.fromYear!=0)
  url+='&fromYear='+this.fromYear;

  if(this.toYear!=0)
  url+='&toYear='+this.toYear;
if(isPagedCall)
{
  if(this.skip!=0)
  url+='&offset='+this.skip;
}
  if(this.gender!="")
  url+='&gender='+this.gender;

    this.ShowHideSpiner(true);
    this.http.get<StudentData>(this.rootUrl + url).subscribe(data => {
    this.Student_Data = data;
    this.ShowHideSpiner(false);
    this.spinnerCubeDisplay= false;
  },error=>{
    console.log(JSON.stringify(error));
    this.ShowHideSpiner(false);
    this.spinnerCubeDisplay= false;
  });

}
LoadSchoolList()
{

  this.spinnerCubeDisplay= true;

  this.http.get<SchoolData>(this.rootUrl + 'schools?all=1').subscribe(data => {
    this.School_Data = data;
    this.spinnerCubeDisplay= false;
  },error=>{
    this.spinnerCubeDisplay= false;
    console.log(JSON.stringify(error));
  });
}//end here page changed function


openAddPopup()
{

  this.modalEdit.show();
  this.label="Add Student";


  this.Edit_StudentData=new EditStudentData();//here we intantiate blank objet
  if(this.selectedSchoolId)
  {
  let record = this.School_Data.rows.find(d => d.id ===this.selectedSchoolId); //find index in your array
  if(record)
  {
    this.SCHOONAME=record.schoolname;
  }
  }
  this.Edit_StudentData.dob=new Date().toString();
  this.Edit_StudentData.isactive=true;
  this.Edit_StudentData.studentgender="m";
}
Action(item)
{
  if(item.id>0)
  {
    this.Update(item);
  }
  else
  {
    this.Save(item);
  }
}
Save(item)
{
  var dt=new Date(item.dob);
  item.dobms=dt.getTime();
  if(this.selectedSchoolId)
  {
   item.schoolid=this.selectedSchoolId;
  }
  else
  {
    this.showError("Please Select School");
  }
  this.ShowHideSpiner(true);
  this.http.put<EntityOperationResult>(this.rootUrl + 'students',item).subscribe(data => {
    if(data.isSuccess==true)
    {
      this.showSuccess(data.successMessage);
      this.modalEdit.hide();
      this.rangeValues = [3,17];//range slider default selected values
      this.studNameOrId=data.splId.toString();
      this.search(false);
      this.ShowHideSpiner(false);
    }
  else
    {
      this.showError(data.error);
      this.modalEdit.hide();
      this.ShowHideSpiner(false);
    }
    },
    error=>
    {
      this.ShowHideSpiner(false);
      this.modalEdit.hide();
      console.log(JSON.stringify(error));
    });
}

 ShowHideSpiner(isShow)
{
    //this function take an boolean value and then is does spinner show of hide
    //and also button disable of enable

    if(isShow==true)
    {
      this.isLoading=true;
      this.progress = 0; // starts spinner
      this.isAactionBtn=true;//disable button
    }
    else
    {
      this.isLoading=false;
      this.progress = false; // stops spinner
      this.isAactionBtn=false;//enable button
    }
}
  Update(item)
  {
    var dt=new Date(item.dob);
    item.dobms=dt.getTime();
    this.ShowHideSpiner(true);
    this.http.post<EntityOperationResult>(this.rootUrl + 'students',this.Edit_StudentData).subscribe(data => {

      if(data.isSuccess==true)
   {
   let index = this.Student_Data.rows.findIndex(d => d.id === item.id); //find index in your array
   this.Student_Data.rows[index]=this.Edit_StudentData;

   var fname=(this.Edit_StudentData.firstname+" "+this.Edit_StudentData.middlename).trim();
   this.Student_Data.rows[index].fullname=(fname+" "+this.Edit_StudentData.lastname).trim();
    this.showSuccess(data.successMessage);
    this.modalEdit.hide();
    this.ShowHideSpiner(false);
   }
   else{
    this.showError(data.error);
    this.modalEdit.hide();
    this.ShowHideSpiner(false);
   }
    },error=>{
      console.log(JSON.stringify(error));
      this.modalEdit.hide();
      this.ShowHideSpiner(false);
    });

  }
  Edit(item)
{
  this.label="Edit Student";
  this.modalEdit.show();
  this.Edit_StudentData = Object.assign({}, item);//here we break reference and for nested object use this(let copy =JSON.parse(JSON.stringify(myObject)))
  this.Edit_StudentData.dob=new Date(this.Edit_StudentData.dobms).toString();
  this.SCHOONAME=item.schoolname;
}

Cancel()
{
  this.modalEdit.hide();
}

  Delete(item)
{

 if(confirm("Are you sure to delete "+item.firstname)) {

  this.spinnerCubeDisplay= true;
  this.http.delete<EntityOperationResult>(this.rootUrl + 'students/'+item.id).subscribe(data => {

   if(data.isSuccess==true)
   {
   let index = this.Student_Data.rows.findIndex(d => d.id === item.id); //find index in your array
 this.Student_Data.rows.splice(index, 1);
  this.spinnerCubeDisplay= false;
  this.showSuccess(data.successMessage);

   }
   else{
    this.spinnerCubeDisplay= false;
    this.showError(data.error);
   }
  },error=>{
    this.spinnerCubeDisplay= false;
    console.log(JSON.stringify(error));
  });
}
}

pageChanged(pageNo)
{

  this.skip=((pageNo-1)*this.limit);
  this.search(true);

}//end here page changed function
showSuccess(msg) {

  this.toasterService.pop('success', 'Success', msg);
}

showError(msg) {

  this.toasterService.pop('error', 'Error', msg);
}

test(vv)
{
  alert(vv);
}

}
class StudentData {
  total: number;
  current: number;
  rowCount: number;
  rows:[{
    id :number;
    studentid :number;
    schoolid :number;
    firstname :string;
    lastname :string;
    dob :string;
    fathername :string;
    mothername :string;
    studentgender :string;
    studentclass :number;
    student_class :string;
    studentsection :string;
    isactive :boolean;
    notes :string;
    middlename :string;
    dobms :number;
    fullname :string;
  }];


}

   class EntityOperationResult
  {
    isSuccess:boolean;
    id :number;
    splId :number;
    error :string;
    successMessage:string;
  }
   class EditStudentData{
    id :number;
    studentid :number;
    schoolid :number;
    firstname :string;
    lastname :string;
    dob :string;
    fathername :string;
    mothername :string;
    studentgender :string;
    studentclass :number;
    student_class :string;
    studentsection :string;
    isactive :boolean;
    notes :string;
    middlename :string;
    dobms :number;
    fullname :string;
    }


    class SchoolData {
      total:number;
      rows:[{
        id: number;
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
