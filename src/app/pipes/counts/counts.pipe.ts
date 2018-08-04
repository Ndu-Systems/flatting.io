import { Pipe, PipeTransform } from '@angular/core';
import { ISavePayments } from '../../views/payments/uplaod-payment-file/models/Payment';

@Pipe({
  name: 'counts'
})
export class CountsPipe implements PipeTransform {

  transform(value: ISavePayments[], key:string): number {
    debugger;
    return value.filter(x=>x.PaymentStatus===key).length;
  }

}
