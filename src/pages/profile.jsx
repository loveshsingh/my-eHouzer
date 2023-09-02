import React, {Component} from "react";
import Head from "next/head";
import Footer from "../components/pages/home/footer/Footer";
import ProfileStyle from "../styles/componentStyles/profileStyles/Profile.module.css";
import ProfileNavbar from "../components/pages/profile/profileNavbar/ProfileNavbar";
import {connect} from "react-redux";
import {fetchBookedProperties, fetchProfileDetails, fetchViewedPropertiesCount} from "../actions/login";
import {AppColors} from "../public/AppColors";
import AppIcon from "../components/lib/AppIcon/AppIcon";

class Profile extends Component {
    componentDidMount() {
        const userId = this.props.authReducer.userDetails?.userId;
        this.props.fetchProfileDetails(userId);
        this.props.fetchBookedProperties('');
        this.props.fetchViewedPropertiesCount();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.authReducer !== nextProps.authReducer;
    }

    DetailComponent = ({icon, heading, value}) => {
        return (
            <div className={ProfileStyle["profile__details-component"]}>
                <div className={ProfileStyle["profile__details-component-icon-wrapper"]}>
                    <AppIcon name={icon} color={AppColors.roseGold} size={18}/>
                </div>
                <p className={ProfileStyle["profile__details-component-heading"]}>{heading}</p>
                <p className={ProfileStyle["profile__details-component-value"]}>{value}</p>
            </div>
        );
    };

    render() {
        return (
            <div>
                <Head>
                    <title>Profile</title>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"
                    />
                </Head>
                <div className={ProfileStyle["profile"]}>
                    <div className={ProfileStyle["profile__header-wrapper"]}>
                        <div className={ProfileStyle["profile__header"]}>
                            <h1 className={ProfileStyle["profile__header-text"]}>Welcome to eHouzer!</h1>
                            <div className={ProfileStyle["profile__image-wrapper"]}>
                                {/*<div className={ProfileStyle["profile__image-container"]}>*/}
                                <AppIcon name={"mdi:user-circle"} color={AppColors.middleRedPurple} size={65}/>
                                {/*</div>*/}
                            </div>
                        </div>

                        <div className={ProfileStyle["profile__header-bottom"]}></div>
                        <div className={ProfileStyle["profile__details-wrapper"]}>
                            <div className={ProfileStyle["profile__details-container"]}>
                                <p className={ProfileStyle["profile__details-container-name"]}>
                                    {this.props.authReducer.userProfile?.firstName} {this.props.authReducer.userProfile?.lastName}
                                </p>
                                <p className={ProfileStyle["profile__details-container-email"]}>
                                    {this.props.authReducer.userProfile?.emailId}
                                </p>
                            </div>

                            <div className={ProfileStyle["profile__details-component-wrapper"]}>
                                <this.DetailComponent heading={"Viewed Properties"} icon={'ic:round-remove-red-eye'}
                                                      value={+this.props.authReducer?.viewedPropertiesCount}/>
                                <this.DetailComponent heading={"Visited Properties"}
                                                      icon={'material-symbols:location-on'}
                                                      value={+this.props.authReducer?.visitedProperties.length}/>
                                <this.DetailComponent heading={"Shortlisted"} icon={'mdi:cards-heart'}
                                                      value={+this.props.authReducer.shortlistedProperties.length}/>
                                <this.DetailComponent heading={"Booked Property"} icon={'uis:calender'}
                                                      value={+this.props.authReducer.bookedProperties.length}/>
                            </div>
                        </div>

                        <ProfileNavbar/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = ({authReducer, loginReducer}) => {
    return {
        authReducer,
        loginReducer,
    };
};

const mapDispatchToProps = {
    fetchProfileDetails,
    fetchBookedProperties,
    fetchViewedPropertiesCount
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
