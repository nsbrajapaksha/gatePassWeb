import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {DataService} from "../services/toastMsg.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle-data-form',
  templateUrl: './vehicle-data-form.component.html',
  styleUrls: ['./vehicle-data-form.component.css']
})
export class VehicleDataFormComponent implements OnInit {

  vehicleNo: string = '';
  vehicleType: string = '';
  numberOfSeats: number = 0;
  airCondition: string = "No";

  constructor(private db: AngularFireDatabase, private ds: DataService, public router: Router) {
  }

  ngOnInit() {
  }

  saveVehicle() {
    this.db.list('/vehicles').push(
      {
        ac: this.airCondition,
        seats: this.numberOfSeats.toString(),
        vehicle_no: this.vehicleNo.toUpperCase(),
        vehicle_type: (this.vehicleType.charAt(0).toUpperCase() + this.vehicleType.slice(1))
      }
    ).then(
      (item) => {
        this.ds.sendMsg({msg: "New Vehicle Added Successfully", msgView: true, errorMsg: false});
        this.router.navigate(['vehicleDataTbl']);
        //console.log("Success");
      }, (msg) => {
        //console.log(msg);
        this.ds.sendMsg({msg: "Error ! Please Try Again", msgView: true, errorMsg: true});
      }
    );
  }

  clickSave() {
    if (this.vehicleNo == "" && this.vehicleType == "" && this.numberOfSeats == 0) {
      this.ds.sendMsg({msg: "Please Fill All The Fields In The Form", msgView: true, errorMsg: true});
    } else {
      this.saveVehicle();
    }
  }

  clickRadioBtn() {
    if (this.airCondition == "Yes") {
      this.airCondition = "No";
    } else {
      this.airCondition = "Yes";
    }
  }

}
