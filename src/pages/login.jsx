import { useRouter } from "next/router"
import { signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import styles from "../styles/Form.module.css"
import Image from "next/image";

import {HiAtSymbol, HiFingerPrint} from "react-icons/hi"
import { useState } from "react";

import { useFormik } from "formik";
import login_validate from "../../lib/validate";


export default function LoginPage() {
 
    const [show, setShow] = useState(false);
    //Formik Hook
    const formik = useFormik({
      initialValues:{
        email:'',
        password: '',
      },
      validate: login_validate,
      onSubmit
    });
    console.log(formik.errors)

    async function onSubmit(values){
      console.log(values);
    };

    //Google Handler 
    async function handleGoogleSignin(){
      signIn('google',{ callbackUrl: 'http://localhost:3000'})
    }


  return (
    <Layout>
        <Head>
            <title>Login</title>
        </Head>

        <section className="w-3/4 mx-auto flex flex-col gap-10">
            <div className="title">
                <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
                <p className="w-3/4 mx-auto text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero</p>
            </div>


            <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                
                <div className={`${styles.input_group} ${formik.errors.email&&formik.touched.email ?  'border-rose-600':''}`}>
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
                
                <div className={`${styles.input_group} ${formik.errors.password&&formik.touched.password ?  'border-rose-600':''}`}>
                    <input 
                        type={`${show ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        className={styles.input_text}
                        {...formik.getFieldProps('password')}
                    />
                    <span className="icon flex items-center px-4" onClick={() => setShow(!show)}>
                      <HiFingerPrint size={25} title="Ver password"/>
                    </span>
                </div>
                {formik.errors.password&&formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span> : <></>}
                <div className="input-button">
                    <button className={styles.button} type="submit">
                        Login
                    </button>
                </div>
            </form>

            <p className="text-center text-gray-400"> Registrate Aqui <Link className="text-blue-700" href={'/register'}>SignIn</Link> </p>
        </section>
    </Layout>
  )
}