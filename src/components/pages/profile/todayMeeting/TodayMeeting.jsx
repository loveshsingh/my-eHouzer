import * as React from 'react'
import {useEffect, useState} from 'react'
import TodayMeetingStyle from "./TodayMeeting.module.css"
import VisitCardFullView from "../visitCardFullView/VisitCardFullView";
import VisitCard from "../visitCard/VisitCard";
import {useDispatch, useSelector} from "react-redux";
import {getMeetings} from "../../../../actions/login";
import VisitCardMobileView from "../visitCardMobileView/VisitCardMobileView";
import {useApp} from "../../../../base/contexts/AppProvider";

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render todays meeting.
 * @return {JSX.Element}
 */
const TodayMeeting = () => {

    const {visits, userDetails} = useSelector((state) => state.authReducer);
    const {todayVisits} = visits;
    const todayLatestVisit = todayVisits[0];
    const [selectedTodayVisit, setSelectedTodayVisit] = useState();
    const dispatch = useDispatch();
    const app = useApp()

    useEffect(() => {
        const init = async () => {
            setSelectedTodayVisit(todayLatestVisit)
        }
        init()
    }, [todayLatestVisit])

    useEffect(() => {
        const load = async () => {
            const meetingData = "Today";
            dispatch(getMeetings(meetingData, "todayVisits"))
        }
        load();
    }, [userDetails]);


    const onClickVisitCard = (visitData) => {
        setSelectedTodayVisit(visitData);
    }

    // UI Constants.
    const IS_TODAY_VISITS_EMPTY = todayVisits?.length > 0;
    const TODAY_VISITS = todayVisits;

    return (
        <div className={TodayMeetingStyle['today-meeting']}>
            <div className={TodayMeetingStyle['today-meeting__meetings-list']}>
                {IS_TODAY_VISITS_EMPTY ? TODAY_VISITS?.map((visit, index) => {
                    return (<VisitCard onClick={onClickVisitCard} key={index} visitData={visit}
                                       activeItem={""}/>)
                }) : <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "left"}}>No data
                    found</h1>}
            </div>

            <div className={TodayMeetingStyle['today-meeting__meeting-view']}>
                {selectedTodayVisit && <VisitCardFullView visitData={selectedTodayVisit}/>}
            </div>

            {app?.isMobile ? <div>
                {IS_TODAY_VISITS_EMPTY ? TODAY_VISITS?.map((visit, index) => {
                    return (<VisitCardMobileView key={index} visitData={visit}/>)
                }) : <h1 style={{color: '#747474', fontWeight: 500, fontSize: '2rem', textAlign: "center"}}>No data
                    found</h1>}
            </div> : null}
        </div>
    )
}


export default TodayMeeting;
