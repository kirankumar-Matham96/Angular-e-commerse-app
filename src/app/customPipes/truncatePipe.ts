import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit: number = 0): string {
    if (!value) {
      return '';
    }
    const truncatedString = value.substring(0, limit) + '...';
    console.log({ shortString: truncatedString });
    return truncatedString;
  }
}
