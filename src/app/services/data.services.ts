import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  
  assessorId:number;
  assessmentId:number;
  collectionCenterId:number;
  collectionCenterName:string;
  assessorName:string;
  creationdatems:number;
  isCallFromCollectionCenter:boolean;
  isCallFromAssessor:boolean;
  selectedLabId:number;
  copyLabs:any;
  constructor() { }

}