export interface IPayment {
    Ref: number;
    Amount:number;
    Date:string;
}
export interface IInvoice {
    InvoiceId: number;
    ReferenceNumber: number;
    Amount: number;
    Month: number;
    Name: string;
    RoomId: number;
    StatusId: number;
    TenantId: number;
    Balance:number;
    
}
export interface IPaymentReport {
    Ref: number;
    AmountPaid:number;
    AmountInvoiced:number;
    Month:number;
    Name:string;
    Room:number;
    Status:string;
    Date:string;
    TenantId:number;
    OutstandingAmount:number;
    
}

export interface ISavePayments{
PaymentId:number;
TenantId:number;
RoomId:number;
BuildingId:number;
AmountInvoiced:number;
AmountPaid:number;
OutstandingAmount:number;
PaymentMonth:number;
PaymentYear:number;
PaymentDate:string;
StatusId:number;
PaymentStatus:string;
ReferenceNumber:number;
}
 
