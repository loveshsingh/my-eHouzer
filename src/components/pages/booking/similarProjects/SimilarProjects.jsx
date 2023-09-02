import * as React from 'react'
import SimilarProjectsStyle from "./SimilarProjects.module.css";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const SimilarProjects = () => {

    return (
        <div className={SimilarProjectsStyle["similar-projects"]}>
            <h1 className={SimilarProjectsStyle["similar-projects__heading"]}>Similar Projects</h1>
            {/* <PropertiesCarousel />*/}
        </div>
    )
}

export default SimilarProjects;
