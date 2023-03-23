import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import styles from "../../styles/Form.module.css"

import {HiAtSymbol, HiFingerPrint, HiUser} from "react-icons/hi"
import Link from "next/link";
import { useState } from "react";

import { useFormik } from "formik";
import { registerValidate } from "../../../lib/validate";

function RegisterPage() {

    const [show, setShow] = useState({password: false, cpassword:false});
    const formik = useFormik({
        initialValues:{
            username: '',
            email:'',
            password: '',
            cpassword: '',
        },
        validate: registerValidate,
        onSubmit
    })
    async function onSubmit(values){
        console.log(values)
    }
  return (
    <Layout>
        <Head>
            <title>Register</title>
        </Head>

        <section className="w-3/4 mx-auto flex flex-col gap-10">
            <div className="title">
                <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
                <p className="w-3/4 mx-auto text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero</p>
            </div>


            <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                <div className={styles.input_group}>
                    <input 
                        type="text" 
                        name="Username" 
                        placeholder="Username"
                        className={styles.input_text}
                        {...formik.getFieldProps('username')}
                    />
                    <span className="icon flex items-center px-4">
                      <HiUser size={25}/>
                    </span>
                </div>

                <div className={styles.input_group}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        className={styles.input_text}
                        {...formik.getFieldProps('email')}
                    />
                    <span className="icon flex items-center px-4">
                      <HiAtSymbol size={25}/>
                    </span>
                </div>
                {formik.errors.email&&formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span> : <></>}

                <div className={styles.input_group}>
                    <input 
                        type={`${show.password ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        className={styles.input_text}
                        {...formik.getFieldProps('password')}
                    />
                    <span className="icon flex items-center px-4" onClick={() => setShow({...show, password: !show.password})}>
                      <HiFingerPrint size={25} title="Ver password"/>
                    </span>
                </div>
                {formik.errors.password&&formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span> : <></>}
                <div className={styles.input_group}>
                    <input 
                        type={`${show.cpassword ? "text" : "password"}`}
                        name="cpassword"
                        placeholder="COnfirm password"
                        className={styles.input_text}
                        {...formik.getFieldProps('cpassword')}
                    />
                    <span className="icon flex items-center px-4" onClick={() => setShow({...show, cpassword: !show.cpassword})}>
                      <HiFingerPrint size={25} title="Ver password"/>
                    </span>
                </div>
                {formik.errors.cpassword&&formik.touched.cpassword ? <span className="text-rose-500">{formik.errors.cpassword}</span> : <></>}

                <div className="input-button">
                    <button className={styles.button} type="submit">
                        Register
                    </button>
                </div>
            </form>

            <p className="text-center text-gray-400"> Inicia Sesion Aqui <Link className="text-blue-700" href={'/register'}>LogIn</Link> </p>
        </section>
    </Layout>
    
  )
}

export default RegisterPage