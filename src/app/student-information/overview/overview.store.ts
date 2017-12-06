import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { CustomerState } from '../../store/types';

export interface PullDownMenusState {
    time_zone: { label: string, value: string }[];
    current_french_lebel: { label: string, value: string }[];
    fined_tools: { label: string, value: string }[];
    purpose: { label: string, value: string }[];
    program_code: { label: string, value: string }[];
    remark: { label: string, value: string }[];
    client_code: { label: string, value: string }[];
}

export class StudentForm {
    id = '';
    nickName = '';
    jpName = '';
    gender = '';
    birth = '';
    skypeName = '';
    mailAddress = '';
    password = '';
    frenchLevel = '';
    learningExperience = '';
    purpose = '';
    motherTongue = '';
    howFined = '';
    otherLanguage1: OtherLang1;
    otherLanguage2: OtherLang2;
    programCode = '';
    remark = '';
    clientCode = '';
}
export class OtherLang1 {
    language = '';
    lang1_level = '';
}
export class OtherLang2 {
    language = '';
    lang2_level = '';
}

export class OverviewStore extends Store<CustomerState[]> {
    constructor() { super(<CustomerState[]>[]) }

    private _changeState(items: CustomerState[]) { return (c: Readonly<CustomerState[]>): Partial<CustomerState[]> => items }

    public changeState(items: CustomerState[]): void { this.dispatch(this._changeState(items)) }

}
