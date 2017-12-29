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

/**
 * 講師の情報を表すインターフェイス
 * `id`以外は無くてもよいものとしてます(nameとかtime_zoneも必須にしてもよいかもしれません)
 */
export interface TeacherState {
    id: number;
    name?: string;
    name_jp?: string;
    state?: number | boolean;
    time_zone?: string;
    customers_language?: number;
    priority_number?: number;
    skype_name?: string;
    email?: string;
    picture?: string;
    user_id?: string;
    password?: string;
    authority?: number;
    details_teaches?: number;
    details_other_language?: string;
    details_education?: string;
    details_speciality?: string;
    details_career?: string;
    details_comment?: string;
    details_testimonial?: string;
    details_jp_teaches?: number;
    details_jp_other_language?: string;
    details_jp_education?: string;
    details_jp_speciality?: string;
    details_jp_career?: string;
    details_jp_comment?: string;
    details_jp_testimonial?: string;
}

// DBから取得する講師のスケジュール情報
export interface ScheduleState {
    teacher_id: number;
    schedule_date: Date;
}

// タイムテーブルに渡すために講師スケジュールの情報を変換したもの
export interface TeacherSchedulesState {
    current: string[];
    insert: string[];
    delete: string[];
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

// タイムテーブルに渡すために生徒の予約情報を変換したもの
export interface CustomerReservationState {
    current: string[];
    insert: string[];
    delete: string[];
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
