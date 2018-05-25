import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Device } from "../type/device";
import { Interfaces } from "../type/interfaces";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-device-admin',
  templateUrl: './device-admin.component.html'
})

export class DeviceAdminComponent implements OnInit {
  @ViewChild('lgModal') lgModel: ModalDirective;
  @ViewChild('deviceModal') deviceModel: ModalDirective;
  @ViewChild('iModal') iModel: ModalDirective;

  p: number = 1;
  deviceList: Device[];
  device: Device = { name: "", loopBack: "" };
  selectedDevice: Device = { name: "", loopBack: "" };
  iFace: Interfaces = { name: "", ip: "" };
  uiFace: Interfaces = { name: "", ip: "" };
  alert: boolean = false;
  msg: string = "";

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem("deviceList")) {
      this.deviceList = JSON.parse(localStorage.getItem("deviceList"));
    } else {
      this.deviceList = [];
    }
  }

  // ----- Device CRUD functions --------
  public addUpdateDevice(dvc: Device) {
    if (this.validateDevice(dvc)) {
      this.alert = true;
      setTimeout(() => { this.alert = false; }, 6000);
      return;
    }

    if (dvc.id == undefined) { //add device
      this.deviceList.push({ id: this.generateID(this.deviceList, true), name: this.device.name, loopBack: this.device.loopBack });
    } else if (dvc.id > 1000) { //update device
      this.deviceList.map(d => {
        if (dvc.id === d.id) {
          d.loopBack = dvc.loopBack;
          d.name = dvc.name;
        }
      });
      this.deviceModel.hide();
    }
    this.DBupdate();
  }

  public editDevice(device: Device) {
    this.selectedDevice = { id: device.id, name: device.name, loopBack: device.loopBack, interfaces: device.interfaces }; //deep copy
    this.deviceModel.show();
  }
  public deleteDevice(device: Device) {
    if (this.deviceList) {
      this.deviceList = this.deviceList.filter(item => item !== device);
      this.DBupdate();
    }
  }
  public viewDevice(device: Device) {
    this.selectedDevice = device;
    this.lgModel.show();
  }


  // ----- Interface CRUD functions --------
  public editInterface(i: Interfaces) {
    this.uiFace = { id: i.id, name: i.name, ip: i.ip };
    this.iModel.show();
  }
  public addUpdateInterface(interface_: Interfaces) {
    if (this.validateInterface(interface_)) {
      this.alert = true;
      setTimeout(() => { this.alert = false; }, 6000);
      return;
    }
    if (interface_.id == undefined) { //add interface
      if (!this.selectedDevice.interfaces) {
        this.selectedDevice.interfaces = [];
      }
      this.selectedDevice.interfaces.push({ id: this.generateID(this.selectedDevice.interfaces, false), name: interface_.name, ip: interface_.ip });
    } else if (interface_.id > 10000) { // update interface
      this.selectedDevice.interfaces.forEach(i => {
        if (i.id === interface_.id) {
          i.ip = interface_.ip;i.name = interface_.name;
        }
      });
      this.iModel.hide();
    }
    this.DBupdate();
  }

  public deleteInterface(i: Interfaces) {
    this.selectedDevice.interfaces = this.selectedDevice.interfaces.filter(item => item !== i);
    this.DBupdate();
  }

  //validation function for Interfaces
  private validateInterface(intrfc: any): boolean {
    if (intrfc.name == undefined || intrfc.name === '' || intrfc.ip == null || intrfc.ip == undefined || intrfc.ip == '') {
      this.msg = "Both fields are required, Empty fields are not allowed";
      return true;
    }
    if (this.selectedDevice.interfaces && this.selectedDevice.interfaces.filter(i => i.id !== intrfc.id).findIndex(i => i.name === intrfc.name) >= 0) {
      this.msg = "Similar Name found. Name must be unique in Interface list";
      return true;
    }
    if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(intrfc.ip))) {
      this.msg = "IP Address is not valid, Please provide valid IP address";
      return true;
    }
    if (this.selectedDevice.interfaces && this.selectedDevice.interfaces.filter(i => i.id !== intrfc.id).findIndex(i => i.ip === intrfc.ip) >= 0) {
      this.msg = "Similar IP found. IP must be unique within list";
      return true;
    }
    return false;
  }

  //validation function for Device
  private validateDevice(h: Device): boolean {
    if (h.name == null || h.name == undefined || h.name === '') {
      this.msg = "empty Host name is not allowed";
      return true;
    }
    if (this.deviceList.filter(i => i.id !== h.id).findIndex(i => i.name === h.name) >= 0) {
      this.msg = "Similar Name found. Host Name must be unique within list";
      return true;
    }
    if (h.loopBack == null || h.loopBack == undefined || h.loopBack == '') {
      this.msg = "empty loopback is not allowed";
      return true;
    }
    if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(h.loopBack))) {
      this.msg = ("loopback is not valid, Please provide valid IP address");
      return true;
    }
    if (this.deviceList.filter(i => i.id !== h.id).findIndex(i => i.loopBack === h.loopBack) >= 0) {
      this.msg = "Similar loopBack IP found. loopBack IP must be unique within list";
      return true;
    }
    return false;
  }

  // DB update logic
  private DBupdate() {
    localStorage.setItem("deviceList", JSON.stringify(this.deviceList));
    this.uiFace.name = "";
    this.uiFace.ip = "";
    this.uiFace.id = undefined;
    this.device.id = undefined;
    this.device.name = "";
    this.device.loopBack = "";

  }

  // Generating ID for Devices and Interfaces from this function 
  private generateID(list: any[], f: boolean): number {
    return (list.length == 0) ? (f ? 1001 : 10001) : (list[list.length - 1].id + 1);
  }
}
