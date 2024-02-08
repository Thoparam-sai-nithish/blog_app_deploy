import React ,{useState} from 'react'
import {useForm} from 'react-hook-form' 
import axios from 'axios';
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsFillTelephonePlusFill } from "react-icons/bs";   
import { IoPersonAddSharp } from "react-icons/io5";
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formState, setFormState] = useState('login')
    const [signupErr, setSignupErr] = useState();
    const [loginErr,setLoginErr] = useState()
    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate();

    function submitLogin(data){
        const loginData = {
            email : data.loginEmail,
            password : data.loginPass
        }
        axios.post('http://localhost:3500/accounts/login',loginData)
        .then((res)=>{
            console.log("Result :", res);
            if(res.data.success) {
                localStorage.setItem('token', res.data.token)
                navigate('/Home')
            }
            else setLoginErr(res.data.message)
        })
        .catch((err)=>{
            setLoginErr("Something went worng!")
            console.log("Error : ", err)
        })
    }
    function submitSignup(data){
        const signupData = {
            userName: data.userName,
            email : data.signupEmail,
            mobile: data.mobile,
            testPass: data.testPass,
            signupPass: data.signupPass
        }
        if(signupData.testPass === signupData.signupPass){
            signupData.password = signupData.signupPass;
            delete signupData.testPass
            delete signupData.signupPass
            if(signupData.mobile.length !== 10){
                setSignupErr('invalid mobile number!')
            }
            else{
                console.log(signupData)
                axios.post('http://localhost:3500/accounts/createAccount',signupData)
                .then((res)=>{
                    console.log("Result :", res); 
                    if(res.data.success!==true) setSignupErr(res.data.message)
                    else{ window.location.reload();}
                })
                .catch((err)=>{
                    console.log("Error : ", err)
                    setSignupErr("Something went wrong")
                })
            }
        }
        else{
            setSignupErr('Passwords not Matched!')
            console.log('passwords did not matched')
        }
    }

    return (
        <div className="Login">
           <div className="forms">
                <div className={formState==='login'? 'loginForm active': 'loginForm inactive'}>
                    <form className='' action="" onSubmit={handleSubmit(submitLogin)}>
                        <h2 className=''>
                            <RiAccountCircleFill className='inputIcon'/>
                            Login
                        </h2>
                        {loginErr&& <h3 style={{
                            padding:'0px',margin:0,color:'red',fontSize:'20px',border:`1px solid red`,borderRadius:'2px'
                        }}>{loginErr}</h3>}
                        <div className="inputBox">
                            <input type="email" name="email" id="loginEmail" required={true} {...register('loginEmail') }/>
                            <IoMail className='inputIcon'/>
                            <span className='inputSpan'>Email</span> 
                        </div>
                        <div className="inputBox">
                            <input type="password" name="password" id="loginPass" required={true} {...register('loginPass') }/>
                            <RiLockPasswordFill className='inputIcon'/>
                            <span className='inputSpan'>Password</span>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="submit" />
                        </div>
                    </form>
                </div>
                <div className={formState==='signup'?'signupForm active':'signupForm inactive'}>
                    <form className='' action="" onSubmit={handleSubmit(submitSignup)}>
                        <h2 className=''
                            style={{margin:0,padding:0}}
                        >
                            <RiAccountCircleFill className='inputIcon'/>
                            Signup
                        </h2>
                        {signupErr&& <h3 style={{
                            padding:'0px',margin:0,color:'red',fontSize:'20px',border:`1px solid red`,borderRadius:'2px'
                        }}>{signupErr}</h3>}
                        <div className="inputBox">
                            <input type="text" name="userName" id="userName" required={true} {...register('userName') }/>
                            <IoPersonAddSharp className='inputIcon'/>
                            <span className='inputSpan'>User Name</span>
                        </div>
                        
                        <div className="inputBox">
                            <input type="email" name="email" id="signupEmail" required={true} {...register('signupEmail') }/>
                            <IoMail className='inputIcon'/>
                            <span className='inputSpan'>Email</span>
                        </div>

                        <div className="inputBox">
                            <input type="number" name="mobile" id="mobile" required={true} {...register('mobile') }/>
                            <BsFillTelephonePlusFill className='inputIcon'/>
                            <span className='inputSpan'>Mobile</span>
                        </div>

                        <div className="inputBox">
                            <input type="password" name="testPass" id="testPass" required={true} {...register('testPass') }/>
                            <IoMail className='inputIcon'/>
                            <span className='inputSpan'>Password</span>
                        </div>

                        <div className="inputBox">
                            <input type="password" name="password" id="signupPass" required={true} {...register('signupPass') }/>
                            <RiLockPasswordFill className='inputIcon'/>
                            <span className='inputSpan'>Re-enter Password</span>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="submit" />
                        </div>
                    </form>
                    </div>
                <div className={formState==='signup'?'overlay-left active':'overlay-left inactive'}>
                    <h2>Had an account! Click the Login button below to signin!</h2>
                    <p>A Blog Application is a platform enabling users to create, publish, and manage blog posts. It includes features like content editing, categorization, user authentication, and audience engagement tools.</p>
                    <button onClick={()=>{setFormState('login')}}>Login</button>
                </div>
                <div className={formState==='login'? 'overlay-right active':'overlay-right inactive'}>
                    <h2>Don't have a account! Click the Login button below to create!</h2>
                    <p>A Blog Application is a platform enabling users to create, publish, and manage blog posts. It includes features like content editing, categorization, user authentication, and audience engagement tools.</p>
                    <button onClick={()=>{setFormState('signup')}}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Login