import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildingpipe'
})
export class BuildingPipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.BuildingName.toLowerCase().includes(searchText) || 
      it.City.toLowerCase().includes(searchText) ||
      it.PostCode.toLowerCase().includes(searchText) || 
      it.AddressLine1.toLowerCase().includes(searchText)|| 
      it.AddressLine2.toLowerCase().includes(searchText)|| 
      it.AddressLine3.toLowerCase().includes(searchText);
    });
  }

}
