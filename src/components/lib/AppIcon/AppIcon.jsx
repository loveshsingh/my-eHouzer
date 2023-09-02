import React from 'react';
import {Icon} from "@iconify/react";

/**
 * @author Lovesh Singh
 * @returns {JSX.Element}
 * @description Custom AppIcon Component.
 * @since 21-02-2023
 * @param type icon vendor name.
 * @see Icons - supported vendors.
 * @param name icon name - given by vendor.
 * @param color icon color.
 * @param size icon size - default: 24.
 * @param style icon styling.
 * @see https://icon-sets.iconify.design/ icons given by
 */
const AppIcon = ({name, color, size = 15, style, onClick}) => {

    return (
        <>
            <Icon icon={name} color={color} fontSize={size} style={style} onClick={onClick} width={size} height={size}/>
        </>
    )
}

export default AppIcon
