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
    _details_jpn_other_language: string ;
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
