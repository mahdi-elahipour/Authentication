
import React, { useEffect, useReducer, useState } from 'react';
import { validate } from './Validate';
import style from '../styles/styles.module.css';
import { notify } from './notify';
import { Link } from 'react-router-dom';

const initialValue = {

    email: '',
    password: '',

}
let isErrors = false;
const Login = () => {
    const [touched, setTouched] = useState({

        email: false,
        password: false,


    })
    const [errors, setErrors] = useState({});

    const [fields, dispatch] = useReducer(reducer, initialValue)
    function reducer(state, action) {
        switch (action.type) {

            case 'email':
                return { ...state, email: action.value }
            case 'password':
                return { ...state, password: action.value }

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

            email: true,
            password: true,


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
        setErrors(validate('login', fields))
        isErrors = false;
    }, [fields])
    return (
        <div className={style.registrationForm}>
            <form onSubmit={submitHandler} className={isErrors ? style.formbuzz : undefined}>

                <div>
                    <h5 className={(errors.email && touched.email) ? style.blink_error : undefined}> {(errors.email && touched.email) ? errors.email : undefined}</h5>
                    <input type='text' id='email' name='email' placeholder='email' value={fields.email} className={(errors.email && touched.email) ? style.danger : undefined} onChange={changeHandler} onFocus={focusHandler} />
                </div>
                <div>
                    <h5 className={errors.password && touched.password ? style.blink_error : undefined}> {errors.password && touched.password ? errors.password : undefined}</h5>
                    <input type='text' id='password' name='password' placeholder='password' value={fields.password} className={errors.password && touched.password ? style.danger : undefined} onChange={changeHandler} onFocus={focusHandler} />
                </div>

                <button type='submit' id='submitBtn'>ورود</button>
                <Link to='/Registration'>ثبت نام</Link>
            </form>

        </div>
    );
};

export default Login;