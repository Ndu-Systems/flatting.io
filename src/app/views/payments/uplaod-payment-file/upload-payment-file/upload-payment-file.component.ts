import { mock_invoice } from "./../models/Payment";
import { Component, OnInit } from "@angular/core";
import * as XLSX from "ts-xlsx";
import { IPayment, IInvoice,IPaymentReport } from "../models/Payment";

@Component({
  selector: "app-upload-payment-file",
  templateUrl: "./upload-payment-file.component.html",
  styleUrls: ["./upload-payment-file.component.scss"]
})
export class UploadPaymentFileComponent implements OnInit {
  data: Array<IPayment>=[];
  paymentReport: Array<IPaymentReport>=[];
  invoiceData: Array<IInvoice> = mock_invoice;
  constructor() {}

  ngOnInit() {}

  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = e => {
      this.arrayBuffer = fileReader.result;
      let data = new Uint8Array(this.arrayBuffer);
      let arr = new Array();
      for (let i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      let bstr = arr.join("");
      let workbook = XLSX.read(bstr, { type: "binary" });
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.processData();
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  processData() {
    if (this.data) {
      console.log(this.data);
      this.data.forEach(bank_row => {
        this.invoiceData.forEach(invoice_data => {
            let repObj:IPaymentReport = {
              Ref:undefined,
              AmountPaid:undefined,
              AmountInvoiced:undefined,
              Month:undefined,
              Name:undefined,
              Room:undefined,
              Status:undefined,
            };
            if(bank_row.Ref === invoice_data.Ref){
              repObj.AmountInvoiced = invoice_data.Amount;
              repObj.AmountPaid = bank_row.Amount;
              repObj.Month = invoice_data.Month;
              repObj.Name = invoice_data.Name;
              repObj.Room = invoice_data.Room;
              repObj.Ref = invoice_data.Ref;
              repObj.Status =this.GetStatus(bank_row.Amount,invoice_data.Amount);
              this.paymentReport.push(repObj);
            }
        });
      });
    }
  }

  GetStatus(AmountPaid,AmountInvoiced):string{
    if(AmountPaid ===0) return "unpaid";
    if(AmountPaid < AmountInvoiced) return "incomplete";
    if(AmountPaid >= AmountInvoiced) return "paid";
  }
}
