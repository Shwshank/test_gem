import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { fail } from 'assert';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  templateUrl: 'index.component.html'
})

export class IndexComponent implements OnInit {
  recordData: RecordData;
  rootUrl: string;
 //map setting
 lat: number = 24.4789636;//current map position
 lng: number = 80.1603644;//current map position
 zoom: number = 5;//zooming level of map when page open
//end map setting
markers: marker[];//master list of all points and it hold (lab+assessor+collection centre)

  constructor(private router: Router, private http: HttpClient,private auth: AuthenticationService) {
    this.rootUrl = auth.apiUrl;
   }

   ngOnInit(): void {
       this.recordData = new RecordData();
     this.getDataForMap();
    this.LoadTotal();
  }

  LoadTotal()
  {
  
    this.http.get<RecordData>(this.rootUrl+'totalrecordviewer').subscribe(data => {
      this.recordData = data;
    }, error => {
      console.log(JSON.stringify(error));

    });
  }

  getDataForMap()
  {     
      this.http.get<mapData>(this.rootUrl + 'totalrecordviewer/mapdata').subscribe(data => {
      
        // if(data.lab.totalrecords>0)
      // {
      //   this.markers=data.lab.items;
       
      // }

        console.log(data);
      if(data.collectionCenter.totalrecords>0)
      {
        // if(this.markers.length>0)
        // this.markers=this.markers.concat(data.collectionCenter.items);
        // else
        this.markers=data.collectionCenter.items;
        
      }
      
    },error=>{
     console.log(error);
      console.log(JSON.stringify(error));
   
    
    });
  }

}


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
}
interface marker{
  id:number;
  scfid:number;
  state:string;
  status:string;
  latitude: number;
  longitude:number;
  draggable: boolean;
  name:string;
  label:string;
  address: string;
  email:string;
  mobileno1:string;
  mobileno2:string;
  icon:string;
  tentativeassessment:number;
  assessmentmonth:number;
  collectioncenterassign_assessorid:number;
}
interface mapData{
  message:string;
  lab:labCls;
  collectionCenter:collectionCenterCls;

}
interface labCls{
  totalrecords:number;
  items:marker[];
}
interface collectionCenterCls{
  totalrecords:number;
  items:marker[];
}