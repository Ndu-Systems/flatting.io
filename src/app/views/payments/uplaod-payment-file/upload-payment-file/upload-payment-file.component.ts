import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import * as XLSX from "ts-xlsx";
import { PaymentsService } from "../../../../services";
import { getLocaleDateTimeFormat } from "@angular/common";
import { Message } from 'primeng/api';
import { Router } from "@angular/router";
import { SelectService } from "../../../../shared/services";
import { IPayment, IPaymentReport, mock_invoice, IInvoice, ISavePayments } from "../../../../models/Payment";

@Component({
  selector: "app-upload-payment-file",
  templateUrl: "./upload-payment-file.component.html",
  styleUrls: ["./upload-payment-file.component.scss"]
})
export class UploadPaymentFileComponent implements OnInit {
  data: Array<IPayment> = [];
  paymentReport: Array<IPaymentReport> = [];
  invoiceData: Array<IInvoice> = mock_invoice;
  msgs: Message[] = [];

  constructor(private paymentService: PaymentsService,
     private router: Router
    ) { }

  ngOnInit() { }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: `${msg}` +' Report(s) saved successfully' });
  }
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Error Message', detail: `${msg}` });
  }
  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  upload() {
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
    this.paymentReport = [];
    console.log("this.data", this.data)
    if (this.data) {
      // unpaid
      this.invoiceData.forEach(x => {
        let check: boolean = false;
        this.data.forEach(y => {
          if (x.Ref === y.Ref) {
            check = true;
          }
        });
        if (!check) {
          let obj: IPaymentReport = {
            Ref: x.Ref,
            AmountPaid: 0,
            AmountInvoiced: x.Amount,
            Month: x.Month,
            Name: x.Name,
            Room: x.Room,
            Status: "unpaid",
            Date: 'null'
          };
          this.paymentReport.push(obj);
        }
      });

      //paid
      this.data.forEach(bank_row => {
        this.invoiceData.forEach(invoice_data => {
          let repObj: IPaymentReport = {
            Ref: undefined,
            AmountPaid: undefined,
            AmountInvoiced: undefined,
            Month: undefined,
            Name: undefined,
            Room: undefined,
            Status: undefined,
            Date: undefined
          };
          //Update Payments          
          this.updatePayment(bank_row.Ref, bank_row);
          //New Bank Files
          if (bank_row.Ref === invoice_data.Ref) {
            repObj.AmountInvoiced = invoice_data.Amount;
            repObj.AmountPaid = bank_row.Amount;
            repObj.Month = invoice_data.Month;
            repObj.Name = invoice_data.Name;
            repObj.Room = invoice_data.Room;
            repObj.Ref = invoice_data.Ref;
            repObj.Date = bank_row.Date;
            repObj.Status = this.GetStatus(
              bank_row.Amount,
              invoice_data.Amount
            );
            this.paymentReport.push(repObj);
          }
        });
      });
    }
  }

  GetStatus(AmountPaid, AmountInvoiced): string {
    if (AmountPaid < AmountInvoiced) return "incomplete";
    if (AmountPaid >= AmountInvoiced) return "paid";
  }

  saveReports() {
    let savePaymentsList: Array<ISavePayments> = [];
    this.paymentReport.forEach(data => {
      let saveReportObj: ISavePayments = {
        TenantId: 1,
        RoomId: 1,
        BuildingId: 1,
        AmountInvoiced: data.AmountInvoiced,
        AmountPaid: data.AmountPaid,
        OutstandingAmount: data.AmountInvoiced - data.AmountPaid,
        PaymentMonth: new Date().getMonth(),
        PaymentYear: new Date().getFullYear(),
        PaymentDate: data.Date,
        StatusId: 1,
        PaymentStatus: data.Status
      };
      savePaymentsList.push(saveReportObj);
    });


    this.paymentService.addPayments(savePaymentsList).subscribe(response => {
      if (!isNaN(response)) {
        this.showSuccess(response);
        setTimeout(() => {
          this.router.navigate(['/dashboard/']);
        }, 2000);
      }
      else{
        this.showError(response);
      }
    });
  }

  paymentToUpdate : ISavePayments
  //Boolean update payment
  updatePayment(referenceNumber: number, paymentData: IPayment) : boolean { 
    debugger       
    let data = {
      PaymentMonth : new Date().getMonth(),
      ReferenceNumber : referenceNumber
    }
    this.paymentService.getPayment(data).subscribe(response => {
      if(response){
        alert(response.ReferenceNumber)
      }
    });
    return true;
  }
}
