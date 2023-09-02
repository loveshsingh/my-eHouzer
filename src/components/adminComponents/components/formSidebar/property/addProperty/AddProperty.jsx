import * as React from 'react';
import {useEffect, useState} from 'react';
import addPropertyStyles from './AddProperty.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    addProperty,
    deleteProperty,
    fetchAdminPropertyAmenities,
    getDevelopers,
    updateProperty
} from "../../../../../../actions/adminActions";
import AppRoundButton from "../../../../../lib/AppRoundButton";
import ConfirmationDialog, {ConfirmationDialogAction} from "../../../../helpers/confirmationBox/ConfirmationDialog";
import {Multiselect} from "multiselect-react-dropdown";
import AppImageCarousel from "../../../../../lib/AppImageCarousel/AppImageCarousel";
import AppChooser from "../../../../../lib/AppChooser/AppChooser";
import {fetchAreas, fetchCities, fetchStates} from "../../../../../../helper/Utility";
import AdminMap from "../../../../../lib/AppMap/AdminMap";
import propertyVariantStyles from "../propertyVariant/PropertyVariantForm.module.css";
import {regExpNumber} from "../../../../helpers/ValidationsRegEx";
import addBuilderStyles from "../../builder/addBuilder/AddBuilder.module.css";

/**
 * @author Vikrant
 * @since 07-03-2023
 * @description form for add property
 * @return {JSX.Element}
 * @constructor
 */
const AddProperty = ({onFormToggleHandle}) => {
        const TAG = "AddProperty"
        const [deleted, setDeleted] = useState([]);
        const [selectedImages, setSelectedImages] = useState();
        const [imageFormData, setImageFormData] = useState();
        const [selectedImageFiles, setSelectedImageFiles] = useState([]);
        const [countryState, setCountryState] = useState([])
        const [countryCity, setCountryCity] = useState([])
        const [countryArea, setCountryArea] = useState([])


        const {
            developers,
            propertyAmenities,
            dataForm,
            amenities
        } = useSelector(((state) => state.adminReducer));
        const amenitiesArr = amenities.map((option) => ({id: option.id, value: option.name}));
        const selectedAmenityArr = propertyAmenities.map((option) => ({id: option.id, value: option.name}));

        const dispatch = useDispatch();
        const [confirmationDialogState, setConfirmationDialogState] = useState({
            visible: false,
            action: undefined,
            data: undefined
        });


        const title = () => {
            return (<span style={{color: 'black'}}>Are you sure you want to delete?</span>);

        }
        const type = [
            {id: 1, name: 'Residential'},
            {id: 2, name: 'Office Space'}
        ];
        const propertyStatus = [
            {id: 1, name: 'Ready to move'},
            {id: 2, name: 'Under Construction'},
            {id: 3, name: 'Pre Launch'},
            {id: 4, name: 'Under construction'},
        ]

        useEffect(() => {
            dispatch(getDevelopers())
        }, [])

        document.body.style.overflow = 'hidden';

        const propertyStateInitial = {
            name: '',
            developerId: '',
            area: '',
            state: '',
            city: '',
            address: '',
            avgPriceSqFt: '',
            highlights: [],
            iconUrl: '',
            propertyImages: '',
            assured: false,
            exclusive: false,
            top: false,
            verified: false,
            featured: false,
            fastSelling: false,
            minBudget: '',
            maxBudget: '',
            minReraCarpetArea: '',
            maxReraCarpetArea: '',
            reraId: [],
            amenities: [],
            status: '',
            type: '',
            possessionDate: '',
            launchDate: '',
            longitude: '',
            latitude: '',
            description: '',
            videoUrl: '',
            locationTitle: '',
        }

        const [propertyState, setPropertyState] = useState(propertyStateInitial)
        const [isError, setIsError] = useState(propertyStateInitial)
        const handleValueChange = async (evt) => {
            const {name, value} = evt.target;
            if (name === 'state') {
                const stateId = evt.target.options[evt.target.selectedIndex].dataset.stateid;
                setPropertyState({...propertyState, [name]: value, city: '', area: ''});
                setCountryArea([]);
                try {
                    const citiesList = await fetchCities(stateId);
                    setCountryCity(citiesList)
                } catch (error) {
                }
            } else if (name === 'city') {
                const cityId = evt.target.options[evt.target.selectedIndex].dataset.cityid;
                setPropertyState({...propertyState, [name]: value, area: ''});
                try {
                    const areasList = await fetchAreas(cityId);
                    setCountryArea(areasList)
                } catch (error) {
                }
            } else if (name === 'avgPriceSqFt' || name === 'minBudget' || name === 'maxBudget' || name === 'minReraCarpetArea' || name === 'maxReraCarpetArea') {
                const newValue = evt.target.value.replace(regExpNumber, '');
                    setPropertyState({...propertyState, [name]: newValue});
            } else if (name === 'iconUrl') {
                const selectedFile = evt.target.files[0];
                if (selectedFile) {
                    const image = URL?.createObjectURL(selectedFile);
                    setPropertyState({...propertyState, [name]: selectedFile.name});
                    setSelectedImages(image);
                    setImageFormData(selectedFile);
                }
            } else if (name === 'propertyImages') {
                const selectedPropImages = evt.target.files;
                const updatedImageFiles = [...selectedImageFiles, ...Object.values(selectedPropImages)];
                setSelectedImageFiles(updatedImageFiles);

                // To display only
                /*const updatedToDisplayFiles = [...imagesFormData, ...Object.values(selectedPropImages)];
                setImagesFormData(updatedToDisplayFiles);*/

            } else {
                setPropertyState({...propertyState, [name]: value});
            }
            if (value.trim() === '') {
                setIsError({...isError, [name]: "This field Required*"});
            } else {
                setIsError({...isError, [name]: ''});
            }
        }

        /**
         * @author Vikrant
         * @since 09-03-2023
         * @description to change radio btn value in true and false
         * @param evt
         */
        const handleRadioChange = (evt) => {
            const value = evt.target.value;
            if (value === "true") {
                setPropertyState({
                    ...propertyState,
                    [evt.target.name]: true
                });
            } else {
                setPropertyState({
                    ...propertyState,
                    [evt.target.name]: false
                });
            }

        };

        /**
         * @author Vikrant
         * @since 10-03-2023
         * @description to split the string after comma for making set of string
         * @param evt
         */
        const handleInputChange = (evt) => {
            const {name, value} = evt.target;
            const updatedSet = new Set(value.split(','));
            setPropertyState({...propertyState, [name]: Array.from(updatedSet)});

            if (value.trim() === '') {
                setIsError({...isError, [name]:"This field Required*"});
            } else {
                setIsError({...isError, [name]: ''});
            }
            //setStringSet(updatedSet);
        };

        /**
         * @author Vikrant
         * @since 28-03-2023
         * @description to check form validations
         */
        const formValidation = (value) => {
            let newIsError = {...isError};
            let isValid = true;
            if (!propertyState.name) {
                newIsError.name = "This field Required*"
                isValid = false;
            }

            console.log("errrrrrrrr",isError)

            if (!propertyState.developerId) {
                newIsError.developerId = "This field Required*"
                isValid = false;
            }
            if (!propertyState.area) {
                newIsError.area = "This field Required*"
                isValid = false;
            }
            if (!propertyState.address) {
                newIsError.address = "This field Required*"
                isValid = false;
            }
            if (!propertyState.city) {
                newIsError.city = "This field Required*"
                isValid = false;
            }
            if (!propertyState.avgPriceSqFt) {
                newIsError.avgPriceSqFt = "This field Required*"
                isValid = false;
            }
            if (!propertyState.highlights) {
                newIsError.highlights = "This field Required*"
                isValid = false;
            }
            if (!propertyState.iconUrl) {
                newIsError.iconUrl = "Select property icon*"
                isValid = false;
            }
            // if (!propertyState.propertyImages) {
            if (selectedImageFiles?.length < 3) {
                newIsError.propertyImages = "Select min 3 property images*"
                isValid = false;
            }
            if (!propertyState.minBudget) {
                newIsError.minBudget = "This field Required*"
                isValid = false;
            }
            if (!propertyState.maxBudget) {
                newIsError.maxBudget = "This field Required*"
                isValid = false;
            }
            if (!propertyState.minReraCarpetArea) {
                newIsError.minReraCarpetArea = "This field Required*"
                isValid = false;
            }
            if (!propertyState.maxReraCarpetArea) {
                newIsError.maxReraCarpetArea = "This field Required*"
                isValid = false;
            }
            if (!propertyState.reraId) {
                newIsError.reraId = "This field Required*"
                isValid = false;
            }
            if (!propertyState.status) {
                newIsError.status = "This field Required*"
                isValid = false;
            }
            if (!propertyState.type) {
                newIsError.type = "This field Required*"
                isValid = false;
            }
            if (!propertyState.state) {
                newIsError.state = "This field Required*"
                isValid = false;
            }

            if (!propertyState.latitude) {
                newIsError.latitude = "Choose location in Map"
                isValid = false;
            }
            if (!propertyState.longitude) {
                newIsError.longitude = "Choose location in Map"
                isValid = false;
            }
            if (!propertyState.possessionDate) {
                newIsError.possessionDate = "Choose a Date"
                isValid = false;
            }
            if (!propertyState.launchDate) {
                newIsError.launchDate = "Choose a Date"
                isValid = false;
            }
            if (!propertyState.description) {
                newIsError.description = "This field Required*"
                isValid = false;
            }
            /*  if (!propertyState.videoUrl) {
                  newIsError.videoUrl = "This field Required*"
                  isValid = false;
              }
              if (!propertyState.locationTitle) {
                  newIsError.locationTitle = "This field Required*"
                  isValid = false;
              }*/

            console.log("errrrrrrrr",newIsError)
            setIsError(newIsError);

            if (isValid) {
                const formData = new FormData();
                formData.append('name', propertyState?.name);
                formData.append('id', propertyState?.id);
                formData.append('developerId', propertyState?.developerId);
                formData.append('state', propertyState?.state);
                formData.append('city', propertyState?.city);
                formData.append('area', propertyState?.area);
                formData.append('address', propertyState?.address);
                formData.append('avgPriceSqFt', propertyState?.avgPriceSqFt);
                formData.append('highlights', propertyState?.highlights);
                formData.append('iconUrl', propertyState?.iconUrl);
                formData.append('assured', propertyState?.assured);
                formData.append('exclusive', propertyState?.exclusive);
                formData.append('top', propertyState?.top);
                formData.append('verified', propertyState?.verified);
                formData.append('featured', propertyState?.featured);
                formData.append('fastSelling', propertyState?.fastSelling);
                formData.append('minBudget', propertyState?.minBudget);
                formData.append('maxBudget', propertyState?.maxBudget);
                formData.append('minReraCarpetArea', propertyState?.minReraCarpetArea);
                formData.append('maxReraCarpetArea', propertyState?.maxReraCarpetArea);
                formData.append('reraId', propertyState?.reraId);
                formData.append('status', propertyState?.status);
                formData.append('type', propertyState?.type);
                formData.append('amenities', propertyState?.amenities);
                formData.append('latitude', propertyState?.latitude);
                formData.append('longitude', propertyState?.longitude);
                formData.append('possessionDate', propertyState?.possessionDate);
                formData.append('launchDate', propertyState?.launchDate);
                formData.append('description', propertyState?.description);
                formData.append('videoUrl', propertyState?.videoUrl);
                formData.append('locationTitle', propertyState?.locationTitle);
                formData.append('file', imageFormData);

                if (value === 'add') {
                    for (let i = 0; i < selectedImageFiles.length; i++) {
                        formData.append("files", selectedImageFiles[i]);
                    }

                    dispatch(addProperty(propertyState, formData, onSuccess));

                } else if (value === 'update') {
                    const selectedLocalImages = selectedImageFiles.filter((images) => {
                        return !images?.id
                    })
                    for (let i = 0; i < selectedLocalImages.length; i++) {
                        formData.append("files", selectedLocalImages[i]);
                    }
                    dispatch(updateProperty(propertyState, formData, onSuccess));
                }

            }


        }

        const onSuccess = (isSuccess) => {
            if (isSuccess) {
                setPropertyState(propertyStateInitial);
                onFormToggleHandle();
            }
        }
        const onSuccessAmenities = (amenities) => {
            if (dataForm) {
                const propertyData = dataForm?.property
                if (propertyData) {
                    setPropertyState({
                        ...propertyState,
                        name: propertyData?.name,
                        id: propertyData?.id,
                        developerId: propertyData?.developerId,
                        area: propertyData?.area,
                        state: propertyData?.state,
                        city: propertyData?.city,
                        address: propertyData?.address,
                        avgPriceSqFt: String(propertyData?.avgPriceSqFt),
                        highlights: propertyData?.highlights,
                        iconUrl: propertyData?.iconUrl,
                        assured: propertyData?.assured,
                        exclusive: propertyData?.exclusive,
                        top: propertyData?.top,
                        verified: propertyData?.verified,
                        featured: propertyData?.featured,
                        fastSelling: propertyData?.fastSelling,
                        minBudget: String(propertyData?.minBudget),
                        maxBudget: String(propertyData?.maxBudget),
                        minReraCarpetArea: String(propertyData?.minReraCarpetArea),
                        maxReraCarpetArea: String(propertyData?.maxReraCarpetArea),
                        reraId: propertyData?.reraId,
                        status: propertyData?.status,
                        type: propertyData?.type,
                        amenities: amenities?.map((option) => option.id),
                        media: propertyData?.media?.url,
                        latitude: propertyData?.latitude,
                        longitude: propertyData?.longitude,
                        possessionDate: propertyData?.possessionDate,
                        launchDate: propertyData?.launchDate,
                        description: propertyData?.description,
                        videoUrl: propertyData?.videoUrl,
                        locationTitle: propertyData?.locationTitle,

                    })
                    setSelectedImages(propertyData?.media.url);
                }

            }
        }


        const handleSubmit = (e) => {
            e.preventDefault();
            formValidation('add');

        };
        /**
         * @author Vipul
         * @since 12-05-2023
         * @description to render the component on change of rmFormData
         */

        useEffect(() => {
        }, [propertyState]);

        /**
         * @author Vipul Garg
         * @since 11-05-2023
         * @description to fetch initial data
         */
        useEffect(() => {
            const fetchData = async () => {
                try {
                    await fetchStates().then(async (res) => {

                        setCountryState(res);

                        if (dataForm?.property?.state) {
                            //get state id
                            const state = res?.find((state) => state.name === dataForm?.property?.state);
                            // fetch cities
                            try {
                                await fetchCities(state?.stateId).then(async (citiesList) => {

                                    setCountryCity(citiesList)
                                    if (dataForm?.property?.city) {
                                        //get city id

                                        const city = citiesList?.find((city) => city.name === dataForm?.property?.city);
                                        //fetch areas
                                        try {
                                            const areasList = await fetchAreas(city?.cityId);
                                            setCountryArea(areasList)
                                        } catch (error) {
                                            console.log("error in getting areasList", error);
                                        }


                                    }
                                })

                            } catch (error) {
                                console.log("error in getting citiesList", error);
                            }


                        }

                    })

                } catch (error) {
                    // Handle the error if needed
                    console.log("error", error);
                }
            };

            fetchData()

        }, []);

        useEffect(() => {
            if (dataForm) {
                const propertyData = dataForm?.property
                if (propertyData) {
                    dispatch(fetchAdminPropertyAmenities(propertyData?.id, onSuccessAmenities))

                    // setImagesFormData((propertyData?.medias || []).map((file) => ({
                    setSelectedImageFiles((propertyData?.medias || []).map((file) => ({
                        id: file.id,
                        name: file.name,
                        url: file.url,
                        type: file.mimeType
                    })));
                }
            }
        }, [dataForm]);


        const handlePropertyUpdate = (e) => {
            e.preventDefault();
            formValidation('update');
        };

        const onDeleteImages = ({data, index}) => {
            console.log("data object...", data)
            if (data?.id) {
                setDeleted([...deleted, data.id]);
                // setImagesFormData(
                setSelectedImageFiles(
                    // imagesFormData.filter((image) => {
                    selectedImageFiles.filter((image) => {
                            return image.id !== data?.id
                        }
                    )
                )
            } else {
                // imagesFormData.splice(index, 1)
                // setImagesFormData([...imagesFormData]);
                // setSelectedImageFiles([...imagesFormData]);

                selectedImageFiles.splice(index, 1)
                setSelectedImageFiles([...selectedImageFiles])
            }
        }

        const onDeleteProperty = (propertyName, developerId) => {
            setConfirmationDialogState({
                visible: true,
                action: ConfirmationDialogAction.DELETE_PROPERTY,
                data: {propertyName, developerId}
            });
        }

        /**
         * @author Vikrant
         * @since 14-04-2023
         * @description set data at selection change
         * @param event
         */
        const handleSelectionChange = (event) => {
            const selectedOptions = event.map(item => item.id);
            setPropertyState({...propertyState, ['amenities']: selectedOptions});
        }

        const getCoordinates = (value) => {
            setIsError({...isError, ['latitude']: '', ['longitude']: ''});
            setPropertyState({...propertyState, ['latitude']: value.lat, ['longitude']: value.lng});
        }

        return (
            <div className={addPropertyStyles['add__property-container']}>
                <div className={addPropertyStyles['add__property-header']}>
                    <span>{dataForm?.property ? "Update" : "Add"} Property</span>
                </div>
                <div className={addPropertyStyles['add__property-form-container']}>
                    <div className={addPropertyStyles["add__property"]}>

                        <div className={addPropertyStyles["add__property-right-wrapper"]}>

                            <div className={addPropertyStyles["add__property-form"]}>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Name</div>
                                    <input name="name" type="text" placeholder="Name"
                                           value={propertyState.name}
                                           onChange={dataForm?.property ? "" : handleValueChange}
                                           disabled={!!dataForm?.property}
                                           style={{opacity: !!dataForm?.property ? 0.6 : 1}}
                                           className={addPropertyStyles[isError.name.length > 0 ? "add__property-name-input-outline" : "add__property-name-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.name.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.name}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Developer</div>
                                    <select className={addPropertyStyles["add__property-selector"]}
                                            placeholder="Developer"
                                            name="developerId"
                                            onChange={dataForm?.property ? "" : handleValueChange}
                                            disabled={!!dataForm?.property}>
                                        <option value={""} selected disabled
                                                hidden>{dataForm?.property ? dataForm?.developer?.developerName : "Select Developer"}</option>
                                        {developers?.map((developer) => (
                                            <option key={developer.developerId} value={developer.developerId}>
                                                {developer.developerName}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.developerId.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.developerId}</span>
                                        )}
                                    </div>
                                </div>


                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Amenities</div>
                                        <div style={{width:"60%"}}>
                                    <Multiselect
                                        displayValue="value"
                                        onSelect={handleSelectionChange}
                                        onRemove={handleSelectionChange}
                                        showCheckbox={true}
                                        options={amenitiesArr}
                                        selectedValues={selectedAmenityArr}

                                        placeholder="Choose Amenities"
                                        style={{

                                            chips: {
                                                background: '#670A0E',
                                                border: '1px solid #B0474C'
                                            },
                                            multiselectContainer: {
                                                // color: '#BE6E73',
                                                // background: '#F8D1D3',
                                                background: 'rgba(244,245,247)',
                                                zIndex: 0
                                            },
                                            searchBox: {
                                                // 'border': '1px solid #B0474C',
                                                'border': '1px solid rgba(229,231,235)',
                                                padding: '1rem',
                                                color: 'red'
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
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.amenities.length === 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.amenities}</span>
                                        )}
                                    </div>

                                </div>


                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>State</div>
                                    <select className={addPropertyStyles["add__property-selector"]}
                                            placeholder="State"
                                            name="state"
                                            onChange={handleValueChange}>
                                        <option value={""} selected disabled
                                                hidden>{propertyState?.state ? propertyState.state : "Select State"}</option>
                                        {(countryState)?.map((state) => (
                                            <option key={state.stateId} value={state.name}
                                                    data-stateid={state.stateId} // Set the stateId as a data-stateid attribute
                                            >
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.state && (
                                            <span className={addPropertyStyles["invalid__field"]}>{isError.state}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>City</div>
                                    <select className={addPropertyStyles["add__property-selector"]}
                                            placeholder="City"
                                            name="city"
                                            value={propertyState.city || ''}
                                            onChange={handleValueChange}>
                                        <option value={""} selected disabled
                                                hidden>{propertyState?.city ? propertyState.city : "Select City"}</option>
                                        {countryCity.length === 0 ? (
                                            <option value="" disabled>
                                                Select State first
                                            </option>
                                        ) : (
                                            <>
                                                {(countryCity)?.map((city) => (
                                                    <option key={city.cityId} value={city.name}
                                                            data-cityid={city.cityId} // Set the cityId as a data-cityid attribute
                                                    >
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.city && (
                                            <span className={addPropertyStyles["invalid__field"]}>{isError.city}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Area</div>
                                    <select className={addPropertyStyles["add__property-selector"]}
                                            placeholder="Area"
                                            name="area"
                                            value={propertyState.area || ''}
                                            onChange={handleValueChange}>
                                        <option value={""} selected disabled
                                                hidden>{propertyState?.area ? propertyState.area : "Select Area"}</option>
                                        {countryArea.length === 0 ? (
                                            <option value="" disabled>
                                                Select City first
                                            </option>
                                        ) : (
                                            <>
                                                {countryArea.map((area) => (
                                                    <option key={area.areaId} value={area.name}>
                                                        {area.name}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.area && (
                                            <span className={addPropertyStyles["invalid__field"]}>{isError.area}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Address</div>
                                    <input name="address" type="text" placeholder="Address"
                                           value={propertyState.address}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.address > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.address?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.address}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>AvgPriceSqFt</div>
                                    <input name="avgPriceSqFt" type="text" placeholder="AvgPriceSqFt"
                                           value={propertyState.avgPriceSqFt}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.avgPriceSqFt > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.avgPriceSqFt?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.avgPriceSqFt}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Highlights</div>
                                    <textarea name="highlights" placeholder="Highlights"
                                              value={propertyState.highlights}
                                              onChange={handleInputChange}
                                              className={addPropertyStyles[isError.highlights.length > 0 ? "add__property-highlights-input-outline" : "add__property-highlights-input"]}/>
                                    </div>

                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.highlights.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.highlights}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Rera Id</div>
                                    <input name="reraId" placeholder="ReraId"
                                           value={propertyState.reraId}
                                           onChange={handleInputChange}
                                           className={addPropertyStyles[isError.reraId.length > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.reraId.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.reraId}</span>
                                        )}
                                    </div>
                                </div>


                                {/*Start Image uploads*/}

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Image</div>
                                    <AppChooser onChange={handleValueChange} type={'image'} label={'Choose Image'}
                                                keyId={'iconUrl'}
                                                multiple={''}
                                                labelClassName={addPropertyStyles[isError.iconUrl.length > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}
                                                description={selectedImages ? ` 1 file` : ' No file chosen'}
                                    />
                                    </div>

                                    <div>
                                        {selectedImages ? (<div className={addPropertyStyles["add__property-form-image-wrapper"]}>
                                            <span className={addPropertyStyles["empty"]}></span>
                                            <img className={addPropertyStyles["add__property-image"]}
                                                 src={selectedImages} alt="image"/>
                                        </div>) : (
                                            <div className={propertyVariantStyles["invalid__field_display"]}>
                                                <span className={addPropertyStyles["empty"]}></span>
                                                {isError.iconUrl && (
                                                    <span
                                                        className={propertyVariantStyles["invalid__field"]}>{isError.iconUrl}</span>
                                                )}
                                            </div>
                                        )

                                        }
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Image</div>
                                    <AppChooser onChange={handleValueChange} type={'image'} label={'Choose Images'}
                                                keyId={'propertyImages'}
                                                multiple={'multiple'}
                                                labelClassName={addPropertyStyles[isError.propertyImages.length >= 3 ? "add__property-email-input-outline" : "add__property-email-input"]}
                                                description={setSelectedImageFiles.length > 0 ? ` ${selectedImageFiles.length} files` : ' No file chosen'}
                                    />
                                    </div>
                                    <div className={propertyVariantStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.propertyImages && (
                                            <span
                                                className={propertyVariantStyles["invalid__field"]}>{isError.propertyImages}</span>
                                        )}
                                    </div>

                                    <div
                                        // style={{marginTop: '1rem'}}
                                        style={{display:"flex"}}
                                    >
                                        <div className={addPropertyStyles["empty"]}></div>
                                        {selectedImageFiles?.length > 0 &&
                                            <div className={addPropertyStyles["add__property-form-image"]}>
                                                <AppImageCarousel imageFiles={selectedImageFiles} onDelete={onDeleteImages}
                                                                  carouselName={'Abc'}/>
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/*End Image Uploads*/}


                                <div className={addPropertyStyles['add__property-radio-btn-container']}>
                                    <label className={addPropertyStyles['add__property-item-name']} >Is Assured</label>
                                    <div style={{width:"60%"}}>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               name="assured"
                                               type="radio"
                                               value="true"
                                               checked={propertyState.assured}
                                               onChange={handleRadioChange}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               name="assured"
                                               type="radio"
                                               value="false"
                                               checked={!propertyState.assured}
                                               onChange={handleRadioChange}
                                        />
                                        No
                                    </label>
                                    </div>
                                </div>

                                <div className={addPropertyStyles['add__property-radio-btn-container']}>
                                    <label className={addPropertyStyles['add__property-item-name']}>Is Exclusive</label>
                                    <br/>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="exclusive"
                                               value="true"
                                               checked={propertyState.exclusive}
                                               onChange={handleRadioChange}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="exclusive"
                                               value="false"
                                               checked={!propertyState.exclusive}
                                               onChange={handleRadioChange}
                                        />
                                        No
                                    </label>
                                </div>

                                <div className={addPropertyStyles['add__property-radio-btn-container']}>
                                    <label className={addPropertyStyles['add__property-item-name']}>Is Top</label>
                                    <div style={{width:"60%"}}>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="top"
                                               value="true"
                                               checked={propertyState.top}
                                               onChange={handleRadioChange}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="top"
                                               value="false"
                                               checked={!propertyState.top}
                                               onChange={handleRadioChange}
                                        />
                                        No
                                    </label>
                                    </div>
                                </div>

                                <div className={addPropertyStyles['add__property-radio-btn-container']}>
                                    <label className={addPropertyStyles['add__property-item-name']}>Is Verified</label>
                                    <div style={{width:"60%"}}>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="verified"
                                               value="true"
                                               checked={propertyState.verified}
                                               onChange={handleRadioChange}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="verified"
                                               value="false"
                                               checked={!propertyState.verified}
                                               onChange={handleRadioChange}
                                        />
                                        No
                                    </label>
                                    </div>
                                </div>

                                <div className={addPropertyStyles['add__property-radio-btn-container']}>
                                    <label className={addPropertyStyles['add__property-item-name']}>Is FastSelling</label>
                                    <div style={{width:"60%"}}>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="fastSelling"
                                               value="true"
                                               checked={propertyState.fastSelling}
                                               onChange={handleRadioChange}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="fastSelling"
                                               value="false"
                                               checked={!propertyState.fastSelling}
                                               onChange={handleRadioChange}
                                        />
                                        No
                                    </label>
                                    </div>
                                </div>

                                <div className={addPropertyStyles['add__property-radio-btn-container']}>
                                    <label className={addPropertyStyles['add__property-item-name']}>Is Featured</label>
                                    <div style={{width:"60%"}}>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="featured"
                                               value="true"
                                               checked={propertyState.featured}
                                               onChange={handleRadioChange}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input className={addPropertyStyles['add__property-radio-button']}
                                               type="radio"
                                               name="featured"
                                               value="false"
                                               checked={!propertyState.featured}
                                               onChange={handleRadioChange}
                                        />
                                        No
                                    </label>
                                    </div>
                                </div>


                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Min Budget</div>
                                    <input name="minBudget" type="text" placeholder="Min Budget"
                                           value={propertyState.minBudget}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.minBudget > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.minBudget?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.minBudget}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Max Budget</div>
                                    <input name="maxBudget" type="text" placeholder="Max Budget"
                                           value={propertyState.maxBudget}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.maxBudget > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.maxBudget?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.maxBudget}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Min Rera Carpet Area</div>
                                    <input name="minReraCarpetArea" type="text"
                                           placeholder="Min Rera Carpet Area"
                                           value={propertyState.minReraCarpetArea}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.minReraCarpetArea > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.minReraCarpetArea?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.minReraCarpetArea}</span>
                                        )}
                                    </div>
                                </div>


                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Max Rera Carpet Area</div>
                                    <input name="maxReraCarpetArea" type="text"
                                           placeholder="Max Rera Carpet Area"
                                           value={propertyState.maxReraCarpetArea}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.maxReraCarpetArea > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.maxReraCarpetArea?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.maxReraCarpetArea}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Possession Date</div>
                                    <input name="possessionDate" type="date"
                                           placeholder="Possession Date"
                                           value={propertyState.possessionDate}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.possessionDate > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.possessionDate?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.possessionDate}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Launch Date</div>
                                    <input name="launchDate" type="date"
                                           placeholder="Launch Date"
                                           value={propertyState.launchDate}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.launchDate > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.launchDate?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.launchDate}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Description</div>
                                    <textarea name="description"
                                              placeholder="Description"
                                              value={propertyState.description}
                                              onChange={handleValueChange}
                                              className={addPropertyStyles[isError.description > 0 ? "add__property-highlights-input-outline" : "add__property-highlights-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.description?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.description}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Video Url</div>
                                    <input name="videoUrl" type="text"
                                           placeholder="Video Url"
                                           value={propertyState.videoUrl}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.videoUrl > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.videoUrl?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.videoUrl}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Location Title</div>
                                    <input name="locationTitle" type="text"
                                           placeholder="Location Title"
                                           value={propertyState.locationTitle}
                                           onChange={handleValueChange}
                                           className={addPropertyStyles[isError.locationTitle > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.locationTitle?.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.locationTitle}</span>
                                        )}
                                    </div>
                                </div>


                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Status</div>
                                    <select className={addPropertyStyles["add__property-selector"]}
                                            placeholder="Status"
                                            name="status"
                                            onChange={handleValueChange}>
                                        <option value={""} selected disabled
                                                hidden>{dataForm?.property ? propertyState.status : "Select Status"}</option>
                                        {(propertyStatus)?.map((status) => (
                                            <option key={status.id} value={status.name}>
                                                {status.name}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.status.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.status}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div style={{display:"flex"}}>
                                        <div className={addPropertyStyles["add__property-item-name"]}>Type</div>
                                    <select className={addPropertyStyles["add__property-selector"]}
                                            placeholder="type"
                                            name="type"
                                            onChange={handleValueChange}>
                                        <option value={""} selected disabled
                                                hidden>{dataForm?.property ? propertyState.type : "Select Type"}</option>
                                        {type?.map((type) => (
                                            <option key={type.id} value={type.name}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.type.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.type}</span>
                                        )}
                                    </div>
                                </div>


                                {/*Start Map*/}
                                <div>
                                    <AdminMap getCoordinates={getCoordinates}
                                              markers={{lat: +propertyState?.latitude, lng: +propertyState?.longitude}}/>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        <span className={addPropertyStyles["empty"]}></span>
                                        {isError.longitude.length > 1 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.longitude}</span>
                                        )}
                                    </div>
                                </div>

                                {/*End Map*/}

                                {/*Start Latitude and Longitude fields*/}
                                {/*<div>
                                    <input name="latitude" type="text" placeholder="Latitude"
                                           value={propertyState.lat}
                                           disabled={true}
                                           style={{opacity:0.6}}
                                           className={addPropertyStyles[isError.lat > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        {isError.latitude.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.latitude}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <input name="longitude" type="text" placeholder="Longitude"
                                           value={propertyState.lng}
                                           disabled={true}
                                           style={{opacity:0.6}}
                                           className={addPropertyStyles[isError.lng > 0 ? "add__property-email-input-outline" : "add__property-email-input"]}/>
                                    <div className={addPropertyStyles["invalid__field_display"]}>
                                        {isError.longitude.length > 0 && (
                                            <span
                                                className={addPropertyStyles["invalid__field"]}>{isError.longitude}</span>
                                        )}
                                    </div>
                                </div>*/}
                                {/*Start Latitude and Longitude fields*/}

                                {/*<div className={addPropertyStyles["add__property-send-button-wrapper"]}>*/}
                                {/*    <AppRoundButton*/}
                                {/*        onClick={dataForm?.property ? handlePropertyUpdate : handleSubmit}*/}
                                {/*        buttonText={dataForm?.property ? "Update" : "Add"}*/}
                                {/*        buttonStyle={addPropertyStyles["add__property-send-button"]}*/}
                                {/*        type={"primary"}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/*{dataForm?.property &&*/}
                                {/*    <div className={addPropertyStyles["add__property-send-button-wrapper"]}>*/}
                                {/*        <AppRoundButton*/}
                                {/*            onClick={() => onDeleteProperty(propertyState.name, propertyState.developerId)}*/}
                                {/*            buttonText={"delete"}*/}
                                {/*            buttonStyle={addPropertyStyles["add__property-send-button"]}*/}
                                {/*            type={"primary"}*/}
                                {/*        />*/}
                                {/*    </div>}*/}
                            </div>
                        </div>
                        <div style={{display: confirmationDialogState.visible ? '' : 'none'}}>
                            <ConfirmationDialog type='delete' title={title} state={confirmationDialogState}
                                                onClick={({visible, action, data}) => {
                                                    if (action === ConfirmationDialogAction.DELETE_PROPERTY && visible) {
                                                        const {propertyName, developerId} = data;
                                                        dispatch(deleteProperty(propertyName, developerId, onSuccess))
                                                    }
                                                    setConfirmationDialogState({visible: false, action: undefined});
                                                }}/>
                        </div>
                    </div>
                </div>
                <div className={addPropertyStyles["add__property-send-button-wrapper"]}>
                    <AppRoundButton
                        onClick={dataForm?.property ? handlePropertyUpdate : handleSubmit}
                        buttonText={dataForm?.property ? "Update" : "Add"}
                        buttonStyle={addPropertyStyles["add__property-send-button"]}
                        type={"primary"}
                    />


                {dataForm?.property &&
                    // <div className={addPropertyStyles["add__property-send-button-wrapper"]}>
                        <AppRoundButton
                            onClick={() => onDeleteProperty(propertyState.name, propertyState.developerId)}
                            buttonText={"Delete"}
                            buttonStyle={addPropertyStyles["add__property-send-button"]}
                            type={"primary"}
                        />
                    // </div>
                }
                </div>
            </div>
        );
    }
;

export default AddProperty;
