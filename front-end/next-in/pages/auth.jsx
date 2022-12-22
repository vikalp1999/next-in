// import { container, formsContainer, signinSignup, signUpForm, signInForm, title, inputField, socialText, socialMedia, socialIcon, btnTransparent, btn, panelsContainer, image, leftPanel, rightPanel, content, head, para } from '../styles/auth.module.css';
import { FaFacebookF } from 'react-icons/fa';
import { BsGoogle, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { useState } from "react"

export default function Auth() {
    const [left, setLeft] = useState("");
    return (
        <>
            <div class={`container ${left}`}>
                <div class="forms-container">
                    <div class="signin-signup">
                        <form action="#" class="sign-in-form">
                            <h2 class="title">Sign in</h2>
                            <div class="input-field">
                                <input type="email" placeholder="Email" />
                            </div>
                            <div class="input-field">
                                <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" class="btn solid" />
                            <p class="social-text">Or Sign in with social platforms</p>
                            <div class="social-media">
                                <a href="#" class="social-icon">
                                    <FaFacebookF />
                                </a>
                                <a href="#" class="social-icon">
                                    <BsTwitter />
                                </a>
                                <a href="#" class="social-icon">
                                    <BsGoogle />
                                </a>
                                <a href="#" class="social-icon">
                                    <BsLinkedin />
                                </a>
                            </div>
                        </form>
                        <form action="#" class="sign-up-form">
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                                <input type="text" placeholder="Name" />
                            </div>
                            <div class="input-field">
                                <input type="email" placeholder="Email" />
                            </div>
                            <div class="input-field">
                                <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" class="btn" value="Sign up" />
                            <p class="social-text">Or Sign up with social platforms</p>
                            <div class="social-media">
                                <a href="#" class="social-icon">
                                    <FaFacebookF />
                                </a>
                                <a href="#" class="social-icon">
                                    <BsTwitter />
                                </a>
                                <a href="#" class="social-icon">
                                    <BsGoogle />
                                </a>
                                <a href="#" class="social-icon">
                                    <BsLinkedin />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="panels-container">
                    <div class="panel left-panel">
                        <div class="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button class="btn transparent" onClick={() => { setLeft("sign-up-mode") }}>
                                Sign up
                            </button>
                        </div>
                        <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/log.svg" class="image" alt="" />
                    </div>
                    <div class="panel right-panel">
                        <div class="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button class="btn transparent" id="sign-in-btn" onClick={() => { setLeft("") }}>
                                Sign in
                            </button>
                        </div>
                        <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/register.svg" class=" image" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}