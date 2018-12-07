import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Body } from '@angular/http/src/body';
import { error } from 'util';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';


@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../../node_modules/spinkit/css/spinkit.css',
    '../../../../node_modules/font-awesome/css/font-awesome.min.css'],
  encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {
  @ViewChild('EditModal') modalEdit: any;
  ShowHideDetails: boolean = true;
  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 5000 });

  label: string;
  spinnerCubeDisplay = true;
  isLoading = true;
  progress: number | boolean;
  ladda_del_progress: number | boolean;
  isAactionBtn = false;
  filterKeys: string = "";

  constructor(private http: HttpClient, toasterService: ToasterService, private router: Router) {

    this.toasterService = toasterService;
  }
  ngOnInit(): void {

    this.pageLoad();
  }
  search() {

    this.spinnerCubeDisplay = true;

  }
  pageLoad() {
    this.spinnerCubeDisplay = true;

    this.spinnerCubeDisplay = false;

  }


  openAddPopup() {
    this.isLoading = false;
    this.modalEdit.show();
    this.label = "Create New";

  }

  Action(user) {

  }
  Save(user) {

  }



  Update(user) {

  }
  Edit(user) {


  }

  ShowUserDetails(user) {
    this.ShowHideDetails = false;
  }

  Cancel() {
    this.modalEdit.hide();
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  Delete(user) {

  }

  pageChanged(pageNo) {

  }
  showSuccess(msg) {

    this.toasterService.pop('success', 'Success', msg);
  }

  showError(msg) {

    this.toasterService.pop('error', 'Error', msg);
  }


}



