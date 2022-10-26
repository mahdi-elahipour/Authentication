import { validateEmail } from "./emailValidation";

export function validate(type, fields) {

    const errors = {};

    if (type === 'register') {
        if (!fields.username.trim()) {
            errors.username = 'نام کاربریتان را وارد نمایید';
        }
        else {
            delete errors.username;
        }
        if (!fields.confirmPassword) {
            errors.confirmPassword = 'رمز عبور را مجددا وارد نمایید';

        } else
            if (fields.password !== fields.confirmPassword) {
                errors.confirmPassword = 'رمز عبور با تایید رمز یکسان نیست!'
            } else {
                delete errors.confirmPassword;
            }
        if (!fields.isAccepted) {
            errors.isAccepted = 'موافقت نامه را تایید نمایید';

        } else {
            delete errors.isAccepted;
        }
    }

    if (!fields.email) {
        errors.email = 'ایمیل را وارد نمایید'
    } else if (!validateEmail(fields.email)) {
        errors.email = 'ایمیل نامعتبر!'
    } else {
        delete errors.email;
    }
    if (!fields.password) {
        errors.password = 'رمز عبور را وارد نمایید';

    } else if (fields.password.length < 6) {
        errors.password = 'رمز عبور حداقل شامل 6 کاراکتر'
    }
    else {
        delete errors.password;
    }


    return errors;
}

