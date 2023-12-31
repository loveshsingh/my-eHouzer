import '../styles/globals.css';
import {Provider, useSelector} from "react-redux";
import {store, wrapper} from "../store/store";
import FullPageLoader from "../components/loaders/FullPageLoader";
import FormSidebar from "../components/adminComponents/components/formSidebar/FormSidebar";
import Head from "next/head";
import AppWrapper from "../base/contexts/AppWrapper";
import ShortlistedProvider from "../base/contexts/ShortlistedProvider";
import React, {useEffect, useState} from 'react';
import AppProvider from "../base/contexts/AppProvider";
import CommonNavbar from "../components/commonNavbar/CommonNavbar";
import MessageProvider from "../base/contexts/MessageProvider";
import AuthScreenProvider from "../base/contexts/AuthScreenProvider";
import {Role} from "../components/adminComponents/constants/role";
import AdminLayout from "../components/adminComponents/components/layout/AdminLayout";
function App({Component, pageProps}) {
    const {userDetails} = useSelector((state) => state.authReducer);
    let content= <>
        <CommonNavbar/>
        <Component {...pageProps}/>
    </>
    // Todo:for multiple modules
    if(userDetails?.userRoleList && userDetails?.userRoleList?.[0]?.id !== Role.CUSTOMER){
        content= <AdminLayout>
            <Component {...pageProps} />
        </AdminLayout>
    }

    return (
        <>
            <React.StrictMode>
                <AppProvider>
                    <Provider store={store}>
                        <MessageProvider>
                            <AppWrapper>
                                <AuthScreenProvider>
                                    <ShortlistedProvider>
                                        <FullPageLoader/>
                                        <Head>
                                            <title>eHouzer</title>
                                            <meta name="description" content="Generated by create next app"/>
                                            <link rel="icon" href="/static/favicon.ico"/>
                                            <link rel="stylesheet"
                                                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"/>
                                        </Head>

                                        {content}

                                        <FormSidebar/>
                                    </ShortlistedProvider>
                                </AuthScreenProvider>
                            </AppWrapper>
                        </MessageProvider>
                    </Provider>
                </AppProvider>
            </React.StrictMode>
        </>
    );
}

export default wrapper.withRedux(App);
