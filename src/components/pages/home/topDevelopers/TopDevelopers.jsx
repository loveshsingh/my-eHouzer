import * as React from 'react'
import {useEffect, useState} from 'react'
import TopDevelopersStyle from "./TopDevelopers.module.css";
import DevelopersTabsCarousel from "../developersTabsCarousel/DevelopersTabsCarousel";
import DeveloperTabDetails from "../developerTabDetails/DeveloperTabDetails";
import PropertiesCarousel from "../propertiesCarousel/PropertiesCarousel";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {setSearchFilters} from "../../../../actions/search";
import {fetchTopDeveloperProperties} from "../../../../actions/home";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const TopDevelopers = () => {

    const {topDevelopers, topDeveloperProperties} = useSelector((state) => state.homeReducer)

    const [activeTabId, setActiveTabId] = useState(0);

    const [developerProperties, setDeveloperProperties] = useState([]);

    const dispatch = useDispatch()
    const router = useRouter();

    const onClickViewMore = (condition) => {
        dispatch(setSearchFilters({[condition]: true}))
        router.pathname = '/search'
        router.query[condition] = "true"
        router.push(router)
    }

    const onPressDeveloperTab = (tabId) => {
        setActiveTabId(tabId);
        //dispatch<any>(fetchTopDeveloperProperties(topDevelopers[activeTabId].id))
        //setDeveloperProperties(topDeveloperProperties)
    }

    useEffect(() => {
        setDeveloperProperties(topDeveloperProperties)
    }, [topDeveloperProperties])

    /* useEffect(()=>{
         if (topDevelopers.length > 0) {
             dispatch<any>(fetchTopDeveloperProperties(topDevelopers[activeTabId].id))
         }
     },[])*/


    useEffect(() => {
        if (topDevelopers.length > 0) {
            dispatch(fetchTopDeveloperProperties(topDevelopers[activeTabId].id))
        }
    }, [topDevelopers, activeTabId])

        return (
            <div className={TopDevelopersStyle["top-developers"]}>
                <div className={TopDevelopersStyle["top-developers__heading-wrapper"]}>
                    <h1 className={TopDevelopersStyle["top-developers__heading"]}>Top Developers</h1>
                    <p onClick={() => onClickViewMore("isTop")}
                       className={TopDevelopersStyle["top-developers__view-more"]}>View More</p>
                </div>
                <DevelopersTabsCarousel developers={topDevelopers} activeTabId={activeTabId}
                                        onPressDeveloperTab={onPressDeveloperTab}/>
                <DeveloperTabDetails activeTabId={activeTabId} tabHeading={'A'} tabDetails={"B"}/>
                <PropertiesCarousel propertiesData={developerProperties} carouselName={"topDevelopers"}/>
            </div>
        )
}

export default TopDevelopers;
