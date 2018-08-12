import { InvoiceService } from "./../../../../services/invoices/invoice.service";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import * as XLSX from "ts-xlsx";
import { PaymentsService } from "../../../../services";
import { getLocaleDateTimeFormat } from "@angular/common";
import { Message } from "primeng/api";
import { Router } from "@angular/router";
import {
  IPayment,
  IPaymentReport,
  IInvoice,
  ISavePayments
} from "../../../../models/Payment";
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
  invoicesToUpdate: Array<IInvoice> = [];
  msgs: Message[] = [];
  paymentToUpdate: ISavePayments;
  months: Array<string> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  month: string;
  selectedMonthIndex = 0;
  existingPayments: Array<ISavePayments>;

  constructor(
    private paymentService: PaymentsService,
    private router: Router,
    private selectService: SelectService,
    private invoiceService: InvoiceService
  ) {}
  selectMonth() {
    this.selectedMonthIndex = this.months.indexOf(
      this.months.filter(x => x === this.month)[0]
    );
    console.log(this.selectedMonthIndex);
    this.selectService
      .select(`payments WHERE PaymentMonth = ${this.selectedMonthIndex}`)
      .subscribe(payments => {
        this.existingPayments = payments;
        console.log("payments", this.existingPayments);
      });
  }
  ngOnInit() {
    this.getInvoices();
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({
      severity: "success",
      summary: "Success Message",
      detail: `${msg}` + " Report(s) saved successfully"
    });
  }
  showError(msg) {
    this.msgs = [];
    this.msgs.push({
      severity: "warn",
      summary: "Error Message",
      detail: `${msg}`
    });
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
  getInvoices() {
    this.selectService
      .select(`invoice WHERE StatusId IN (1,3)`)
      .subscribe(response => {
        debugger;
        this.invoiceData = response;
        console.log("invoices", this.invoiceData);
      });
  }

  processData() {
    this.paymentReport = [];
    console.log("this.data", this.data);
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
            Date: "7",
            TenantId:Number(x.TenantId),
            OutstandingAmount:x.Amount
          };
          this.paymentReport.push(obj);
        }
      });

      //paid
      this.data.forEach(bank_row => {
        debugger;
        this.invoiceData.forEach(invoice_data => {
          let repObj: IPaymentReport = {
            Ref: undefined,
            AmountPaid: undefined,
            AmountInvoiced: undefined,
            Month: undefined,
            Name: undefined,
            Room: undefined,
            Status: undefined,
            Date: undefined,
            TenantId:undefined,
            OutstandingAmount:undefined

          };
          //Update Payments
      
            //New Bank Files
            if (bank_row.Ref === Number(invoice_data.ReferenceNumber)) {
              repObj.AmountInvoiced = invoice_data.Balance;
              repObj.AmountPaid = bank_row.Amount;
              repObj.Month = invoice_data.Month;
              repObj.Name = invoice_data.Name;
              repObj.Room = invoice_data.RoomId;
              repObj.TenantId = invoice_data.TenantId;
              repObj.Ref = invoice_data.ReferenceNumber;
              repObj.Date = bank_row.Date;
              repObj.OutstandingAmount =Number(invoice_data.Balance -  bank_row.Amount);
              repObj.Status = this.GetStatus(
                bank_row.Amount,
                invoice_data.Balance
              );
              this.paymentReport.push(repObj);
            }
          
        });
      });
    }
  }

  GetStatus(AmountPaid, AmountInvoiced): string {
    if (AmountPaid < AmountInvoiced) return INCOMPLETE;
    if (AmountPaid >= AmountInvoiced) return PAID;
  }

  updateInvoices() {
    debugger;
    this.paymentReport.forEach(payment => {
      let invoice: IInvoice;
      if (payment.Status === PAID) {
        invoice = {
          ReferenceNumber: Number(payment.Ref),
          Amount: payment.AmountInvoiced,
          Month: Number(payment.Month),
          Name: payment.Name,
          RoomId: Number(payment.Room),
          StatusId: 2,
          Balance:0,
          TenantId:Number(payment.TenantId),
          InvoiceId: Number(this.invoiceData.filter(
            x => x.ReferenceNumber == payment.Ref
          )[0].InvoiceId)
        };
      }
      if (payment.Status == INCOMPLETE) {
        invoice = {
          ReferenceNumber: Number(payment.Ref),
          Amount: payment.AmountInvoiced,
          Month: Number(payment.Month),
          Name: payment.Name,
          RoomId: Number(payment.Room),
          StatusId: 3,
          Balance:payment.OutstandingAmount,
          TenantId:Number(payment.TenantId),
          InvoiceId: Number(this.invoiceData.filter(
            x => x.ReferenceNumber == payment.Ref
          )[0].InvoiceId)
        };
      }
      if (invoice) {
        this.invoicesToUpdate.push(invoice);
      }
    });
    this.invoiceService
      .updateInvoice(this.invoicesToUpdate)
      .subscribe(response => {
        if (response) {
          setTimeout(() => {
            this.router.navigate(["/dashboard/"]);
          }, 2000);
        }
      });
  }

  saveReports() {
    let savePaymentsList: Array<ISavePayments> = [];
    this.paymentReport.forEach(data => {
      let saveReportObj: ISavePayments = {
        PaymentId:0,
        TenantId: Number(data.TenantId),
        RoomId: data.Room,
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
    if (this.existingPayments.length > 0) {
      this.updatePaymentsBeforeSave(this.existingPayments, savePaymentsList);
      return;
    }
    this.paymentService.addPayments(savePaymentsList).subscribe(response => {
      if (!isNaN(response)) {
        this.showSuccess(response);
        this.updateInvoices();
      } else {
        this.showError(response);
      }
    });
  }

  updatePaymentsBeforeSave(existingPayments:Array<ISavePayments>, paymentsToSave:Array<ISavePayments>){
    debugger;
    let updatedPayments:Array<ISavePayments> = [];
    let newPayments:Array<ISavePayments> = [];
    paymentsToSave.forEach(paymentToSave=>{
      let existingPayment:ISavePayments = existingPayments.filter(x=>x.ReferenceNumber===paymentToSave.ReferenceNumber)[0];
      if(existingPayment){
        paymentToSave.PaymentId = Number(existingPayment.PaymentId);
        updatedPayments.push(paymentToSave);
      }else{
        newPayments.push(paymentToSave);
      }
    })
    // save new  payments 
    this.paymentService.addPayments(newPayments).subscribe(response => {
      if (!isNaN(response)) {
       // update payments
       this.paymentService.updatePayments(updatedPayments).subscribe(response => {
        if (!isNaN(response)) {
          this.showSuccess(response);
          this.updateInvoices();
        } 
      });
      } 
    });
  
  }

  //Boolean update payment
  // updatePayment(referenceNumber: number, paymentData: IPayment): boolean {
  //   let isUpdated = false;
  //   let data = {
  //     PaymentMonth: new Date().getMonth(),
  //     ReferenceNumber: referenceNumber
  //   };
  //   this.paymentService.getPayment(data).subscribe(response => {
  //     if (response.PaymentId > 0) {
  //       debugger;
  //       if (this.update(response, paymentData)) {
  //         isUpdated = true;
  //       }
  //     }
  //   });
  //   return isUpdated;
  // }

  // update(payment, paymentData): boolean {
  //   let isUpdated = false;
  //   let data = {
  //     TenantId: payment.TenantId,
  //     RoomId: payment.RoomId,
  //     BuildingId: payment.BuildingId,
  //     ReferenceNumber: payment.ReferenceNumber,
  //     AmountInvoiced: payment.AmountInvoiced,
  //     AmountPaid: Number(payment.AmountPaid) + paymentData.Amount,
  //     OutstandingAmount: Number(payment.OutstandingAmount - paymentData.Amount),
  //     PaymentMonth: payment.PaymentMonth,
  //     PaymentYear: payment.PaymentYear,
  //     PaymentDate: paymentData.Date,
  //     StatusId: payment.StatusId,
  //     PaymentStatus: payment.PaymentStatus,
  //     PaymentId: payment.PaymentId
  //   };
  //   if (data.OutstandingAmount == 0) {
  //     data.PaymentStatus = PAID;
  //   }

  //   this.paymentService.updatePayment(data).subscribe(response => {
  //     if (response == 1) {
  //       isUpdated = true;
  //     }
  //   });
  //   return isUpdated;
  // }
 
}
