import React from 'react';
import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import s from './Footer.module.css'
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
        <footer className="texts-login-footer">
            <div className={s.footer}>

                <ul className={s.icons}>
                    <li>
                        <a href="https://www.facebook.com">
                            <BsFacebook size={30} color={"white"} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com">
                            <BsInstagram size={30} color={"white"} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.twitter.com">
                            <BsTwitter size={30} color={"white"} />
                        </a>
                    </li>
                </ul>
                <div >
                    <Link className={s.about}
                        id="Link"
                        to="/aboutUs">
                        About Us


                    </Link>
                </div>
                <div >
                    <a className={s.copyright}
                        href="copyr">

                        Copyright © {new Date().getFullYear()} Fly Books
                    </a>
                </div>
            </div>
        </footer>
    )
}




