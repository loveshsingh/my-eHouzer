import * as React from 'react'
import PropertiesWithHeadingStyle from "./PropertiesCarouselWithHeading.module.css";
import {setSearchFilters} from "../../../../actions/search";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const PropertiesCarouselWithHeading = ({tabHeading, condition}) => {

    const dispatch = useDispatch()
    const router = useRouter();

    const onClickViewMore = (condition) => {
        dispatch(setSearchFilters({[condition]: true}))
        router.pathname = '/search'
        router.query[condition] = "true"
        router.push(router)
    }

    return (
        <div className={PropertiesWithHeadingStyle["properties"]}>
            <div className={PropertiesWithHeadingStyle["properties__heading-wrapper"]}>
                <h1 className={PropertiesWithHeadingStyle["properties__heading"]}>{tabHeading}</h1>
                {/*<Link href={{ pathname: '/search', query: { [condition]: true } }}>*/}
                <p onClick={() => onClickViewMore(condition)}
                   className={PropertiesWithHeadingStyle["properties__view-more"]}>View More</p>
                {/*</Link>*/}
            </div>
        </div>
    )
}

export default PropertiesCarouselWithHeading;
