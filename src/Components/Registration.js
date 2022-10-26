import React, { useEffect, useReducer, useState } from 'react';
import { validate } from './Validate';
import style from '../styles/styles.module.css';
import { notify } from './notify';
import { Link } from 'react-router-dom';

const initialValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAccepted: false,
}
let isErrors = false;
const Registration = () => {
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        isAccepted: false,

    })
    const [errors, setErrors] = useState({});

    const [fields, dispatch] = useReducer(reducer, initialValue)
    function reducer(state, action) {
        switch (action.type) {
            case 'username':
                return { ...state, username: action.value }
            case 'email':
                return { ...state, email: action.value }
            case 'password':
                return { ...state, password: action.value }
            case 'confirmPassword':
                return { ...state, confirmPassword: action.value }
            case 'isAccepted':
                return { ...state, isAccepted: action.value }
            default: return initialValue;
        }
    }
    const focusHandler = (e) => {
        setTouched({ ...touched, [e.target.name]: true })
    }
    const changeHandler = (e) => {
        if (e.target.name === 'isAccepted') {
            dispatch({ type: e.target.name, value: e.target.checked })
        }
        else
            dispatch({ type: e.target.name, value: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();

        setTouched({
            username: true,
            email: true,
            password: true,
            confirmPassword: true,
            isAccepted: true,

        })
        if (Object.keys(errors).length) {
            isErrors = true;
            notify('failed', 'فیلد ها را با دقت پر کنید')

        }
        else {
            notify('success', 'تبریک!')

        }


    }

    useEffect(() => {
        setErrors(validate('register', fields))
        isErrors = false;
    }, [fields])
    return (
        <div className={style.registrationForm}>
            <form onSubmit={submitHandler} className={isErrors ? style.formbuzz : undefined}>
                <div>
                    <h5 className={errors.username && touched.username ? style.blink_error : undefined}> {errors.username && touched.username ? errors.username : undefined}</h5>
                    <input type='text' id='username' name='username' placeholder='نام کاربری' value={fields.username} className={errors.username && touched.username ? style.danger : undefined} onChange={changeHandler} onFocus={focusHandler} />
                </div>
                <div>
                    <h5 className={errors.email && touched.email ? style.blink_error : undefined}> {errors.email && touched.email ? errors.email : undefined}</h5>
                    <input type='text' id='email' name='email' placeholder='ایمیل' value={fields.email} className={errors.email && touched.email ? style.danger : undefined} onChange={changeHandler} onFocus={focusHandler} />
                </div>
                <div>
                    <h5 className={errors.password && touched.password ? style.blink_error : undefined}> {errors.password && touched.password ? errors.password : undefined}</h5>
                    <input type='text' id='password' name='password' placeholder='رمز عبور' value={fields.password} className={errors.password && touched.password ? style.danger : undefined} onChange={changeHandler} onFocus={focusHandler} />
                </div>
                <div>
                    <h5 className={errors.confirmPassword && touched.confirmPassword ? style.blink_error : undefined}> {errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : undefined}</h5>
                    <input type='text' id='confirmPassword' name='confirmPassword' placeholder='تایید رمز عبور' value={fields.confirmPassword} className={errors.confirmPassword && touched.confirmPassword ? style.danger : undefined} onChange={changeHandler} onFocus={focusHandler} />
                </div>
                <div className={style.term}>
                    <input type='checkbox' id='isAccepted' name='isAccepted' value={fields.isAccepted} onChange={changeHandler} onFocus={focusHandler} />
                    <span>{errors.isAccepted ? errors.isAccepted : "بسیار خب"}</span>
                </div>
                <button type='submit' id='submitBtn'>ثبت نام</button>
                <Link to='/Login'>ورود</Link>

            </form>

        </div>
    );
};

export default Registration;