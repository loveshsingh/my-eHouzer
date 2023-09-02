import * as React from 'react';
import {useEffect, useState} from 'react';
import updateRMStyles from './UpdateCustomerRemarks.module.css'
import AppRoundButton from "../../../../../lib/AppRoundButton";
import {useDispatch, useSelector} from "react-redux";
import {updateRMCustomerRemarks} from "../../../../../../actions/adminActions";
import addRMStyles from "../addRM/AddRM.module.css";

/**
 * @author Vikrant
 * @since 11-04-2023
 * @description to update Customer remarks form
 * @param onFormToggleHandle
 * @returns {JSX.Element}
 * @constructor
 */
const UpdateCustomerRemarks = ({onFormToggleHandle}) => {

    const dataForm = useSelector((state) => state.adminReducer.dataForm);
    const dispatch = useDispatch()
    const [rmId, setRmId] = useState('');

    /**
     * @author Vikrant
     * @since 11-04-2023
     * @description to initialize the state
     * @type {{userId: string, remarks: string}}
     */
    const rmCustomerFormDataInitialState = {
        userId: '',
        remarks: '',
    };

    const [customerFormData, setCustomerFormData] = useState(
        rmCustomerFormDataInitialState
    );

    const [isError, setIsError] = useState(rmCustomerFormDataInitialState);

    /**
     * @author Vikrant
     * @since 11-04-2023
     * @description to handle changes at input value onChange
     * @param event
     */
    const handleChange = (event) => {
        const {name, value} = event.target;
        setCustomerFormData({...customerFormData, [name]: value});
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    /**
     * @author Vikrant
     * @since 11-04-2023
     * @description to check form validations
     */
    const formValidation = (value) => {
        let newIsError = {...isError};
        newIsError.userId = customerFormData.userId ? '' : 'This field Required*';
        newIsError.remarks = customerFormData.remarks ? '' : 'This field Required*';

        setIsError(newIsError);

        if (newIsError.userId === '' && (newIsError.remarks === '')) {
            dispatch(updateRMCustomerRemarks(customerFormData, rmId, onSuccess));
        }

    }

    /**
     * @author Vikrant
     * @since 11-04-2023
     * @description after success the forms
     * @param isSuccess
     */
    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            setCustomerFormData(rmCustomerFormDataInitialState);
            onFormToggleHandle();
        }
    }


    useEffect(() => {
        if (dataForm) {
            const customerDetails = dataForm?.customer
            const rmId = dataForm?.rmId
            setRmId(rmId);
            setCustomerFormData({
                ...customerFormData,
                userId: customerDetails?.userId,
                remarks: customerDetails?.remarks,
            })
        }
    }, [dataForm]);

    /**
     * @author Vikrant
     * @since 11-04-2023
     * @description to handle update RM customer remarks
     * @param e
     */
    const handleUpdate = (e) => {
        e.preventDefault();
        formValidation('update');
    };


    return (
        <div className={updateRMStyles['update__rm-container']}>
            <div className={updateRMStyles['update__rm-header']}>
                <span>Update Customer Remarks</span>
            </div>
            <div className={updateRMStyles['update__rm-form-container']}>
                <div>
                    <div className={updateRMStyles["update__rm"]}>

                        <div className={updateRMStyles["update__rm-right-wrapper"]}>
                            <div className={updateRMStyles["update__rm-form"]}
                                 onSubmit={handleUpdate}>
                                <div style={{display:"flex"}}>
                                    <div className={updateRMStyles["update__rm-item-name"]}>Employee ID</div>
                                <input name={"userId"} type={"text"} placeholder={"Employee ID"}
                                       value={customerFormData.userId}
                                       onChange={dataForm?.customer ? "" : handleChange}
                                       disabled={!!dataForm?.customer}
                                       style={{opacity: !!dataForm?.customer ? 0.6 : 1}}
                                       className={updateRMStyles[isError.userId?.length > 0 ? "update__rm-name-input-outline" : "update__rm-name-input"]}/>
                            </div>
                                <div className={updateRMStyles["invalid__field_display"]}>
                                    <span className={updateRMStyles["empty"]}></span>
                                    {isError.userId && (
                                        <span className={updateRMStyles["invalid__field"]}>{isError.userId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={updateRMStyles["update__rm-item-name"]}>Remarks</div>
                                <input name={"remarks"} type={"text"} placeholder={"Remarks"}
                                       value={customerFormData.remarks}
                                       onChange={handleChange}
                                       className={updateRMStyles[isError.remarks?.length > 0 ? "update__rm-name-input-outline" : "update__rm-name-input"]}/>
                                </div>
                                <div className={updateRMStyles["invalid__field_display"]}>
                                    <span className={updateRMStyles["empty"]}></span>
                                    {isError.remarks && (
                                        <span className={updateRMStyles["invalid__field"]}>{isError.remarks}</span>
                                    )}
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className={updateRMStyles["update__rm-send-button-wrapper"]}>
                <AppRoundButton onClick={handleUpdate}
                                buttonText={"Update"}
                                buttonStyle={updateRMStyles["update__rm-send-button"]}
                                type={"primary"}
                />
            </div>
        </div>
    );
};

export default UpdateCustomerRemarks;
