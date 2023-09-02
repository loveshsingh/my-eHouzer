import React, {useEffect, useState} from "react";
import loginDropdownStyles from "./AdminLoginDropdown.module.css"
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../../../../actions/login";
import {AppColors} from "../../../../../../public/AppColors";
import AppRoundButton from "../../../../../lib/AppRoundButton";
import CheckOutsideClick from "../../../../../../base/CheckOutsideClick";
import AppIcon from "../../../../../lib/AppIcon/AppIcon";


/**
 * @author Vikrant
 * @since 22-02-2023
 * @returns {JSX.Element}
 * @constructor
 * @description login Dropdown Component.
 */
const AdminLoginDropdown = () => {

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

    const onLoginClick = () => {
        router.push("/signin")
    }

    const onLogoutClick = () => {
        dispatch(logout(onLogoutSuccess))
    }

    const onLogoutSuccess = (isLoggedOut) => {
        if (isLoggedOut) {
            // router.push("/admin-login");
            router.push("/signin");
            setShow(false)
        }
    }

    return (
        <>
            <div className={loginDropdownStyles["login-button-wrapper"]}>
                {!isLoggedIn ? <AppRoundButton buttonStyle={loginDropdownStyles["login-button-wrapper__button"]}
                                               buttonText={"Login"}
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


export default AdminLoginDropdown
