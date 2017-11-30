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
export interface TeacherState {
    _id: number;
    _priority_number: number;
    _name: string;
    _name_jpn: string;
    _customers_language: number;
    _status: boolean;
    _details_teaches: string;
    _details_other_language: string;
    _details_education: string;
    _details_speciality: string;
    _details_career: string;
    _details_comment: string;
    _details_testimonial: string;
    _details_jpn_teaches: string;
    _details_jpn_other_language: string;
    _details_jpn_education: string;
    _details_jpn_speciality: string;
    _details_jpn_career: string;
    _details_jpn_comment: string;
    _details_jpn_testimonial: string;
    _skype_name: string;
    _email: string;
    _picture: string;
    _user_id: string;
    _password: string;
    _authority: number;
}

export interface ScheduleState {
    _date: Date;
    _can_reserve: boolean;
    _reserved_user: number;
}

export interface CustomerState {
    _id: number;
    _name: string;
    _nick_name: string;
    _gender: string; // M or F にするか数字で0 or 1 にするか
    _birthday: Date; // 資料だと日・月・年が分かれてプルダウンになっているが・・・
    _skype_name: string;
    _email: string;
    _password: string;
    _french_level: number;
    _learning_experience: string; // 学習経験
    _learning_purpose: number;
    _mother_tongue: string; // 母国語
    _how_finded: number; // このサイトを知ったきっかけ
    _other_language_1: string;
    _other_language_level_1: number;
    _other_language_2: string;
    _other_language_level_2: number;
    _program_code: number;
    _remark: number;
    _client_code: number;
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
    _name: string; // 顧客名(CustomerState._name)
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
    _id: number;
    _name: string;
    _gender: string;
    _country: string; // タイムゾーン　どこで定義するのか不明・・・
    _skype_name: string;
    _email: string;
}
