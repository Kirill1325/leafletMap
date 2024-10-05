import { useAppDispatch } from '../../../app/store'
import { userApi } from '../../../entities/UserCard'
import { setUser } from '../../../entities/UserCard/model/userSlice'
import { Input } from '../../../shared/input'
import cl from './LoginPage.module.scss'
import { Button, ButtonVariants } from '../../../shared/button'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const LoginPage = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .min(3, 'Email must be 3 characters or more')
                .required('Email is required'),
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .min(4, 'Password must be 8 characters or more')
                .required('Required'),
        }),
        onSubmit: values => {
            login({ email: values.email, password: values.password })
                .unwrap()
                .then(fulfilled => {
                    localStorage.setItem('token', JSON.stringify(fulfilled.accessToken))
                    dispatch(setUser(fulfilled.user))
                    navigate('/')
                })
                .catch(rejected => console.error(rejected))
        },
    })

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [login] = userApi.useLoginMutation()

    return (
        <div className={cl.container}>
            <div className={cl.content}>
                <h1>Sing in</h1>
                <form onSubmit={formik.handleSubmit}>

                    <label htmlFor='email'>Email</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: 'red' }}>{formik.errors.email}</div>
                    ) : null}

                    <label htmlFor='password'>Password</label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    ) : null}

                    <Button
                        type="submit"
                        variant={ButtonVariants.contained}
                    >
                        Sing In
                    </Button>

                </form>

                <div className={cl.headingContainer}>
                    <h4>Or</h4>
                </div>

                <Button
                    type='button'
                    variant={ButtonVariants.outlined}
                >
                    <svg width="20px" height="20px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                        <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                        <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                        <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                    </svg>
                    <p>Continue with Google</p>
                </Button>

                <Link to='/registration'>Don't have an account? Sing up</Link>
            </div>

        </div>
    )
}
