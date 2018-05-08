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
  }

  pull() {
    this.isPulled = (this.dateService.loadDate() ? true : false);
  }

  send() {
    this.dateService.post()
      .subscribe(response => {
        this.httpResponseCode = response.status;
        this.isSended = true;
      });
  }
}
