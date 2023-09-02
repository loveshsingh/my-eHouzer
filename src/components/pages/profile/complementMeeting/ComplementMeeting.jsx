import * as React from 'react'
import ComplementMeetingStyle from "./ComplementMeeting.module.css"

/**
 * @author Lovesh Singh.
 * @since 10-01-2022.
 * @description to render complement meeting.
 * @return {JSX.Element}
 */
const ComplementMeeting = () => {

    return (
        <div className={ComplementMeetingStyle['complement-meeting']}>
            <div className={ComplementMeetingStyle['complement-meeting__meetings-list']}>
                {/*    <VisitCard/>
                <VisitCard/>
                <VisitCard/>
                <VisitCard/>*/}
            </div>

            <div className={ComplementMeetingStyle['complement-meeting__meeting-view']}>
                {/*   <VisitCardFullView/>*/}
            </div>
        </div>
    )
}


export default ComplementMeeting;
