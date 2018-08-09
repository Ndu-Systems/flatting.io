import { InvoiceService } from './../../../../services/invoices/invoice.service';
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import * as XLSX from "ts-xlsx";
import { PaymentsService } from "../../../../services";
import { getLocaleDateTimeFormat } from "@angular/common";
import { Message } from 'primeng/api';
import { Router } from "@angular/router";
import { IPayment, IPaymentReport, IInvoice, ISavePayments } from "../../../../models/Payment";
import { SelectService } from "../../../../shared/services";
import { PAID, INCOMPLETE } from "../../../../shared/enum";

@Component({
  selector: "app-upload-payment-file",
  templateUrl: "./upload-payment-file.component.html",
  styleUrls: ["./upload-payment-file.component.scss"]
})
export class UploadPaymentFileComponent implements OnInit {
  data: Array<IPayment> = [];
  paymentReport: Array<IPaymentReport> = [];
  invoiceData: Array<IInvoice>;
  invoicesToUpdate : Array<IInvoice> = [];
  msgs: Message[] = [];

  constructor(private paymentService: PaymentsService,
    private router: Router,
    private selectService: SelectService ,
    private invoiceService : InvoiceService
  ) { }

  ngOnInit() {
    this.getInvoices();
    
   }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: `${msg}` + ' Report(s) saved successfully' });
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
  getInvoices(){
    this.selectService.select(`invoice WHERE StatusId IN (1,3)`)
    .subscribe(response =>{
      debugger
      this.invoiceData = response;
      console.log("invoices", this.invoiceData);
    });
 }

  processData() {
    
    this.paymentReport = [];
    console.log("this.data", this.data)
    if (this.data) {
      // unpaid
      this.invoiceData.forEach(x => {
        let check: boolean = false;
        this.data.forEach(y => {
          if (Number(x.ReferenceNumber) === y.Ref) {
            check = true;
          }
        });
        if (!check) {
          let obj: IPaymentReport = {
            Ref: x.ReferenceNumber,
            AmountPaid: 0,
            AmountInvoiced: x.Amount,
            Month: x.Month,
            Name: x.Name,
            Room: x.RoomId,
            Status: "unpaid",
            Date: '7'
          };
          this.paymentReport.push(obj);
        }
      });

      //paid
      this.data.forEach(bank_row => {
        debugger
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
          if (this.updatePayment(bank_row.Ref, bank_row)) {
            return;
          }
          else {
            //New Bank Files
            if (bank_row.Ref === Number(invoice_data.ReferenceNumber)) {
              repObj.AmountInvoiced = invoice_data.Amount;
              repObj.AmountPaid = bank_row.Amount;
              repObj.Month = invoice_data.Month;
              repObj.Name = invoice_data.Name;
              repObj.Room = invoice_data.RoomId;
              repObj.Ref = invoice_data.ReferenceNumber;
              repObj.Date = bank_row.Date;
              repObj.Status = this.GetStatus(
                bank_row.Amount,
                invoice_data.Amount
              );
              this.paymentReport.push(repObj);
            }
          }
        });
      });
    }
  }

  GetStatus(AmountPaid, AmountInvoiced): string {
    if (AmountPaid < AmountInvoiced) return INCOMPLETE;
    if (AmountPaid >= AmountInvoiced) return PAID;
  }

  updateInvoices(){
    this.paymentReport.forEach(payment =>{
      let invoice : IInvoice;
      if(payment.Status === PAID){
        invoice = {          
          ReferenceNumber : payment.Ref,
          Amount: payment.AmountInvoiced,
          Month: payment.Month,
          Name: payment.Name,
          RoomId: payment.Room,
          StatusId: 2,
          InvoiceId : this.invoiceData.filter(x => x.ReferenceNumber == payment.Ref)[0].InvoiceId
        }
      }
      if(payment.Status == INCOMPLETE){        
          invoice = {          
            ReferenceNumber : payment.Ref,
            Amount: payment.AmountInvoiced,
            Month: payment.Month,
            Name: payment.Name,
            RoomId: payment.Room,
            StatusId: 3,
            InvoiceId : this.invoiceData.filter(x => x.ReferenceNumber == payment.Ref)[0].InvoiceId
          }
      }
      if(invoice){
        this.invoicesToUpdate.push(invoice);
      }
    })
    this.invoiceService.updateInvoice(this.invoicesToUpdate)
      .subscribe(response => {
        if(response){
          setTimeout(() => {
            this.router.navigate(['/dashboard/']);
          }, 2000);
        }
       
      });    
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
        PaymentStatus: data.Status,
        ReferenceNumber: data.Ref
      };
      savePaymentsList.push(saveReportObj);
    });
    

    this.paymentService.addPayments(savePaymentsList).subscribe(response => {
      if (!isNaN(response)) {
        
        this.showSuccess(response);
        this.updateInvoices();
       
      }
      else {
        this.showError(response);
      }
    });
  }

  paymentToUpdate: ISavePayments
  //Boolean update payment
  updatePayment(referenceNumber: number, paymentData: IPayment): boolean {   
    let isUpdated = false;
    let data = {
      PaymentMonth: new Date().getMonth(),
      ReferenceNumber: referenceNumber
    }
    this.paymentService.getPayment(data).subscribe(response => {
      if (response.PaymentId > 0) {
        debugger
        if (this.update(response, paymentData)) {
          isUpdated = true;
        }
      }
    });
    return isUpdated;
  }

  update(payment, paymentData): boolean {
    let isUpdated = false;
    let data = {
      TenantId: payment.TenantId,
      RoomId: payment.RoomId,
      BuildingId: payment.BuildingId,
      ReferenceNumber: payment.ReferenceNumber,
      AmountInvoiced: payment.AmountInvoiced,
      AmountPaid: Number(payment.AmountPaid) + paymentData.Amount,
      OutstandingAmount: Number(payment.OutstandingAmount - paymentData.Amount),
      PaymentMonth: payment.PaymentMonth,
      PaymentYear: payment.PaymentYear,
      PaymentDate: paymentData.Date,
      StatusId: payment.StatusId,
      PaymentStatus: payment.PaymentStatus,
      PaymentId: payment.PaymentId
    }
    if(data.OutstandingAmount == 0){
      data.PaymentStatus = PAID
    }

    this.paymentService.updatePayment(data)
      .subscribe(response => {
        if (response == 1) {
          isUpdated = true;
        }
      });
    return isUpdated;
  }
}
