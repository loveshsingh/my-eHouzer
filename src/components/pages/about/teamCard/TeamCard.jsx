import * as React from 'react'
import TeamCardStyle from "./TeamCard.module.css";
import Image from "next/image";
import {StringConstants} from "../../../../constants/StringConstants";

/**
 * @author Lovesh Singh.
 * @since 19-12-2022.
 * @description to render top developer tab.
 * @return {JSX.Element}
 */
const TeamCard = ({image, desc}) => {

    return (
        <div className={TeamCardStyle["team-card"]}>
            <Image alt={StringConstants.TeamProfileImageText} src={image}
                   className={TeamCardStyle["team-card__image"]}/>
            <p className={TeamCardStyle["team-card__desc"]}>{desc}</p>
        </div>
    )
}

export default TeamCard;
