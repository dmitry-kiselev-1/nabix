import { Component, OnInit } from '@angular/core';
import { TestFormModel } from '../../../models/test-form.model';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  public entity: TestFormModel = new TestFormModel();
  public httpResponseCode: number;

  public isPushed: boolean = true;
  public isPulled: boolean = true;
  public isSended: boolean = true;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
  }

  push(inputDateString: string) {
    this.isPushed = this.dateService.saveDate(inputDateString);
    if (this.isPushed) {this.entity.inputDateString = inputDateString; }
  }

  pull() {
    debugger;

    let result = this.dateService.loadDate();

    this.isPulled = (result ? true : false);
    if (this.isPulled) {this.entity.serviceDateString = result; }
  }

  send() {
/*
    this.dateService.post()
      .subscribe(response => {
        this.httpResponseCode = response.status;
        this.isSended = true;
      });
*/
  }
}
