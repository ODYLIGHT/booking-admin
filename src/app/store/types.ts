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
    state?: number | boolean;
    time_zone?: string;
    customers_language?: number;
    priority_number?: number;
    skype_name?: string;
    mail_address?: string;
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
    details_jp_other_language?: string;
    details_jp_education?: string;
    details_jp_speciality?: string;
    details_jp_career?: string;
    details_jp_comment?: string;
    details_jp_testimonial?: string;
}

// 生徒の個人情報
export interface CustomerState {
    id: number;
    name?: string;
    time_zone?: string;
}

// タイムテーブルに渡すUTC時間文字列
export interface TimeState {
    current: string[]; // DB取得したもの（講師スケジュールor生徒の予約）
    insert: string[]; // タイムテーブル上で新規に選択した時間
    delete: string[]; // currentに含まれている時間をタイムテーブルで選択した場合に格納される
}

// プルダウンメニュー用など、個人情報を取得する場合の型定義
export interface PersonalInformationState {
    id: number;
    name: string;
    time_zone: string;
}

// DBから取得する講師のスケジュール情報
export interface ScheduleState {
    teacher_id: number;
    schedule_date: Date;
}

// 予約情報
export interface ReservationState {
    id: number | string;
    customer_id: number;
    teacher_id: number;
    reserved_by?: number;
    reserved_date: Date;
}

///////////////////////////// この上までは間違いなく使っている(2018/01/05現在)

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
