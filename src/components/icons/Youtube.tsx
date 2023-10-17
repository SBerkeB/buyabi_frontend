import { SvgIcon, SvgIconProps } from '@mui/material'
import React from 'react'

type Props = SvgIconProps

const Youtube = (props: Props) => {
    return (
        <SvgIcon xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512" {...props}>
            <g><path d="M501.3 131.96c-5.89-22.17-23.24-39.63-45.26-45.56C416.11 75.64 256 75.64 256 75.64s-160.11 0-200.04 10.76c-22.02 5.93-39.37 23.39-45.26 45.56C0 172.15 0 256 0 256s0 83.85 10.7 124.04c5.89 22.17 23.24 39.63 45.26 45.56C95.89 436.36 256 436.36 256 436.36s160.11 0 200.04-10.76c22.02-5.93 39.37-23.39 45.26-45.56C512 339.85 512 256 512 256s0-83.85-10.7-124.04zM203.64 332.13V179.87L337.45 256l-133.81 76.13z"></path></g>
        </SvgIcon>
    )
}

export default Youtube;