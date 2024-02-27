import { Pipe, PipeTransform } from '@angular/core';

function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    const normalizedArgs = removeDiacritics(args.toLowerCase());
    
    return value.filter(
      (quiz: any) => removeDiacritics(quiz.title.toLowerCase()).includes(normalizedArgs)
    );
  }

}
