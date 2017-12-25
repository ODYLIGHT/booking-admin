'use strict';
export interface MenuState {
    title: string;
    menues: [
        {
            menu_title: string;
            link: string;
        }
    ]
}
// export interface TeacherState {
//     _id: number;
//     _priority_number: number;
//     _name: string;
//     _name_jpn: string;
//     _customers_language: number;
//     _status: boolean;
//     _details_teaches: string;
//     _details_other_language: string;
//     _details_education: string;
//     _details_speciality: string;
//     _details_career: string;
//     _details_comment: string;
//     _details_testimonial: string;
//     _details_jpn_teaches: string;
//     _details_jpn_other_language: string;
//     _details_jpn_education: string;
//     _details_jpn_speciality: string;
//     _details_jpn_career: string;
//     _details_jpn_comment: string;
//     _details_jpn_testimonial: string;
//     _skype_name: string;
//     _email: string;
//     _picture: string;
//     _user_id: string;
//     _password: string;
//     _authority: number;
// }
export interface TeacherState {
    id: number;
    name: string;
    name_jp: string;
    state: boolean;
    time_zone: string;
}

export interface ScheduleState {
    _date: Date;
    _can_reserve: boolean;
    _reserved_user: number;
}

export interface CustomerState {
    id: number;
    customerName: string;
    nickName: string;
    jpName: string;
    gender: string; // male or female
    birth: Date; // データ格納時はDate型にして、利用時に別途分解する
    skypeName: string;
    mailAddress: string;
    password: string;
    frenchLevel: string;
    learningExperience: string; // 学習経験
    purpose: string;
    motherTongue: string; // 母国語
    howFinded: string; // このサイトを知ったきっかけ
    otherLanguage1: string;
    otherLanguage1_level: number;
    otherLanguage2: string;
    otherLanguage2_level: number;
    programCode: string;
    remark: string;
    clientCode: string;
}

export interface ReservationState {
    _id: number;
    _reserve_date: Date;
    _teacher_id: number;
    _status: string;
}

// ここまではDBのテーブル構造のまんま

export interface RegisterBookingTeachersState {
    _id: number;
    _name: string;
}

export interface SearcherCustomerState {
    _name: string; // 顧客名(CustomerState.customerName)
    _teachers: RegisterBookingTeachersState[];
}

export interface SearchBookingState {
    customerId: number;
    reservationId: string;
    studentName: string;
    date: string;
    teacherName: string;
    reserveBy: string;
}

export interface CheckTeacherScheduleState {
    schedules?: {
        _date: Date;
        _can_reserve: boolean;
        _reserved_user: number;
    }[];
    reservations?: {
        _id: number;
        _reserve_date: Date;
        _teacher_id: number;
        _status: string;
    }[];
}

export interface SearchedStudentInformationState {
    id: number;
    customerName: string;
    gender: string;
    // _country: string; // タイムゾーン　どこで定義するのか不明・・・
    skypeName: string;
    mailAddress: string;
}
