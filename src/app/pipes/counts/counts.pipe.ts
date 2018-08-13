import { Pipe, PipeTransform } from '@angular/core';
import { ISavePayments } from '../../models/payment';

@Pipe({
  name: 'counts'
})
export class CountsPipe implements PipeTransform {

  transform(value: ISavePayments[], key:string): number {
    return value.filter(x=>x.PaymentStatus===key).length;
  }

}
