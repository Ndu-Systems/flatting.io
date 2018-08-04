export interface IPayment {
    Ref: number;
    Amount:number;
    Date:string;
}
export interface IInvoice {
    Ref: number;
    Amount:number;
    Month:string;
    Name:string;
    Room:string;
}
export interface IPaymentReport {
    Ref: number;
    AmountPaid:number;
    AmountInvoiced:number;
    Month:string;
    Name:string;
    Room:string;
    Status:string;
    Date:string;
}

export interface ISavePayments{
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
}

export const mock_invoice:Array<IInvoice> = [
    {
        Ref:251,
        Amount:2000,
        Month:'July',
        Name:'Ndumiso',
        Room:'G36'
    },
    {
        Ref:123,
        Amount:4200,
        Month:'July',
        Name:'Themba',
        Room:'G37'
    },
    {
        Ref:222,
        Amount:3000,
        Month:'July',
        Name:'Bahluphile',
        Room:'202'
    },
    {
        Ref:231,
        Amount:3000,
        Month:'July',
        Name:'Smith',
        Room:'205'
    }
    
];

