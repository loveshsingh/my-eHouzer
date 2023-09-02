import * as React from 'react';
import {useEffect, useState} from 'react';
import propertyVariantStyles from '../propertyVariant/PropertyVariantForm.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addPropertyVariant, deletePropertyVariant, updatePropertyVariant} from "../../../../../../actions/adminActions";
import AppRoundButton from "../../../../../lib/AppRoundButton";
import ConfirmationDialog, {ConfirmationDialogAction} from "../../../../helpers/confirmationBox/ConfirmationDialog";
import AppChooser from "../../../../../lib/AppChooser/AppChooser";
import {regExpNo, regExpNumber, regExpOnlyNumeric} from "../../../../helpers/ValidationsRegEx";
import addRMStyles from "../../rm/addRM/AddRM.module.css";
import addPropertyStyles from "../addProperty/AddProperty.module.css";

/**
 * @author Yatin
 * @since 14-03-2023
 * @description form for add property variant
 * @return {JSX.Element}
 * @constructor
 */
const PropertyVariant = ({onFormToggleHandle}) => {
    const [selectedImages, setSelectedImages] = useState();
    const [imageFormData, setImageFormData] = useState();
    const apartments = [
        {id: 1, name: "1BHK"},
        {id: 2, name: "2BHK"},
        {id: 3, name: "3BHK"},
    ]
    const {adminLoading, dataForm} = useSelector(((state) => state.adminReducer));
    const dispatch = useDispatch();
    const [confirmationDialogState, setConfirmationDialogState] = useState({
        visible: false,
        action: undefined,
        data: undefined
    });
    const title = () => {
        return (<span style={{color: 'black'}}>Are you sure you want to delete?</span>);
    }

    document.body.style.overflow = 'hidden';

    const propertyVarientInitialState = {
        id: '',
        area: '',
        bathroomCount: '',
        bookingAmt: '',
        floorPlan: '',
        name: '',
        price: '',
        propertyId: '',
        type: ''
    }
    const [propertyVariantState, setPropertyVariantState] = useState(propertyVarientInitialState);
    const [isError, setIsError] = useState(propertyVarientInitialState);

    const handleValueChange = (evt) => {
        const {name, value} = evt.target;
        if (name === 'floorPlan') {
            const selectedFile = evt.target.files[0];
            if (selectedFile) {
                const image = URL?.createObjectURL(selectedFile);
                setPropertyVariantState({...propertyVariantState, [name]: selectedFile.name});
                setSelectedImages(image);
                setImageFormData(selectedFile);
            }
        } else if (name === 'area' || name === 'bathroomCount' || name === 'bookingAmt' || name === 'price') {
            const newValue = evt.target.value.replace(regExpNumber, '');
            setPropertyVariantState({...propertyVariantState, [name]: newValue});
        } else {
            setPropertyVariantState({...propertyVariantState, [name]: value});
        }
        if (value.trim() === '') {
            setIsError({...isError, [name]: "This field Required*"});
        } else {
            setIsError({...isError, [name]: ''});
        }

    }

    const imageChangeHandle = (evt) => {
        const selectedFile = evt.target.files[0];
        if (selectedFile) {
            const image = URL?.createObjectURL(selectedFile);
            setPropertyVariantState({...propertyVariantState, ['floorPlan']: value});
            setSelectedImages(image);
        }
    }

    useEffect(() => {
        if (dataForm) {
            const propertyVariantData = dataForm?.propertyVariant
            const popupPropertyIdVariant = dataForm?.popupPropertyIdVariant
            if (propertyVariantData) {
                setPropertyVariantState({
                    ...propertyVariantState,
                    id: propertyVariantData?.id,
                    area: String(propertyVariantData?.area),
                    bathroomCount: String(propertyVariantData?.bathroomCount),
                    bookingAmt: String(propertyVariantData?.bookingAmt),
                    floorPlan: propertyVariantData?.floorPlan,
                    name: propertyVariantData?.name,
                    price: String(propertyVariantData?.price),
                    propertyId: propertyVariantData?.propertyId,
                    type: propertyVariantData?.type,
                    media: propertyVariantData?.media?.url,
                })
                setSelectedImages(propertyVariantData?.media?.url);
            }
            if (popupPropertyIdVariant) {
                setPropertyVariantState({
                    ...propertyVariantState,
                    propertyId: popupPropertyIdVariant,
                })
            }
        }
    }, [dataForm]);


    /**
     * @author Vikrant
     * @since 29-03-2023
     * @description to check form validations
     */
    const formValidation = (value) => {
        let newIsError = {...isError};
        newIsError.id = propertyVariantState.id ? '' : 'This field Required*';

        newIsError.area = (propertyVariantState.area)?.trim() === ''
            ? "Area Can't be Empty"
            : regExpOnlyNumeric.test(propertyVariantState.area)
                ? '' : 'Enter a valid numeric digit';


        newIsError.bookingAmt = (propertyVariantState.bookingAmt)?.trim() === ''
            ? "Field Can't be Empty"
            : regExpOnlyNumeric.test(propertyVariantState.bookingAmt)
                ? '' : 'Enter a valid numeric digit';


        newIsError.bathroomCount = (propertyVariantState.bathroomCount)?.trim() === ''
            ? "Field Can't be Empty"
            : regExpOnlyNumeric.test(propertyVariantState.bathroomCount)
                ? '' : 'Enter a valid numeric digit';


        newIsError.price = (propertyVariantState.price)?.trim() === ''
            ? "Price Can't be Empty"
            : regExpOnlyNumeric.test(propertyVariantState.price)
                ? '' : 'Enter a valid numeric digit';

        // newIsError.area = propertyVariantState.area ? '' : 'This field Required*';
        // newIsError.bathroomCount = propertyVariantState.bathroomCount ? '' : 'This field Required*';
        // newIsError.bookingAmt = propertyVariantState.bookingAmt ? '' : 'This field Required*';
        newIsError.floorPlan = propertyVariantState.floorPlan ? '' : 'This field Required*';
        newIsError.name = propertyVariantState.name ? '' : 'This field Required*';
        // newIsError.price = propertyVariantState.price ? '' : 'This field Required*';
        newIsError.propertyId = propertyVariantState.propertyId ? '' : 'This field Required*';
        newIsError.type = propertyVariantState.type ? '' : 'This field Required*';
        setIsError(newIsError);

        if ((propertyVariantState.area)
            && (propertyVariantState.bathroomCount)
            && (propertyVariantState.bookingAmt)
            && (propertyVariantState.floorPlan)
            && (propertyVariantState.name)
            && (propertyVariantState.price)
            && (propertyVariantState.type)) {

            const formData = new FormData();
            formData.append('id', propertyVariantState.id);
            formData.append('area', propertyVariantState.area);
            formData.append('bathroomCount', propertyVariantState.bathroomCount);
            formData.append('bookingAmt', propertyVariantState.bookingAmt);
            formData.append('floorPlan', propertyVariantState.floorPlan);
            formData.append('name', propertyVariantState.name);
            formData.append('price', propertyVariantState.price);
            formData.append('propertyId', propertyVariantState.propertyId);
            formData.append('type', propertyVariantState.type);
            formData.append('file', imageFormData);

            if (value === 'add') {
                dispatch(addPropertyVariant(formData, onSuccess));
            } else if (value === 'update') {
                console.log("check update2")
                dispatch(updatePropertyVariant(formData, onSuccess));
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formValidation('add');
    };

    const onSuccess = (isSuccess) => {
        if (isSuccess) {
            setPropertyVariantState(propertyVarientInitialState);
            onFormToggleHandle();
        }
    }

    const handlePropertyVariantUpdate = (e) => {
        e.preventDefault();
        formValidation('update');
    };

    const onDeletePropertyVariant = (variantId, propertyId) => {
        setConfirmationDialogState({
            visible: true,
            action: ConfirmationDialogAction.DELETE_PROPERTY_VARIANT,
            data: {variantId, propertyId}
        });
    }

    const onSubmit = (e) => {
        if (!adminLoading) {
            if (dataForm?.propertyVariant) {
                console.log("check update")
               handlePropertyVariantUpdate(e)
            } else {
                console.log("check add")
                handleSubmit(e)
            }
            /*(dataForm?.propertyVariant) ? handlePropertyVariantUpdate : handleSubmit*/
        }
    }

    return (
        <div className={propertyVariantStyles['property__variant-container']}>
            <div className={propertyVariantStyles['property__variant-header']}>
                <span>{dataForm?.propertyVariant ? "Update" : "Add"} Property Variant</span>
            </div>
            <div className={propertyVariantStyles['property__variant-form-container']}>
                <div className={propertyVariantStyles["property__variant"]}>

                    <div className={propertyVariantStyles["property__variant-right-wrapper"]}>

                        <div className={propertyVariantStyles["property__variant-form"]}>
                            <div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyVariantStyles["property__variant-item-name"]}>Name</div>
                                <input name="name" type="text" placeholder="Name"
                                       value={propertyVariantState.name}
                                       onChange={handleValueChange}
                                       className={propertyVariantStyles[isError.name.length > 0 ? "property__variant-name-input-outline" : "property__variant-name-input"]}/>
                                </div>
                                <div className={propertyVariantStyles["invalid__field_display"]}>
                                    <span className={propertyVariantStyles["empty"]}></span>
                                    {isError.name && (
                                        <span className={propertyVariantStyles["invalid__field"]}>{isError.name}</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyVariantStyles["property__variant-item-name"]}>Area</div>
                                <input name="area" type="text" placeholder="Area (sq. ft.)"
                                       value={propertyVariantState.area}
                                       onChange={handleValueChange}
                                       className={propertyVariantStyles[isError.area?.length > 0 ? "property__variant-name-input-outline" : "property__variant-name-input"]}/>
                                </div>
                                <div className={propertyVariantStyles["invalid__field_display"]}>
                                    <span className={propertyVariantStyles["empty"]}></span>
                                    {isError.area && (
                                        <span className={propertyVariantStyles["invalid__field"]}>{isError.area}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyVariantStyles["property__variant-item-name"]}>Bathroom Count</div>
                                <input name="bathroomCount" type="text" placeholder="Bathroom Count"
                                       value={propertyVariantState.bathroomCount}
                                       onChange={handleValueChange}
                                       className={propertyVariantStyles[isError.bathroomCount?.length > 0 ? "property__variant-name-input-outline" : "property__variant-name-input"]}/>
                                </div>
                                <div className={propertyVariantStyles["invalid__field_display"]}>
                                    <span className={propertyVariantStyles["empty"]}></span>
                                    {isError.bathroomCount && (
                                        <span
                                            className={propertyVariantStyles["invalid__field"]}>{isError.bathroomCount}</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyVariantStyles["property__variant-item-name"]}>Price</div>
                                <input name="price" type="text" placeholder="Price"
                                       onChange={handleValueChange}
                                       value={propertyVariantState.price}
                                       className={propertyVariantStyles[isError.price?.length > 0 ? "property__variant-name-input-outline" : "property__variant-name-input"]}/>
                                </div>
                                <div className={propertyVariantStyles["invalid__field_display"]}>
                                    <span className={propertyVariantStyles["empty"]}></span>
                                    {isError.price && (
                                        <span className={propertyVariantStyles["invalid__field"]}>{isError.price}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyVariantStyles["property__variant-item-name"]}>Booking Amount</div>
                                <input name="bookingAmt" type="text" placeholder="Booking Amount"
                                       onChange={handleValueChange}
                                       value={propertyVariantState.bookingAmt}
                                       className={propertyVariantStyles[isError.bookingAmt?.length > 0 ? "property__variant-name-input-outline" : "property__variant-name-input"]}/>
                                </div>
                                <div className={propertyVariantStyles["invalid__field_display"]}>
                                    <span className={propertyVariantStyles["empty"]}></span>
                                    {isError.bookingAmt && (
                                        <span
                                            className={propertyVariantStyles["invalid__field"]}>{isError.bookingAmt}</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                {/* <input name="floorPlan" type="file" placeholder="select file"
                                    // onChange={(event) => imageChangeHandle(event)}
                                       onChange={handleValueChange}
                                       className={propertyVariantStyles[isError.floorPlan?.length > 0 ? "property__variant-name-input-outline" : "property__variant-name-input"]}/>
                               */}
                                <div style={{display:"flex"}}>
                                    <div className={propertyVariantStyles["property__variant-item-name"]}>Image</div>
                                <AppChooser onChange={handleValueChange} type={'image'} label={'Choose Image'}
                                            keyId={'floorPlan'}
                                            multiple={''}
                                            labelClassName={propertyVariantStyles[isError.floorPlan?.length > 0 ? "property__variant-name-input-outline" : "property__variant-name-input"]}
                                            description={selectedImages ? ` 1 file` : ' No file chosen'}
                                />
                                </div>
                                <div>
                                    {selectedImages ? (
                                            <div className={propertyVariantStyles["property__variant-form-image-wrapper"]}>
                                                <span className={propertyVariantStyles["empty"]}></span>
                                                <img className={propertyVariantStyles["property__variant-image"]}
                                                     src={selectedImages} alt="image"/>
                                            </div>)
                                        :
                                        (<div className={propertyVariantStyles["invalid__field_display"]}>
                                            <span className={propertyVariantStyles["empty"]}></span>
                                            {isError.floorPlan && (
                                                <span
                                                    className={propertyVariantStyles["invalid__field"]}>{isError.floorPlan}</span>
                                            )}
                                        </div>)
                                    }
                                </div>

                                {/*<div className={propertyVariantStyles["invalid__field_display"]}>
                                    {isError.floorPlan && (
                                        <span
                                            className={propertyVariantStyles["invalid__field"]}>{isError.floorPlan}</span>
                                    )}
                                </div>*/}
                            </div>
                            {/* <div>
                                <input name="floorPlan" type="text" placeholder="FloorPlan"
                                       onChange={handleValueChange}
                                       value={propertyVariantState.floorPlan}
                                       className={propertyVariantStyles[isError.floorPlan?.length > 0 ? "property__variant-name-input-outline" : "property__variant-name-input"]}/>
                                <div className={propertyVariantStyles["invalid__field_display"]}>
                                    {isError.floorPlan && (
                                        <span
                                            className={propertyVariantStyles["invalid__field"]}>{isError.floorPlan}</span>
                                    )}
                                </div>
                            </div>*/}
                            <div>
                                <div style={{display:"flex"}}>
                                    <div className={propertyVariantStyles["property__variant-item-name"]}>Type</div>
                                <select className={propertyVariantStyles["property__variant-selector"]}
                                        placeholder="Type"
                                        name="type"
                                        onChange={handleValueChange}
                                >
                                    <option value={""} selected disabled hidden>{
                                        dataForm.propertyVariant ? propertyVariantState.type :
                                            "Select Type"}</option>
                                    {apartments?.map((apartment) => (
                                        <option key={apartment.id} value={apartment.name}>
                                            {apartment.name}
                                        </option>
                                    ))}
                                </select>
                                </div>
                                <div className={propertyVariantStyles["invalid__field_display"]}>
                                    <span className={propertyVariantStyles["empty"]}></span>
                                    {isError.type && (
                                        <span className={propertyVariantStyles["invalid__field"]}>{isError.type}</span>
                                    )}
                                </div>
                            </div>

                            {/*<div className={propertyVariantStyles["property__variant-send-button-wrapper"]}>*/}
                            {/*    <AppRoundButton*/}
                            {/*        onClick={onSubmit}*/}
                            {/*        buttonText={dataForm?.propertyVariant ? "Update" : "Add"}*/}
                            {/*        buttonStyle={propertyVariantStyles["property__variant-send-button"]}*/}
                            {/*        type={"primary"}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            {/*{dataForm?.propertyVariant &&*/}
                            {/*    <div className={propertyVariantStyles["property__variant-send-button-wrapper"]}>*/}
                            {/*        <AppRoundButton*/}
                            {/*            onClick={() => onDeletePropertyVariant(propertyVariantState.id, propertyVariantState.propertyId)}*/}
                            {/*            buttonText={"delete"}*/}
                            {/*            buttonStyle={propertyVariantStyles["property__variant-send-button"]}*/}
                            {/*            type={"primary"}*/}
                            {/*        />*/}
                            {/*    </div>}*/}
                        </div>
                    </div>
                    <div style={{display: confirmationDialogState.visible ? '' : 'none'}}>

                        <ConfirmationDialog type='delete' title={title} state={confirmationDialogState}
                                            onClick={({visible, action, data}) => {
                                                if (action === ConfirmationDialogAction.DELETE_PROPERTY_VARIANT && visible) {
                                                    const {variantId, propertyId} = data;
                                                    dispatch(deletePropertyVariant(variantId, propertyId, onSuccess))
                                                }
                                                setConfirmationDialogState({visible: false, action: undefined});
                                            }}/>
                    </div>
                </div>
            </div>
            <div className={propertyVariantStyles["property__variant-send-button-wrapper"]}>
                <AppRoundButton
                    onClick={onSubmit}
                    buttonText={dataForm?.propertyVariant ? "Update" : "Add"}
                    buttonStyle={propertyVariantStyles["property__variant-send-button"]}
                    type={"primary"}
                />


            {dataForm?.propertyVariant &&
                // <div className={propertyVariantStyles["property__variant-send-button-wrapper"]}>
                    <AppRoundButton
                        onClick={() => onDeletePropertyVariant(propertyVariantState.id, propertyVariantState.propertyId)}
                        buttonText={"Delete"}
                        buttonStyle={propertyVariantStyles["property__variant-send-button"]}
                        type={"primary"}
                    />
                // </div>
            }
            </div>
        </div>
    );
};

export default PropertyVariant;
