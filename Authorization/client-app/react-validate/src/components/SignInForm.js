import React, { useState } from "react";
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FieldArray,
    FastField,
    validateYupSchema
} from 'formik'
import * as Yup from 'yup'
import TextError from './textError'
import DateTimePicker from "./DatePicker";

import { Link } from "react-router-dom"

//css
import "react-datepicker/dist/react-datepicker.css";
import { date } from "yup/lib/locale";

import userService from "../services/userService"

const initialValues = {
    name: '',
    email: '',
}


const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
// const minDate = new Date(Date.now() - 10000) .min(minDate, "Date can't be more then 100 years ago")
const maxDate = new Date(Date.now())

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    password: Yup.string().required("Password is required"),
})

const validateComments = value => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}

function SignInForm() {
    const [formValues, setFormValues] = useState(null)
    const [value, onChange] = useState(new Date());
    const [isLogin, setIsLogin] = useState(false);


    const onSubmit = (values, submitProps) => {
        submitProps.setSubmitting(false)
        submitProps.resetForm({
            values: {
                email: '',
                password: '',
            }
        })

        let data =
        {
            email: values.email,
            password: values.password
        }

        userService.login(data).then(function (isOk) {
            setIsLogin(isOk)
        })
    }

    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            {formik =>
                <Form>
                    <h1>SIGN IN</h1>
                    <div className='form-control'>
                        <label htmlFor='email'>Email</label>
                        <Field type='email' id='email' name='email' />
                        <ErrorMessage name='email'>
                            {error => <div className='error'>{error}</div>}
                        </ErrorMessage>

                        <label htmlFor='password'>Password</label>
                        <Field type='text' id='password' name='password' />
                        <ErrorMessage name='password'>
                            {error => <div className='error'>{error}</div>}
                        </ErrorMessage>

                        {isLogin === true &&
                            <h3> LOGIN IS SUCCESS </h3>
                        }

                        <button
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Login
                        </button>

                        <Link to="/" className="btn">REGISTER</Link>

                    </div>

                </Form>
            }

        </Formik>
    );
}

export default SignInForm;