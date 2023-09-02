import * as React from "react";
import {Component} from "react";
import Head from "next/head";
import Stepper from "../components/pages/payment/stepper/Stepper";
import StepperProvider from "../base/contexts/StepperProvider";
import BookingOverview from "../components/pages/payment/bookingOverview/BookingOverview";
import MakePayment from "../components/pages/payment/makePayment/MakePayment";
import MakePaymentOffline from "../components/pages/payment/makePaymentOffline/MakePaymentOffline";
import PaymentSuccessfulCard from "../components/pages/payment/paymentSuccessfulCard/PaymentSuccessfulCard";
import {connect} from "react-redux";
import {withRouter} from "next/router";
import {fetchVariantBYId, viewProperty} from "../actions/booking";
import AdminFooter from "../components/pages/home/adminFooter/AdminFooter";

/**
 * @author Vikrant
 * @since 01-05-2023
 * @description to handle payment pages
 */
class Payment extends Component {
    TAG = "Payment";

    componentDidMount() {
        console.log(this.TAG, "componentDidMount")
        if (this.props.authReducer.isLoggedIn) {
            this.props.viewProperty(this.props.router.query.pid, this.propertyViewed)
        } else {
            this.props.router.push('/');
        }

    }

    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.router.query.pid !== nextProps.router.query.pid;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.router.query.pid !== this.props.router.query.pid) {
            this.props.viewProperty(this.props.router.query.pid, this.propertyViewed)
        }
    }*/

    propertyViewed = (property) => {
        if (this.props.authReducer?.isLoggedIn) {
            this.props.fetchVariantBYId(this.props.router.query.vid)
        }
    }

    render() {
        const isLoggedIn = this.props.authReducer.isLoggedIn;
        console.log(this.TAG, "render")
        return (
            <>
                <div>
                    <Head>
                        <title>Payment</title>
                        <link rel="stylesheet"
                              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"/>
                    </Head>
                    {isLoggedIn && (
                        <>
                            <StepperProvider>
                                <Stepper>
                                    <Stepper.Steps>
                                        <Stepper.Step id="first" name="Step 1">
                                            <BookingOverview/>
                                        </Stepper.Step>
                                        <Stepper.Step id="second" name="Step 2">
                                            <MakePayment/>
                                            <MakePaymentOffline/>
                                        </Stepper.Step>
                                        <Stepper.Step id="third" name="Step 3">
                                            <PaymentSuccessfulCard/>
                                        </Stepper.Step>
                                    </Stepper.Steps>
                                </Stepper>
                            </StepperProvider>
                        </>
                    )}
                </div>
                <AdminFooter/>
            </>
        );
    }
}


const mapStateToProps = ({authReducer, bookingReducer}) => {
    return {
        authReducer,
        bookingReducer,
    };
};

const mapDispatchToProps = {
    viewProperty,
    fetchVariantBYId
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Payment));
