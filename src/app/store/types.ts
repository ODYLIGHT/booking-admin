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

export interface ListState {
    [key: string]: { [key: string]: string }[];
}

/**
 * 講師の情報を表すインターフェイス
 */
export interface TeacherState {
    id: number;
    name?: string;
    name_first?: string;
    name_last?: string;
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
    name_first?: string;
    name_last?: string;
    time_zone?: string;
    gender?: number;
    birthday: Date,
    skype_name?: string;
    mail_address?: string;
    password?: string;
    french_level?: string;
    learning_experience?: string;
    purpose?: string;
    mother_tongue?: string;
    how_finded?: string;
    other_language1?: string;
    other_language1_level?: number;
    other_language2?: string;
    other_language2_level?: number;
    program_code?: string;
    remark?: string;
    client_code?: string;
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
    name_first: string;
    name_last: string;
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
    customer_id?: number;
    teacher_id?: number;
    name?: string;
    reserved_by?: number;
    reserved_date?: Date;
}

// search of booking で、検索をしたレスポンス = 一覧に渡す状態
export interface BookingState {
    customer_id?: number;
    reserved_id?: number | string;
    customer_name?: string;
    teacher_name?: string;
    reserved_date?: Date;
    reserved_by?: number;
}

// At `Student information`顧客検索結果
export interface StudentInformationState {
    id: number;
    name_first: string;
    name_last: string;
    time_zone: string;
    gender: number;
    skype_name: string;
    mail_address: string;
}

