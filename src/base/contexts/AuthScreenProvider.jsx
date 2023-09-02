import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

/**
 * @author Vikrant.
 * @since 04-05-2023.
 * @description to handle app screen.
 */
const AuthScreenProvider = ({children}) => {
    const TAG = 'AuthScreenProvider';
    const {isLoggedIn, userDetails} = useSelector((state) => state.authReducer);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userRoleList = userDetails?.userRoleList ?? [];
        const type = userRoleList?.[0]?.name;
        // const currentRoute = router.route;
        const currentRoute = window.location.pathname;

        let redirectUrl = '/404';
        let queryParams = router.query;
        if (Object.keys(router.query).length === 0) {
            const searchParams = new URLSearchParams(window.location.search);
            queryParams = Object.fromEntries(searchParams.entries())
        }
        let newCurrentRoute = '/admin';
        if (currentRoute.startsWith('/admin')) {
            newCurrentRoute = currentRoute; // for admin other URLs
        }

        switch (currentRoute) {
            case newCurrentRoute: {
                console.log('get current route', currentRoute)
                redirectUrl = '/';
                if (type === 'ADMIN') {
                    if (newCurrentRoute === '/admin/payment') {

                        redirectUrl = '/admin/payment';
                    } else {

                        redirectUrl = newCurrentRoute;
                    }
                } else if (type === 'CE') {
                    if (newCurrentRoute === '/admin/payment') {

                        redirectUrl = '/admin/payment';
                    } else {

                        redirectUrl = '/admin/ce';
                    }
                } else if (type === 'RM') {
                    redirectUrl = '/admin/rm';
                } else if (type === 'DEVELOPER') {
                    if (newCurrentRoute === '/admin/payment') {

                        redirectUrl = '/admin/payment';
                    } else {
                        redirectUrl = '/admin/builder';
                    }
                } else if (type === 'AGENT') {
                    redirectUrl = '/admin/agent';
                }
                break;
            }
            case '/signin':
            case '/signin/':
            case '/': { // for home page
                redirectUrl = currentRoute;
                if (isLoggedIn) {
                    if (type === 'ADMIN') {
                        redirectUrl = '/admin';
                    } else if (type === 'CE') {
                        redirectUrl = '/admin/ce';
                    } else if (type === 'RM') {
                        redirectUrl = '/admin/rm';
                    } else if (type === 'DEVELOPER') {
                        redirectUrl = '/admin/builder';
                    } else if (type === 'AGENT') {
                        redirectUrl = '/admin/agent';
                    } else if (type === 'CUSTOMER') {
                        redirectUrl = '/'
                    }
                }
                break;

            }
            case '/payment': {
                redirectUrl = currentRoute;
                if (isLoggedIn) {
                    if (type === 'ADMIN') {
                        redirectUrl = '/admin';
                    } else if (type === 'CE') {
                        redirectUrl = '/admin/ce';
                    } else if (type === 'RM') {
                        redirectUrl = '/admin/rm';
                    } else if (type === 'DEVELOPER') {
                        redirectUrl = '/admin/builder';
                    } else if (type === 'AGENT') {
                        redirectUrl = '/admin/agent';
                    } else if (type === 'CUSTOMER') {
                        redirectUrl = currentRoute
                    }
                }
                break;
            }

            default: {
                redirectUrl = currentRoute;
            }
        }

        router.push({
            pathname: redirectUrl,
            query: queryParams,
        }).then().finally(() => setTimeout(() => {
            setIsLoading(false)
        }, 500))

    }, [router.route])

    if (isLoading)
        return null;

    return (
        <>
            {children}
        </>
    );
};

export default AuthScreenProvider;
