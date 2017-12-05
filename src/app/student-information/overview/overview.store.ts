import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';

export interface PullDownMenusState {
    time_zone:            { label: string, value: string }[];
    current_french_lebel: { label: string, value: string }[];
    fined_tools:          { label: string, value: string }[];
    purpose:              { label: string, value: string }[];
    program_code:         { label: string, value: string }[];
    remark:               { label: string, value: string }[];
    client_code:          { label: string, value: string }[];
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
    otherLanguage1: OtherLang;
    otherLanguage2: OtherLang;
    programCode = '';
    remark = '';
    clientCode = '';
}
export class OtherLang {
    language = '';
    level = '';
}

export class OverviewStore {
}
