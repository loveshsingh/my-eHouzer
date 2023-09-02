import React, {useEffect, useState} from "react";
import {getAuthAsyncStorage} from "../../storage/AuthAsyncStorage";
import {useDispatch, useSelector} from "react-redux";
import {setAuthState} from "../../actions/login";

const AppWrapper = ({children}) => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAuthData = async () => {
            const authStorage = await getAuthAsyncStorage();
            const userDetails = JSON.parse(authStorage?.userDetails)
            if (userDetails) {
                dispatch(setAuthState(userDetails))
            }
            setIsLoading(false);
        }

        loadAuthData().then();
    }, []);

    if (isLoading)
        return null;

    return (
        <>
            {children}
        </>
    );
};
export default AppWrapper;
