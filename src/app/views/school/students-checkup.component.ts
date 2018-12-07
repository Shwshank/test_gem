import { Component, ViewChild, ElementRef,ViewEncapsulation  } from '@angular/core';
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
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/message';
@Component({
  
  templateUrl: 'students-checkup.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss',
   '../../../../node_modules/spinkit/css/spinkit.css'
   ,"../../../../node_modules/font-awesome/css/font-awesome.min.css",
   "../../../../node_modules/primeng/resources/themes/omega/theme.css",
   "../../../../node_modules/primeng/resources/primeng.min.css",
   "../../../../src/scss/vendors/bs-datepicker/bs-datepicker.scss"],
  encapsulation: ViewEncapsulation.None
})
export class StudentsCheckupComponent implements OnInit {

  @ViewChild('EditModal') modalEdit: any;
  private toasterService: ToasterService;

  public toasterconfig : ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
   //

    maxDate = new Date();
    
  //here 30 is day 24 is hour 60 is minute, 60 is seconds,1000 is milliseconds
  //we creating 30 days ago for starting range date picker
  //if you want to change then only change 30 value acccording to your day
    bsRangeValue: any = [new Date(new Date().getTime()-(180*24*60*60*1000)), new Date()];

  selectedSchoolId:null;//here we declre selectedschoolId=null
  gender:string="*";//here we assiging * for all types of gender by default
  School_Data: SchoolData;//here passing reference of School data type
  offset:number;//for skipping records
  limit=10;//this is the number of record per page limit
  skip:number=0;
  rootUrl:string;//url root where call hit
  filterKeys:string="";//this is use as variable for elastic search
  studNameOrId:string="";
  StudentCheckup_Data: StudentCheckupData;//here creating an variable of student data type
  Edit_StudentCheckupData:EditStudentCheckupData;//here creating an variable of editstudent data type

  label:string;
  spinnerCubeDisplay=false;//defining variable for spinner
  isLoading=true;
  progress:number|boolean;//
  isAactionBtn=false;//for button to disable aur enable variable declaration


  constructor(private http: HttpClient,toasterService: ToasterService,private auth:AuthenticationService,private router: Router) {
    this.toasterService = toasterService;
    this.rootUrl=auth.apiUrl;
    }
  ngOnInit (): void {
    this.StudentCheckup_Data=new StudentCheckupData();//asigning object/instantiate object/
    this.Edit_StudentCheckupData=new EditStudentCheckupData();
    this.School_Data=new SchoolData();
    this.LoadSchoolList();
    this.search(false);
   }

   
   RadioClicked(genderType)
   {
   
  this.gender=genderType;
  this.search(false);
   }

search(isPagedCall)
{
  this.spinnerCubeDisplay= true;
  var url="studentsCheckup?";
  if(this.limit!=0)
  url+='limit='+this.limit;
  if(this.studNameOrId!="")
  url+='&searchTerms='+this.studNameOrId;
  if(this.selectedSchoolId!=null)
  url+='&schoolId='+this.selectedSchoolId;
//  if(this.bsRangeValue!=null)
//  {

//      url+='&fromYear='+new Date(this.bsRangeValue[0]).getFullYear();
//      url+='&toYear='+new Date(this.bsRangeValue[1]).getFullYear();

//  }
if(this.bsRangeValue!=null)
 {
     var frmDate=new Date(this.bsRangeValue[0]);
     frmDate.setHours(0);
     frmDate.setMinutes(0)
     frmDate.setSeconds(0);


     var toDate=new Date(this.bsRangeValue[1]);
     toDate.setHours(0);
     toDate.setMinutes(0)
     toDate.setSeconds(0);
    
     url+='&fromDateMs='+frmDate.getTime();
     url+='&toDateMs='+(toDate.getTime()+86400000);

 }
 if(isPagedCall)
 {
  if(this.skip!=0)
  url+='&offset='+this.skip;
 }
  if(this.gender!="")
  url+='&gender='+this.gender;

    this.ShowHideSpiner(true);
    this.http.get<StudentCheckupData>(this.rootUrl + url).subscribe(data => {
    this.StudentCheckup_Data = data;
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

 
  var rowData = this.School_Data.rows.find(d => d.id === this.selectedSchoolId);
  if(rowData)
  {
    this.router.navigate(['school/checkup'],{queryParams:{schoolid:this.selectedSchoolId,schoolname:rowData.schoolname,schoolcity:rowData.city}});
  }

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



  if(this.selectedSchoolId)
  {
   item.schoolid=this.selectedSchoolId;
  }
  else
  {
    this.showError("Please Select School");
  }
  this.ShowHideSpiner(true);
  this.http.put<EntityOperationResult>(this.rootUrl + 'studentsCheckup',item).subscribe(data => {
    if(data.isSuccess==true)
    {
      this.showSuccess(data.successMessage);
      this.modalEdit.hide();
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

    this.ShowHideSpiner(true);
    this.http.post<EntityOperationResult>(this.rootUrl + 'studentsCheckup',this.Edit_StudentCheckupData).subscribe(data => {

      if(data.isSuccess==true)
   {
   let index = this.StudentCheckup_Data.rows.findIndex(d => d.id === item.id); //find index in your array
   this.StudentCheckup_Data.rows[index]=this.Edit_StudentCheckupData;

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
  //this.label="Edit Student";
  this.router.navigate(['school/checkup'],{queryParams:{schoolid:item.schoolid,headerid:item.id}});
  //this.modalEdit.show();
  this.Edit_StudentCheckupData = Object.assign({}, item);//here we break reference and for nested object use this(let copy =JSON.parse(JSON.stringify(myObject)))

}

Cancel()
{
  this.modalEdit.hide();
}

  Delete(item)
{

 if(confirm("Are you sure to delete "+item.studentname)) {

  this.spinnerCubeDisplay= true;
  this.http.delete<EntityOperationResult>(this.rootUrl + 'studentsCheckup/'+item.id).subscribe(data => {

   if(data.isSuccess==true)
   {
   let index = this.StudentCheckup_Data.rows.findIndex(d => d.id === item.id); //find index in your array
 this.StudentCheckup_Data.rows.splice(index, 1);
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
class StudentCheckupData {
  total:number;
  current: number;
  rowCount: number;
  rows:[{
        id :number;
        checkupdate :string;
        checkupdatems :number;
        dob :string;
        schoolid :number;
        schoolname :string;
        schoolcity :string;
        comments :string;
        studentid :number;
        studentsixdigitid :string;
        studentname :string;
        studentgender :string;
        doctors :string;
        studentclass :number;
        student_class :string;
        studentsection :string;
  }];


}

   class EntityOperationResult
  {
    isSuccess:boolean;
    id :number;
    error :string;
    successMessage:string;
  }
   class EditStudentCheckupData{
        id :number;
        checkupdate :string;
        checkupdatems :number;
        dob :string;
        schoolid :number;
        schoolname :string;
        schoolcity :string;
        comments :string;
        studentid :number;
        studentsixdigitid :string;
        studentname :string;
        studentgender :string;
        doctors :string;
        studentclass :number;
        student_class :string;
        studentsection :string;
    }
    class SchoolData {
      total:number;
      rows:[{
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
