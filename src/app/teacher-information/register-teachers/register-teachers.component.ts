import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { RegisterTeachersService } from './register-teachers.service';
import { RegisterTeachersStore } from './register-teachers.store';
import { TeacherState } from '../../store/types';

@Component({
  selector: 'app-register-teachers',
  templateUrl: './register-teachers.component.html',
  styleUrls: ['./register-teachers.component.scss']
})
export class RegisterTeachersComponent implements OnInit {
    private window: Window;
    public currentPage = 1;
    public itemPerPage = 10;

    constructor(
        private service: RegisterTeachersService,
        private router: Router
    ) { }

  ngOnInit() {
  }

    public selectItems(allData: TeacherState[]): TeacherState[] {
        return allData.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }

    public onModify(id: number): void {
        console.info(`on click 'Modify' ${id}`);
        this.router.navigate(['/administrator/register-teachers/edit', id]);
    }

    public onDelete(id: number): void {
        const confirmMessage = 'Are you sure you want to delete All information of this teacher?';
        if (window.confirm(confirmMessage)) {
            this.service.deleteTeacher(id);
        } else {
            console.info(`confirm false, not delete.`);
        }
    }

    public onAddTeacher(): void {
        console.info(`on click add new teacher`);
        this.router.navigate(['/administrator/register-teachers/insert']);
    }

}
