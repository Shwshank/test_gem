import { Component, ViewChild, ElementRef,ViewEncapsulation  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Body } from '@angular/http/src/body';
import { error } from 'util';
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
import { AuthenticationService } from './../../services/authentication.service';
@Component({
  templateUrl: 'schools.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss','../../../../node_modules/spinkit/css/spinkit.css',
   '../../../../node_modules/font-awesome/css/font-awesome.min.css'],

  encapsulation: ViewEncapsulation.None
})
export class SchoolsComponent implements OnInit {
  @ViewChild('EditModal') modalEdit: any;
  private toasterService: ToasterService;

  public toasterconfig : ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  offset:number;//for skipping records
  limit=10;//this is the number of record per page limit
  rootUrl:string;//url root where call hit
  filterKeys:string="";//this is use as variable for elastic search
  School_Data: SchoolData;//here passing reference of School data type
  Edit_SchoolData:EditSchoolData;//here passing reference of EditSchooldata type

  label:string;
  spinnerCubeDisplay=true;//defining variable for spinner
  isLoading=true;
  progress:number|boolean;//
  isAactionBtn=false;//for button to disable aur enable variable declaration


  constructor(private http: HttpClient,toasterService: ToasterService,private auth:AuthenticationService) {
    this.toasterService = toasterService;
    this.rootUrl=auth.apiUrl;
    }
  ngOnInit (): void {
    this.School_Data=new SchoolData();//asigning object
    this.Edit_SchoolData=new EditSchoolData();
    this.pageLoad();
   }
search()
{
    this.ShowHideSpiner(true);
    this.http.get<SchoolData>(this.rootUrl + 'schools?searchTerms='+this.filterKeys+'&limit='+this.limit).subscribe(data => {
    this.School_Data = data;
    this.ShowHideSpiner(false);
  },error=>{
    console.log(JSON.stringify(error));
    this.ShowHideSpiner(false);
  });

}
onlyNumberKey(event) {
  return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
pageLoad()
{
 this.spinnerCubeDisplay=true;
  //this is for getting user
  this.http.get<SchoolData>(this.rootUrl + 'schools?offset=0&limit='+this.limit).subscribe(data => {
    this.School_Data = data;
    this.spinnerCubeDisplay=false;
  },error=>{
    console.log(JSON.stringify(error));
    this.spinnerCubeDisplay=false;
  });


}


openAddPopup()
{

  this.modalEdit.show();
  this.label="Add School";
  this.Edit_SchoolData=new EditSchoolData();//here we intantiate blank objet
  this.Edit_SchoolData.isactive=true;
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
  this.ShowHideSpiner(true);
  this.http.put<EntityOperationResult>(this.rootUrl + 'schools',item).subscribe(data => {
    if(data.isSuccess==true)
    {
      this.showSuccess(data.successMessage);
      this.modalEdit.hide();
      this.pageLoad();
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
    this.http.post<EntityOperationResult>(this.rootUrl + 'schools',this.Edit_SchoolData).subscribe(data => {

      if(data.isSuccess==true)
   {
   let index = this.School_Data.rows.findIndex(d => d.id === item.id); //find index in your array
   this.School_Data.rows[index]=this.Edit_SchoolData;
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
  this.label="Edit School";
  this.modalEdit.show();
  this.Edit_SchoolData = Object.assign({}, item);//here we break reference and for nested object use this(let copy =JSON.parse(JSON.stringify(myObject)))
}

Cancel()
{
  this.modalEdit.hide();
}

  Delete(item)
{

 if(confirm("Are you sure to delete "+item.schoolname)) {

  this.spinnerCubeDisplay= true;
  this.http.delete<EntityOperationResult>(this.rootUrl + 'schools/'+item.id).subscribe(data => {

   if(data.isSuccess==true)
   {
   let index = this.School_Data.rows.findIndex(d => d.id === item.id); //find index in your array
 this.School_Data.rows.splice(index, 1);
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

  this.spinnerCubeDisplay= true;
  var skip=((pageNo-1)*this.limit);
  var url=(this.rootUrl + 'schools?searchTerms='+this.filterKeys+'&offset='+skip+'&limit='+this.limit);
  this.http.get<SchoolData>(url).subscribe(data => {
    this.School_Data = data;
    this.spinnerCubeDisplay= false;
  },error=>{
    this.spinnerCubeDisplay= false;
    console.log(JSON.stringify(error));
  });
}//end here page changed function
showSuccess(msg) {

  this.toasterService.pop('success', 'Success', msg);
}

showError(msg) {

  this.toasterService.pop('error', 'Error', msg);
}



}
class SchoolData {
  total: number;
  current: number;
  rowCount: number;
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

   class EntityOperationResult
  {
    isSuccess:boolean;
    id :number;
    error :string;
    successMessage:string;
  }
   class EditSchoolData{
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
    }



