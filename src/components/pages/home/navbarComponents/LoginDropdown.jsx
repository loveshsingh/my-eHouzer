import React, {useEffect, useState} from "react";
import loginDropdownStyles from "../../../../styles/componentStyles/navbarComponentsStyles/LoginDropdown.module.css"
import Link from "next/link";
import AppRoundButton from "../../../lib/AppRoundButton";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../../actions/login";
import CheckOutsideClick from "../../../../base/CheckOutsideClick";
import {AppColors} from "../../../../public/AppColors";
import AppIcon from "../../../lib/AppIcon/AppIcon";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description login Dropdown Component.
 * @since 10-01-2023
 */
const LoginDropdown = () => {

    const [userName, setUserName] = useState('');
    const {userDetails, isLoggedIn} = useSelector((state) => state.authReducer);


    useEffect(() => {
        if (userDetails) {
            setUserName(userDetails?.username)
        }
    }, [userDetails]);

    const [show, setShow] = useState(false)

    const router = useRouter();
    const dispatch = useDispatch();

    const onClick = () => {
        setShow(!show)
    }

    useEffect(() => {
        // add event listener to toggle body overflow when dropdown is shown/hidden
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }

        // cleanup function to remove event listener
        return () => {
            document.body.style.overflow = "visible";
        };
    }, [show]);

    const onLoginClick = () => {
        router.push("/signin")
    }

    const onLogoutClick = () => {
        dispatch(logout(onLogoutSuccess))
    }

    const onLogoutSuccess = (isLoggedOut) => {
        if (isLoggedOut) {
            router.push("/signin");
            setShow(false)
        }
    }

    return (
        <>
            <div className={loginDropdownStyles["login-button-wrapper"]}>
                {!isLoggedIn ? <AppRoundButton buttonStyle={loginDropdownStyles["login-button-wrapper__button"]}
                                               buttonText={"Login/Register"}
                                               type={"primary"} onClick={onLoginClick}/> :
                    <div className={loginDropdownStyles["login-button-wrapper__dropdown-user-image-wrapper"]}
                         onClick={() => onClick()}>
                        <p className={loginDropdownStyles["login-button-wrapper__dropdown-user-image-text"]}>{userName && userName.charAt(0)}</p>
                    </div>
                }

                <CheckOutsideClick onClickOutside={() => {
                    setShow(show)
                }}>
                    <div
                        className={show ? loginDropdownStyles["login-button-wrapper__dropdown--show"] : loginDropdownStyles["login-button-wrapper__dropdown--hide"]}>

                        <div className={loginDropdownStyles["login-button-wrapper__dropdown-header"]}>
                            <div className={loginDropdownStyles["login-button-wrapper__dropdown-user-image-wrapper"]}>
                                <p className={loginDropdownStyles["login-button-wrapper__dropdown-user-image-text"]}>{userName && userName.charAt(0)}</p>
                            </div>

                            <div className={loginDropdownStyles["login-button-wrapper__dropdown-details"]}>
                                <p className={loginDropdownStyles["login-button-wrapper__dropdown-user-text"]}>{userName}</p>
                                {/*<p className={loginDropdownStyles["login-button-wrapper__dropdown-user-email"]}>lovesh@metazonetechnologies.com</p>*/}
                            </div>
                        </div>
                        <ul className={loginDropdownStyles["login-button-wrapper__dropdown-list-container"]}>
                            <li style={{listStyleType: "none"}}><Link
                                href={"/profile?activeTab=ProfileOverview"}
                                onClick={() => onClick()}
                                className={loginDropdownStyles["login-button-wrapper__dropdown-list"]}>
                                {/*>person_search</span>*/}
                                <AppIcon name={'material-symbols:person-search-rounded'}
                                         color={AppColors.englishRed} size={25} style={{
                                    marginRight: '1rem',
                                    cursor: 'pointer'
                                }}/>
                                <p>My Profile</p>
                            </Link>
                            </li>

                            <li style={{listStyleType: "none"}}><Link
                                href={"/profile?activeTab=MyProperty"}
                                onClick={() => onClick()}
                                className={loginDropdownStyles["login-button-wrapper__dropdown-list"]}>
                                {/*>search</span>*/}
                                <AppIcon name={'teenyicons:search-property-outline'}
                                         color={AppColors.englishRed} size={25} style={{
                                    marginRight: '1rem',
                                    cursor: 'pointer'
                                }}/>
                                <p>My Property</p>
                            </Link>
                            </li>

                            <li style={{listStyleType: "none"}}><Link
                                href={"/profile?activeTab=MyVisits"}
                                onClick={() => onClick()}
                                className={loginDropdownStyles["login-button-wrapper__dropdown-list"]}>
                                <AppIcon name={'mdi:laptop-account'}
                                         color={AppColors.englishRed} size={25} style={{
                                    marginRight: '1rem',
                                    cursor: 'pointer'
                                }}/>
                                <p>My Meetings</p>
                            </Link>
                            </li>

                            <li style={{listStyleType: "none"}}
                                className={loginDropdownStyles["login-button-wrapper__dropdown-list"]}>
                                <AppIcon name={'material-symbols:logout'}
                                         color={AppColors.englishRed} size={25} style={{
                                    marginRight: '1rem',
                                    cursor: 'pointer'
                                }}/>
                                <p onClick={onLogoutClick}>Logout</p>
                            </li>
                        </ul>
                    </div>
                </CheckOutsideClick>
            </div>
        </>
    )
}


export default LoginDropdown
