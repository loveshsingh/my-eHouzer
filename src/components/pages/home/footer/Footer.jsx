import * as React from 'react'
import footerStyle from "./Footer.module.css"
import Link from "next/link";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @since 16-12-2022.
 * @description to render Footer.
 * @return {JSX.Element}
 */
const Footer = () => {
    return (
        <div className={footerStyle["footer"]}>
            <div className={footerStyle["footer__contacts-wrapper"]}>
                <div className={footerStyle["footer__get-in-touch"]}>
                    {/*<div>
                        <Image src={logo} alt={"Signin image"} className={LoginStyle["login__right-container-logo"]}/>
                    </div>*/}
                    <h1 className={footerStyle["footer__get-in-touch-header"]}>Get in Touch</h1>
                    {/*  <p className={footerStyle[""]}>RERA ID: PL42151262316</p>*/}
                </div>
                <div className={footerStyle["footer__address"]}>
                    <h1 className={footerStyle["footer__address-header"]}>eHouzer</h1>
                    <p className={footerStyle[""]}>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s</p>
                </div>
                <div className={footerStyle["footer__email-call-wrapper"]}>
                    <div className={footerStyle[""]}>
                        <p className={footerStyle["footer__email-heading"]}>Email me at</p>
                        <a href={"mailto:hello@gmail.com"}><p
                            className={footerStyle["footer__email"]}>hello@gmail.com</p></a>
                    </div>

                    <div className={footerStyle[""]}>
                        <p className={footerStyle["footer__call-heading"]}>Call us</p>
                        <a href={"tel:9625802810"}><p className={footerStyle["footer__call"]}>+91-9876543210</p></a>
                    </div>
                </div>
            </div>

            <div className={footerStyle["footer__links-wrapper"]}>
                <div className={footerStyle["footer__overview-and-explore-wrapper"]}>
                    <div className={footerStyle["footer__overview-wrapper"]}>
                        <h3 className={footerStyle["footer__overview-heading"]}>Overview</h3>
                        <ul className={footerStyle["footer__overview-links-wrapper"]}>
                            <li className={footerStyle["footer__overview-links"]}><Link href="/about">About Us</Link>
                            </li>
                            <li className={footerStyle["footer__overview-links"]}><Link href="/blogs">Blogs & Press
                                Mentions</Link></li>
                            <li className={footerStyle["footer__overview-links"]}><Link href="/contact">Contact
                                Us</Link>
                            </li>
                            <li className={footerStyle["footer__overview-links"]}><Link href="/career">Careers</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={footerStyle["footer__explore-wrapper"]}>
                        <h3 className={footerStyle["footer__explore-heading"]}>Explore</h3>
                        <ul className={footerStyle["footer__explore-item-wrapper"]}>
                            <li className={footerStyle["footer__explore-item"]}>Developers</li>
                            <li className={footerStyle["footer__explore-item"]}><Link href="/channel-partners">Channel
                                Partners</Link></li>
                        </ul>

                        <div className={footerStyle["footer__policies-mobile"]}>
                            <p className={footerStyle["footer__link-hover"]} style={{marginBottom: "0.5rem"}}><Link href="/tnc">Terms &
                                Conditions</Link></p>
                            <p className={footerStyle["footer__link-hover"]}><Link href="/privacy-policy">Privacy Policy</Link></p>
                        </div>
                    </div>
                </div>



            </div>

            <div className={footerStyle["footer__copyright-wrapper"]}>
                <div className={footerStyle["footer__policies"]}>
                    <p className={footerStyle["footer__link-hover"]} style={{marginBottom: "0.5rem"}}><Link href="/tnc">Terms &
                        Conditions</Link></p>
                    <p className={footerStyle["footer__link-hover"]}><Link href="/privacy-policy">Privacy Policy</Link></p>
                </div>

                <div className={footerStyle["footer__copyright"]}>
                    <p className={footerStyle["footer__copyright-paragraph"]}>&#169; Copyright 2023 Pibyten Techverse
                        Private Limited</p>
                    <div className={footerStyle["footer__social-icons-wrapper"]}>
                        <AppIcon name={'akar-icons:instagram-fill'}
                                 color={AppColors.white} size={22} style={{marginRight: '1rem'}}/>
                        <AppIcon name={'akar-icons:facebook-fill'}
                                 color={AppColors.white} size={22} style={{marginRight: '1rem'}}/>
                        <AppIcon name={'akar-icons:linkedin-box-fill'}
                                 color={AppColors.white} size={22}/>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Footer;
