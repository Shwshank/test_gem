import { Component, ViewChild, ElementRef,ViewEncapsulation, Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
import { AuthenticationService } from './../../services/authentication.service';
//ng select
import {NgSelectModule} from '@ng-select/ng-select';

@Component({
  templateUrl: 'parents.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss',
   '../../../../node_modules/spinkit/css/spinkit.css'
   ,"../../../../node_modules/font-awesome/css/font-awesome.min.css",],
  encapsulation: ViewEncapsulation.None
})
export class ParentsComponent implements OnInit {

  @ViewChild('EditModal') modalEdit: any;

  private toasterService: ToasterService;

  public toasterconfig : ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  offset:number;//for skipping records
  limit=10;//this is the number of record per page limit
  skip:number=0;
  rootUrl:string;//url root where call hit
  label:string;
  spinnerCubeDisplay=false;//defining variable for spinner
  isLoading=true;
  progress:number|boolean;//
  isAactionBtn=false;//for button to disable aur enable variable declaration
  Parent_ChildData:ParentChildData;
  currentUserId: number;
  studentSixDigitId:string;

  constructor(private http: HttpClient,toasterService: ToasterService,private auth:AuthenticationService) {
    this.toasterService = toasterService;
    this.rootUrl=auth.apiUrl;
    }
  ngOnInit (): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser)
    {
    this.currentUserId=currentUser.userId;
    }
    this.Parent_ChildData=new ParentChildData();//here initialize blank object

    this.loadParentChild();
   }


openAddPopup()
{

  this.modalEdit.show();
  this.label="Add Child";
}
AddStudent(studentSixDigitId)
{
  this.spinnerCubeDisplay=true;

    //this is for adding child to current parent
    this.http.put<EntityOperationResult>(this.rootUrl + 'parents/'+this.currentUserId+'/'+studentSixDigitId,{}).subscribe(data => {
      if(data.isSuccess==true)
  {
    this.loadParentChild();
    this.showSuccess(data.successMessage);
    this.ShowHideSpiner(false);
    this.spinnerCubeDisplay= false;
  }
  else{
    this.showError(data.error);
    this.ShowHideSpiner(false);
    this.spinnerCubeDisplay= false;
  }
    },error=>{
      console.log(JSON.stringify(error));
      this.spinnerCubeDisplay=false;
    });
  
  
}
DeleteParentStudent(id)
{
  this.spinnerCubeDisplay=true;

    //this is for deleting parent child record
    this.http.delete<EntityOperationResult>(this.rootUrl + 'parents/'+id).subscribe(data => {
      if(data.isSuccess==true)
  {
    this.loadParentChild();
    this.showSuccess(data.successMessage);
    this.ShowHideSpiner(false);
    this.spinnerCubeDisplay= false;
  }
  else{
    this.showError(data.error);
    this.ShowHideSpiner(false);
    this.spinnerCubeDisplay= false;
  }
    },error=>{
      console.log(JSON.stringify(error));
      this.spinnerCubeDisplay=false;
    });
  
  
}
loadParentChild()
{

   this.spinnerCubeDisplay=true;
    //this is for getting parent record
    this.http.get<ParentChildData>(this.rootUrl + 'parents/'+this.currentUserId).subscribe(data => {
      this.Parent_ChildData = data;
      this.spinnerCubeDisplay=false;
    },error=>{
      console.log(JSON.stringify(error));
      this.spinnerCubeDisplay=false;
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
  
 

Cancel()
{
  this.modalEdit.hide();
}

  

pageChanged(pageNo)
{

  this.skip=((pageNo-1)*this.limit);
 // this.search(true);

}//end here page changed function
showSuccess(msg) {

  this.toasterService.pop('success', 'Success', msg);
}

showError(msg) {

  this.toasterService.pop('error', 'Error', msg);
}


}
class ParentChildData {
  id: number;
  parentname: string;
  socialtype: string;
  isActive: boolean;
  total: number;
  current: number;
  rowCount: number;
  rows:[{
      id:number;
      studentid: string;
      studentfullname: string;
      studentdobms: number;
      studentgender: string;
      studentclass: number;
      studentsection: string;
      studentisactive: true;
      schoolid: number;
      schoolname: string;
      schoolcity: string
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
   

   