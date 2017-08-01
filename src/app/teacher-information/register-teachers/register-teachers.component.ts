import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-teachers',
  templateUrl: './register-teachers.component.html',
  styleUrls: ['./register-teachers.component.scss']
})
export class RegisterTeachersComponent implements OnInit {
    private window: Window;
    public currentPage = 1;
    public itemPerPage = 10;

  constructor() { }

  ngOnInit() {
  }

    public selectItems(allData: TeacherState[]): TeacherState[] {
        return allData.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }

    public onModify(id: number): void {
        console.info(`on click 'Modify' ${id}`);
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
    }

}
