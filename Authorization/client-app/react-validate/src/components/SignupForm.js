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
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    password: Yup.string().required("Password is required"),
    passwordConf: Yup.string().required("Confirm password").oneOf([Yup.ref('password'), null], "Password not match"),
})

const validateComments = value => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}

function SignUpForm() {
    const [formValues, setFormValues] = useState(null)
    const [value, onChange] = useState(new Date());
    const [isRegister, setIsRegister] = useState(false);

    const onSubmit = (values, submitProps) => {
        // console.log('Form data', values)
        // console.log('submitProps', submitProps)
        submitProps.setSubmitting(false)
        submitProps.resetForm({
            values: {
                name: '',
                surname: '',
                email: '',
                password: '',
                passwordConf: '',
            }
        })

        let user =
        {
            firstName: values.name,
            lastName: values.surname,
            email: values.email,
            password: values.password
        }

        userService.register(user).then(function (isOk) {
            console.log("IS OK; ", isOk)
            setIsRegister(isOk);
        });
    }

    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            {formik =>
                <Form>
                    <h1>SIGN UP</h1>
                    <div className='form-control'>
                        <label htmlFor='name'>Name</label>
                        <Field type='text' id='name' name='name' />
                        <ErrorMessage name='name'>
                            {error => <div className='error'>{error}</div>}
                        </ErrorMessage>

                        <label htmlFor='name'>Surname</label>
                        <Field type='text' id='surname' name='surname' />
                        <ErrorMessage name='surname'>
                            {error => <div className='error'>{error}</div>}
                        </ErrorMessage>

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

                        <label htmlFor='passwordConf'>Confirm password</label>
                        <Field type='text' id='passwordConf' name='passwordConf' />
                        <ErrorMessage name='passwordConf'>
                            {error => <div className='error'>{error}</div>}
                        </ErrorMessage>

                        {isRegister === true &&
                            <h3> REGISTER IS SUCCESSFUL </h3>
                        }

                        <button
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Register
                        </button>

                        <Link to="/login" className="btn">LOGIN</Link>

                    </div>

                </Form>
            }

        </Formik>
    );
}

export default SignUpForm;