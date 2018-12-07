import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MyDataService {
  
  UserId: number;
  ColCenterId:number;
  collectionCenterName:string;
  assessmentdate: number;
  LabId:number;
  LabName:string;
  assessorId:number;
  isCallFromCollectionCenter:boolean;
  copyLabs:any;

  // assessorId:number;
  // assessorName:string;
  // assessmentDatems:number;    
  // creationdatems:number;  
  
  constructor() { }

}