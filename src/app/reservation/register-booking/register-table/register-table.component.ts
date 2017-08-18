import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { RegisterBookingTeachersState } from '../../../store/types';

@Component({
  selector: 'app-register-table',
  templateUrl: './register-table.component.html',
  styleUrls: ['./register-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterTableComponent implements OnInit {
    @Input() teachers: RegisterBookingTeachersState[];

  constructor() { }

  ngOnInit() {
  }

}
