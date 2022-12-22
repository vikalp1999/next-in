// import { container, formsContainer, signinSignup, signUpForm, signInForm, title, inputField, socialText, socialMedia, socialIcon, btnTransparent, btn, panelsContainer, image, leftPanel, rightPanel, content, head, para } from '../styles/auth.module.css';
import { FaFacebookF } from 'react-icons/fa';
import { BsGoogle, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from '../redux/auth/auth.action';

export default function Auth() {
    const [regi, setRegi] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const { isRegistered, isAuth, userData } = useSelector(store => store.auth);
    console.log(userData)

    const handleChange = (event) => {
        const { value, name } = event.target;
        setForm(
            {
                ...form,
                [name]: value
            }
        )
    }

    const handleSignup = (event) => {
        event.preventDefault();
        dispatch(registerUser(form)).then(() => {
            setRegi("")
        })
    }

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(loginUser(form))
    }

    return (
        <>
            <div className={`container ${regi}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={handleLogin} action="#" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <input name='email' type="email" onChange={handleChange} placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <input name='password' type="password" onChange={handleChange} placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" className="btn solid" />
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <FaFacebookF />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsTwitter />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsGoogle />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsLinkedin />
                                </a>
                            </div>
                        </form>
                        <form onSubmit={handleSignup} action="#" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <input name='name' type="text" onChange={handleChange} placeholder="Name" />
                            </div>
                            <div className="input-field">
                                <input name='email' type="email" onChange={handleChange} placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <input name='password' type="password" onChange={handleChange} placeholder="Password" />
                            </div>
                            <input type="submit" className="btn" value="Sign up" />
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <FaFacebookF />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsTwitter />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsGoogle />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsLinkedin />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button className="btn transparent" onClick={() => { setRegi("sign-up-mode") }}>
                                Sign up
                            </button>
                        </div>
                        <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/log.svg" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={() => { setRegi("") }}>
                                Sign in
                            </button>
                        </div>
                        <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/register.svg" className=" image" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}