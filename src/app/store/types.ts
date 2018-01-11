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
    jp_name?: string;
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

// タイムテーブルに渡すUTC時間文字列
export interface TimeState {
    current: string[]; // DB取得したもの（講師スケジュールor生徒の予約）
    insert: string[]; // タイムテーブル上で新規に選択した時間
    delete: string[]; // currentに含まれている時間をタイムテーブルで選択した場合に格納される
}

// 生徒の個人情報
export interface CustomerState {
    id: number;
    name?: string;
    time_zone?: string;
}

// 見本
// interface CustomerState {
//     id: number; // プライマリーキー
//     name: string; // ローマ字での名前 'YAMADA Taro' etc
//     time_zone: string; // 'Asia/Tokyo' etc
//     nick_name: string; // 英語画面で必要
//     jp_name: string; // 日本語画面で必要
//     gender: string; // male or female 数字でもよいかと
//     birthday: Date;
//     skype_name: string;
//     mail_address: string;
//     password: string;
//     french_level: string; // 現在のフランス語レベル
//     learning_experience: string; // 学習経験
//     purpose: string; // 学習目的
//     mother_tongue: string; // 母国語
//     how_finded: string; // このサイトを知ったきっかけ
//     other_language1: string;
//     other_language1_level: number;
//     other_language2: string;
//     other_language2_level: number;
//     program_code: string;
//     remark: string;
//     client_code: string;
// }

// export interface CustomerState {
//     id: number;
//     customerName: string;
//     nickName: string;
//     jpName: string;
//     gender: string; // male or female
//     birth: Date; // データ格納時はDate型にして、利用時に別途分解する
//     skypeName: string;
//     mailAddress: string;
//     password: string;
//     frenchLevel: string;
//     learningExperience: string; // 学習経験
//     purpose: string;
//     motherTongue: string; // 母国語
//     howFinded: string; // このサイトを知ったきっかけ
//     otherLanguage1: string;
//     otherLanguage1_level: number;
//     otherLanguage2: string;
//     otherLanguage2_level: number;
//     programCode: string;
//     remark: string;
//     clientCode: string;
// }

// タイムテーブルに渡すために生徒の予約情報を変換したもの
export interface CustomerReservationState {
    current: string[];
    insert: string[];
    delete: string[];
}

// DBから取得する講師のスケジュール情報
export interface ScheduleState {
    teacher_id: number;
    schedule_date: Date;
}

// 予約情報
export interface ReservationState {
    customer_id: number;
    teacher_id: number;
    reserved_date: Date;
}

// この上までは間違いなく使っている(2018/01/05現在)

// export interface ReservationState {
//     _id: number;
//     _reserve_date: Date;
//     _teacher_id: number;
//     _status: string;
// }

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
