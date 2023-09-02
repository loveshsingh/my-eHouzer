import * as React from 'react';
import {useEffect, useState} from 'react';
import addBuilderStyles from './AddBuilder.module.css'
import AppCountryCodeSelector from "../../../../../lib/AppCountryCodeSelector/AppCountryCodeSelector";
import AppRoundButton from "../../../../../lib/AppRoundButton";
import {useDispatch, useSelector} from "react-redux";
import {addBuilder, deleteDeveloper, updateBuilder} from "../../../../../../actions/adminActions";
import ConfirmationDialog, {ConfirmationDialogAction} from "../../../../helpers/confirmationBox/ConfirmationDialog";
import {regExpEmail, regExpName, regExpNo, regExpNumber, regExpOnlyNumeric} from "../../../../helpers/ValidationsRegEx";
import AppChooser from "../../../../../lib/AppChooser/AppChooser";
import {Multiselect} from "multiselect-react-dropdown";
import AppIcon from "../../../../../lib/AppIcon/AppIcon";
import {AppColors} from "../../../../../../public/AppColors";
import propertyVariantStyles from "../../property/propertyVariant/PropertyVariantForm.module.css";
import addRMStyles from "../../rm/addRM/AddRM.module.css";

const AddBuilder = ({onFormToggleHandle}) => {

    const [selectedImages, setSelectedImages] = useState();
    const [imageFormData, setImageFormData] = useState();
    const dispatch = useDispatch();
    const {dataForm, operatingCities} = useSelector((state) => state.adminReducer);
    const citiesArr = operatingCities.map((option) => ({id: option.cityId, value: option.name}));
    const [selectedCitiesArr, setSelectedCitiesArr] = useState([]);

    const [confirmationDialogState, setConfirmationDialogState] = useState({
        visible: false,
        action: undefined,
        data: undefined
    });
    const title = () => {
        return (<span style={{color: 'black'}}>Are you sure you want to delete?</span>);
    }
    const builderFormInitialData = {
        userId: '',
        developerName: '',
        developerGroup: '',
        developerDesc: '',
        developerIcon: '',
        firstName: '',
        lastName: '',
        emailId: '',
        contactNo: '',
        address: '',
        pincode: '',
        operatingCities: [],
        city: '',
        state: '',
        role: 'UR_000006',
    }

    const [builderFormData, setBuilderFormData] = useState(builderFormInitialData);

    const [isError, setIsError] = useState(builderFormInitialData);

    useEffect(() => {
        if (dataForm) {
            const developer = dataForm?.developer
            const profile = dataForm?.profile
            setBuilderFormData({
                ...builderFormData,
                userId: developer?.developerId,
                developerName: developer?.developerName,
                developerGroup: developer?.developerGroup,
                developerDesc: developer?.description,
                developerIcon: developer?.iconUrl,
                operatingCities: developer?.operatingCities,
                firstName: profile?.firstName,
                lastName: profile?.lastName,
                emailId: profile?.emailId,
                contactNo: profile?.contactNo,
                address: profile?.address,
                pincode: profile?.pincode,
                city: profile?.city,
                state: profile?.state,
                role: 'UR_000006',
                media: developer?.media.url,
            })
            const idsToFilter = developer?.operatingCities;
            if (idsToFilter?.length > 0) {
                const filteredCities = citiesArr.filter((city) => idsToFilter?.includes(city.id));
                setSelectedCitiesArr(filteredCities);
            }

            setSelectedImages(developer?.media.url);
        }
    }, [dataForm]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'developerIcon') {

            const selectedFile = event.target.files[0];
            if (selectedFile) {
                const image = URL?.createObjectURL(selectedFile);
                setBuilderFormData({...builderFormData, [name]: selectedFile.name});
                setSelectedImages(image);
                setImageFormData(selectedFile);
            }
        } else if (name === 'contactNo' || name === 'pincode') {
            const newValue = event.target.value.replace(regExpNumber, '');
            if (name === 'pincode' && newValue.length > 6) {
                setBuilderFormData({...builderFormData, [name]: newValue.slice(0, 6)});
            } else if (name === 'contactNo' && newValue.length > 10) {
                setBuilderFormData({...builderFormData, [name]: newValue.slice(0, 10)});
            } else {
                setBuilderFormData({...builderFormData, [name]: newValue});
            }
        } else if (name === 'firstName' || name === 'lastName') {
            const newValue = event.target.value.replace(regExpName, '');
            setBuilderFormData({...builderFormData, [name]: newValue});
        }  else {
            setBuilderFormData({...builderFormData, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }
    };

    /**
     * @author Vikrant
     * @since 14-04-2023
     * @description set data at selection change
     * @param event
     */
    const handleSelectionChange = (event) => {
        const selectedOptions = event.map(item => item.id);
        setBuilderFormData({...builderFormData, ['operatingCities']: selectedOptions});
        if (selectedOptions.length < 1) {
            setIsError({...isError, ['operatingCities']: "Minimum 1 Operating City Required*"});
        } else {
            setIsError({...isError, ['operatingCities']: ''});
        }
    }

    /**
     * @author Vikrant
     * @since 28-03-2023
     * @description to check form validations
     */
    const formValidation = (value) => {
        let newIsError = {...isError};
        newIsError.userId = builderFormData.userId ? '' : 'This field Required*';
        newIsError.developerName = builderFormData.developerName ? '' : 'This field Required*';
        newIsError.developerGroup = builderFormData.developerGroup ? '' : 'This field Required*';
        newIsError.developerDesc = builderFormData.developerDesc ? '' : 'This field Required*';
        newIsError.developerIcon = builderFormData.developerIcon ? '' : 'This field Required*';
        newIsError.firstName = builderFormData.firstName ? '' : 'This field Required*';
        newIsError.lastName = builderFormData.lastName ? '' : 'This field Required*';
        // newIsError.emailId = builderFormData.emailId ? '' : 'This field Required*';
        newIsError.emailId = (builderFormData.emailId)?.trim() === ''
            ? "Email Can't be Empty"
            : regExpEmail.test(builderFormData.emailId)
                ? ''
                : 'Email address is invalid';


        newIsError.contactNo = (builderFormData.contactNo)?.trim() === ''
            ? "Contact Can't be Empty"
            : regExpNo.test(builderFormData.contactNo)
                ? '' : 'Enter a valid 10 digit Number';

        newIsError.address = builderFormData.address ? '' : 'This field Required*';
        newIsError.pincode = (builderFormData.pincode)?.trim() === ''
            ? "PinCode Can't be Empty"
            : regExpOnlyNumeric.test(builderFormData.pincode)
                ? '' : 'Enter a valid Number';

        newIsError.city = builderFormData.city ? '' : 'This field Required*';
        newIsError.state = builderFormData.state ? '' : 'This field Required*';
        newIsError.operatingCities = builderFormData?.operatingCities?.length > 0 ? [''] : ['Minimum 1 Operating City Required*'];
        setIsError(newIsError);

        console.log("newwwwww", newIsError)

        if (newIsError.userId === ''
            && (newIsError.developerName === '')
            && (newIsError.developerGroup === '')
            && (newIsError.developerDesc === '')
            && (newIsError.developerIcon === '')
            && (newIsError.firstName === '')
            && (newIsError.lastName === '')
            && (newIsError.emailId === '')
            && (newIsError.contactNo === '')
            && (newIsError.address === '')
            && (newIsError.pincode === '')
            && (newIsError.city === '')
            && (newIsError.state === '') && (newIsError.operatingCities[0] === '')) {

            const formData = new FormData();
            formData.append('userId', builderFormData?.userId);
            formData.append('developerName', builderFormData?.developerName);
            formData.append('developerGroup', builderFormData?.developerGroup);
            formData.append('developerDesc', builderFormData?.developerDesc);
            formData.append('developerIcon', builderFormData?.developerIcon);
            formData.append('firstName', builderFormData?.firstName);
            formData.append('lastName', builderFormData?.lastName);
            formData.append('emailId', builderFormData?.emailId);
            formData.append('contactNo', builderFormData?.contactNo);
            formData.append('address', builderFormData?.address);
            formData.append('pincode', builderFormData?.pincode);
            formData.append('city', builderFormData?.city);
            formData.append('state', builderFormData?.state);
            formData.append('role', builderFormData?.role);
            formData.append('operatingCities', builderFormData?.operatingCities);

            formData.append('file', imageFormData);

            if (value === 'add') {
                dispatch(addBuilder(formData, onSuccess));
            } else {
                dispatch(updateBuilder(formData, onSuccess));
            }
        }

    }


    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            setBuilderFormData(builderFormInitialData);
            onFormToggleHandle();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation('add');
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        formValidation('update');
    };

    const onDeleteDeveloper = (developerId) => {
        setConfirmationDialogState({
            visible: true,
            action: ConfirmationDialogAction.DELETE_DEVELOPER,
            data: {developerId}
        });
    }

    return (
        <div className={addBuilderStyles['add__builder-container']}>
            <div className={addBuilderStyles['add__builder-header']}>
                <span>{dataForm?.developer ? "Update" : "Add"} Builder</span>
            </div>
            <div className={addBuilderStyles['add__builder-form-container']}>
                <div>
                    <div className={addBuilderStyles["add__builder"]}>

                        <div className={addBuilderStyles["add__builder-right-wrapper"]}>

                            <div className={addBuilderStyles["add__builder-form"]}>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>User Name</div>
                                <input name={"userId"} type={"text"} placeholder={"User Name"}
                                       value={builderFormData.userId}
                                       onChange={dataForm?.developer ? "" : handleChange}
                                       disabled={!!dataForm?.developer}
                                       style={{opacity: !!dataForm?.developer ? 0.6 : 1}}
                                       className={addBuilderStyles[isError.userId.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.userId.length > 0 && (
                                        <span
                                            className={addBuilderStyles["invalid__field"]}>{isError.userId}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Name</div>
                                <input name={"developerName"} type={"text"} placeholder={"Name"}
                                       onChange={handleChange}
                                       value={builderFormData.developerName}
                                       className={addBuilderStyles[isError.developerName.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.developerName.length > 0 && (
                                        <span
                                            className={addBuilderStyles["invalid__field"]}>{isError.developerName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Group</div>
                                <input name={"developerGroup"} type={"text"} placeholder={"Group"}
                                       onChange={handleChange}
                                       value={builderFormData.developerGroup}
                                       className={addBuilderStyles[isError.developerGroup.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.developerGroup.length > 0 && (
                                        <span
                                            className={addBuilderStyles["invalid__field"]}>{isError.developerGroup}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Description</div>
                                <textarea name={"developerDesc"} placeholder={"Description"}
                                          onChange={handleChange}
                                          value={builderFormData.developerDesc}
                                          className={addBuilderStyles[isError.developerDesc.length > 0 ? "add__builder-textarea-input-outline" : "add__builder-textarea-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.developerDesc.length > 0 && (
                                        <span
                                            className={addBuilderStyles["invalid__field"]}>{isError.developerDesc}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Image</div>
                                {/*<div>*/}
                                    <AppChooser onChange={handleChange} type={'image'} label={'Choose Icon'}
                                                keyId={'developerIcon'}
                                                multiple={''}
                                                labelClassName={addBuilderStyles[isError.developerIcon.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}
                                                description={selectedImages ? ` 1 file` : ' No file chosen'}
                                    />
                                </div>

                                    <div>
                                        {selectedImages ? (
                                            <div className={addBuilderStyles["add__builder-form-image"]}>
                                                <span className={addBuilderStyles["empty"]}></span>
                                                <img className={addBuilderStyles["add__builder-image"]}
                                                     src={selectedImages} alt="image"/>
                                            </div>) : (
                                            <div className={propertyVariantStyles["invalid__field_display"]}>
                                                <span className={addBuilderStyles["empty"]}></span>
                                                {isError.developerIcon && (
                                                    <span
                                                        className={propertyVariantStyles["invalid__field"]}>{isError.developerIcon}</span>
                                                )}
                                            </div>
                                        )
                                        }
                                    </div>
                                {/*</div>*/}

                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>First Name</div>
                                <input name={"firstName"} type={"text"} placeholder={"First Name"}
                                       onChange={handleChange}
                                       value={builderFormData.firstName}
                                       className={addBuilderStyles[isError.firstName.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.firstName.length > 0 && (
                                        <span className={addBuilderStyles["invalid__field"]}>{isError.firstName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Last Name</div>
                                <input name={"lastName"} type={"text"} placeholder={"Last Name"}
                                       onChange={handleChange}
                                       value={builderFormData.lastName}
                                       className={addBuilderStyles[isError.lastName.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.lastName.length > 0 && (
                                        <span className={addBuilderStyles["invalid__field"]}>{isError.lastName}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Email</div>
                                <input name={"emailId"} type={"text"} placeholder={"Email"}
                                       onChange={dataForm?.developer ? "" : handleChange}
                                       disabled={!!dataForm?.developer}
                                       style={{opacity: !!dataForm?.developer ? 0.6 : 1}}
                                       value={builderFormData.emailId}
                                       className={addBuilderStyles[isError.emailId.length > 0 ? "add__builder-email-input-outline" : "add__builder-email-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.emailId.length > 0 && (
                                        <span className={addBuilderStyles["invalid__field"]}>{isError.emailId}</span>
                                    )}
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addBuilderStyles["add__builder-item-name"]}>Operating Cities</div>
                                        <div style={{width:"60%"}}>
                                    <Multiselect
                                        displayValue="value"
                                        onSelect={handleSelectionChange}
                                        onRemove={handleSelectionChange}
                                        showCheckbox={true}
                                        options={citiesArr}
                                        selectedValues={selectedCitiesArr}

                                        placeholder="Choose Operating Cities"
                                        style={{

                                            chips: {
                                                background: '#670A0E',
                                                // background: 'rgba(244,245,247)',
                                                // border: '1px solid #B0474C',
                                                // color:'gray',
                                            },
                                            multiselectContainer: {
                                                // color: '#BE6E73',
                                                // background: '#F8D1D3',
                                                background: 'rgba(244,245,247)',
                                            },
                                            searchBox: {
                                                // 'border': '1px solid #B0474C',
                                                'border': '1px solid rgba(229,231,235)',
                                                padding: '1rem',
                                                color: 'red',
                                            },
                                            control: {
                                                '::placeholder': {
                                                    color: 'blue',
                                                    fontStyle: 'italic'
                                                }
                                            },
                                            highlightOption: {
                                                // Disable default highlighting
                                                background: 'none',
                                                color: 'inherit',
                                            },

                                        }}

                                    />
                                        </div>
                                    </div>
                                    <div className={addBuilderStyles["invalid__field_display"]}>
                                        <span className={addBuilderStyles["empty"]}></span>
                                        {isError.operatingCities[0]?.length > 0 && (
                                            <span
                                                className={addBuilderStyles["invalid__field"]}>{isError.operatingCities[0]}</span>
                                        )}
                                    </div>

                                </div>

                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Address</div>
                                <input name={"address"} type={"text"} placeholder={"Address"}
                                       onChange={handleChange}
                                       value={builderFormData.address}
                                       className={addBuilderStyles[isError.address.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.address.length > 0 && (
                                        <span className={addBuilderStyles["invalid__field"]}>{isError.address}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>City</div>
                                <input name={"city"} type={"text"} placeholder={"City"}
                                       onChange={handleChange}
                                       value={builderFormData.city}
                                       className={addBuilderStyles[isError.city.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.city.length > 0 && (
                                        <span className={addBuilderStyles["invalid__field"]}>{isError.city}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>State</div>
                                <input name={"state"} type={"text"} placeholder={"State"}
                                       onChange={handleChange}
                                       value={builderFormData.state}
                                       className={addBuilderStyles[isError.state.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.state.length > 0 && (
                                        <span className={addBuilderStyles["invalid__field"]}>{isError.state}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Pincode</div>
                                <input name={"pincode"} type={"text"} placeholder={"Pincode"}
                                       onChange={handleChange}
                                       value={builderFormData.pincode}
                                       className={addBuilderStyles[isError.pincode.length > 0 ? "add__builder-name-input-outline" : "add__builder-name-input"]}/>
                                </div>
                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.pincode.length > 0 && (
                                        <span className={addBuilderStyles["invalid__field"]}>{isError.pincode}</span>
                                    )}
                                </div>
                                <div style={{display:"flex"}}>
                                    <div className={addBuilderStyles["add__builder-item-name"]}>Phone No.</div>
                                <div className={addBuilderStyles["add__builder-phone-input-wrapper"]}>
                                    <div className={addBuilderStyles["add__builder-country-selector"]}>
                                        {/*      <AppCountryCodeSelector textStyle={{
                                            fontSize: '0.9rem',
                                            marginLeft: '0.3rem'
                                        }}/>*/}

                                        <AppIcon name={'twemoji:flag-india'}
                                                 color={AppColors.roseGold} size={28}/>
                                        <span role="img" style={{
                                            fontSize: '0.9rem',
                                            marginLeft: '0.3rem'
                                        }} aria-label="Indian Flag">+91 </span>
                                    </div>
                                    <input name={"contactNo"} type={"text"} placeholder={"Phone No."}
                                           onChange={dataForm?.developer ? "" : handleChange}
                                           disabled={!!dataForm?.developer}
                                           style={{opacity: !!dataForm?.developer ? 0.6 : 1}}
                                           value={builderFormData.contactNo}
                                           className={addBuilderStyles[isError.contactNo.length > 0 ? "add__builder-phone-input-outline" : "add__builder-phone-input"]}/>
                                </div>
                                </div>

                                <div className={addBuilderStyles["invalid__field_display"]}>
                                    <span className={addBuilderStyles["empty"]}></span>
                                    {isError.contactNo.length > 0 && (
                                        <span className={addBuilderStyles["invalid__field"]}>{isError.contactNo}</span>
                                    )}
                                </div>

                                {/*<div className={addBuilderStyles["add__builder-send-button-wrapper"]}>*/}
                                {/*    <AppRoundButton onClick={dataForm?.developer ? handleUpdate : handleSubmit}*/}
                                {/*                    buttonText={dataForm?.developer ? "Update" : "Add"}*/}
                                {/*                    buttonStyle={addBuilderStyles["add__builder-send-button"]}*/}
                                {/*                    type={"primary"}/>*/}
                                {/*</div>*/}
                                {/*{dataForm?.developer &&*/}
                                {/*    <div className={addBuilderStyles["add__builder-send-button-wrapper"]}>*/}
                                {/*        <AppRoundButton*/}
                                {/*            onClick={() => onDeleteDeveloper(builderFormData.userId)}*/}
                                {/*            buttonText={"Delete"}*/}
                                {/*            buttonStyle={addBuilderStyles["add__builder-send-button"]}*/}
                                {/*            type={"primary"}/>*/}
                                {/*    </div>}*/}
                            </div>
                        </div>
                        <div style={{display: confirmationDialogState.visible ? '' : 'none'}}>
                            <ConfirmationDialog type='delete' title={title} state={confirmationDialogState}
                                                onClick={({visible, action, data}) => {
                                                    if (action === ConfirmationDialogAction.DELETE_DEVELOPER && visible) {
                                                        const {developerId} = data;
                                                        dispatch(deleteDeveloper(developerId, onSuccess))
                                                    }
                                                    setConfirmationDialogState({visible: false, action: undefined});
                                                }}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={addBuilderStyles["add__builder-send-button-wrapper"]}>
                <AppRoundButton onClick={dataForm?.developer ? handleUpdate : handleSubmit}
                                buttonText={dataForm?.developer ? "Update" : "Add"}
                                buttonStyle={addBuilderStyles["add__builder-send-button"]}
                                type={"primary"}/>
            {/*</div>*/}
            {dataForm?.developer &&
                // <div className={addBuilderStyles["add__builder-send-button-wrapper"]}>
                    <AppRoundButton
                        onClick={() => onDeleteDeveloper(builderFormData.userId)}
                        buttonText={"Delete"}
                        buttonStyle={addBuilderStyles["add__builder-send-button"]}
                        type={"primary"}/>
                // </div>
            }
            </div>
        </div>
    );
};

export default AddBuilder;
