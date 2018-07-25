import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { IPayment } from '../models/Payment';

@Component({
  selector: 'app-upload-payment-file',
  templateUrl: './upload-payment-file.component.html',
  styleUrls: ['./upload-payment-file.component.scss']
})
export class UploadPaymentFileComponent implements OnInit {
  data:Array<IPayment>;

  constructor() { }

  ngOnInit() {
  }

  arrayBuffer:any;
  file:File;
  incomingfile(event) 
    {
    this.file= event.target.files[0]; 
    }
  
   Upload() {
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              let data = new Uint8Array(this.arrayBuffer);
              let arr = new Array();
              for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              let bstr = arr.join("");
              let workbook = XLSX.read(bstr, {type:"binary"});
              let first_sheet_name = workbook.SheetNames[0];
              let worksheet = workbook.Sheets[first_sheet_name];
              this.data = XLSX.utils.sheet_to_json(worksheet,{raw:true});
              this.processData();

          }
          fileReader.readAsArrayBuffer(this.file);
  }
  processData(){
    if(this.data){
      console.log(this.data);

    }
  }
}
