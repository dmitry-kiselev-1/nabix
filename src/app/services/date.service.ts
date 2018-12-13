import { Injectable } from '@angular/core';
import { TestFormModel } from '../models/test-form.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { DateDto } from '../models/date.dto';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DateService {

  static repository: TestFormModel = new TestFormModel();

  public inputDateFormat = 'DD.MM.YYYY'; // YYYY-MM-DDTHH.mm.ss.SSS

  constructor(private httpClient: HttpClient) { }

  // Сохраняет дату в сервис, в случае ошибки валидации возвращает false
  saveDate(dateString: string): boolean {

    // debugger;

    // извлекаем введённое значение:
    const inputDate = moment(dateString, this.inputDateFormat, true);

    // проверка, что введённое значение может быть интерпретировано, как дата:
    const isValid = inputDate.isValid();

    // проверка, что введённое значение находится в допустимом интервале:
    const isInRange = inputDate.isBetween('1901-01-01', '2050-31-12', 'day', '[]');

    if (isValid && isInRange ) {
      DateService.repository.inputDateString = dateString;
      DateService.repository.serviceDateString = dateString;
      return true;
    } else {
      return false;
    }
  }

  // Извлекает дату из сервиса, в случае некорректной даты возвращает null
  loadDate(): string {

    // debugger;

    const serviceDate = moment(DateService.repository.serviceDateString, this.inputDateFormat, true);

    // проверка, что значение из сервиса может быть интерпретировано, как дата:
    const isValid = serviceDate.isValid();

    return isValid
      ? DateService.repository.serviceDateString
      : null;
  }

  // Выполняет асинхронный запрос к веб-сервису
  post(): Observable<HttpResponse<object>> {

    // debugger;

    const dateIso8601 = moment(DateService.repository.serviceDateString, this.inputDateFormat, true)
      .toISOString(true);

    const dateDto = {dateIso8601: dateIso8601} as DateDto;

    return this.httpClient.post(
      'http://domain/controller/savedate', dateDto,
      { observe: 'response' });
  }
}
