import * as React from 'react'
import {useEffect, useState} from 'react'
import UpcomingMeetingStyle from "./UpcomingMeeting.module.css"
import VisitCardFullView from "../visitCardFullView/VisitCardFullView";
import VisitCard from "../visitCard/VisitCard";
import {useDispatch, useSelector} from "react-redux";
import {getMeetings} from "../../../../actions/login";
import VisitCardMobileView from "../visitCardMobileView/VisitCardMobileView";
import {useApp} from "../../../../base/contexts/AppProvider";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render upcoming meeting.
 * @return {JSX.Element}
 */
const UpcomingMeeting = () => {

    const {visits, userDetails, meetingsLoading} = useSelector((state) => state.authReducer);
    const {upcomingVisits} = visits;
    const upcomingLatestVisit = upcomingVisits[0];
    const [selectedUpcomingVisit, setSelectedUpcomingVisit] = useState();
    const [activeMyVisitNavItem, setActiveMyVisitNavItem] = useState(1);
    const app = useApp()

    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            setSelectedUpcomingVisit(upcomingLatestVisit)
        }
        init()
    }, [upcomingLatestVisit])


    useEffect(() => {
        const load = async () => {
            const meetingData = "Upcoming"
            dispatch(getMeetings(meetingData, "upcomingVisits"))
        }
        load();
    }, [userDetails]);

    const onClickVisitCard = (visitData/*,tabId:number*/) => {
        setSelectedUpcomingVisit(visitData);
        /*setActiveMyVisitNavItem(tabId);*/
    }


    // UI Constants.
    const IS_UPCOMING_VISITS_EMPTY = visits?.upcomingVisits?.length === 0;
    const IS_UPCOMING_VISITS_GREATER = visits?.upcomingVisits?.length > 0;
    const UPCOMING_VISITS = upcomingVisits;

    return (
        <div className={UpcomingMeetingStyle['upcoming-meeting']}>
            <div className={UpcomingMeetingStyle['upcoming-meeting__meetings-list']}>
                {!meetingsLoading && IS_UPCOMING_VISITS_GREATER ? (
                    <>
                        {UPCOMING_VISITS?.map((visit) => (
                            <VisitCard
                                activeItem={activeMyVisitNavItem}
                                onClick={onClickVisitCard}
                                key={visit.transactionId}
                                visitData={visit}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {!meetingsLoading && IS_UPCOMING_VISITS_EMPTY ? (
                            <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: 'center'}}>
                                No data found
                            </h1>
                        ) : (
                            <h1 style={{color: '#747474', fontWeight: 400, fontSize: '1.5rem', textAlign: 'center'}}>
                                Loading...
                            </h1>
                        )}
                    </>
                )}
            </div>

            <div className={UpcomingMeetingStyle['upcoming-meeting__meeting-view']}>
                {selectedUpcomingVisit && <VisitCardFullView visitData={selectedUpcomingVisit}/>}
            </div>

            {app?.isMobile ? <div>
                {IS_UPCOMING_VISITS_GREATER ? UPCOMING_VISITS?.map((visit) => {
                    return (<VisitCardMobileView key={visit.transactionId} visitData={visit}/>)
                }) : <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>No data
                    found</h1>}
            </div> : null}
        </div>
    )
}


export default UpcomingMeeting;
