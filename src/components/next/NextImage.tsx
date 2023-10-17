import { Box, SxProps, Theme } from '@mui/material'
import Image, { ImageProps } from 'next/image'
import React from 'react'

type NextImageProps = ImageProps & {
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
}

const NextImage = ({ width = 1, height = 1, sx = {}, ...props }: NextImageProps) => {

    return (
        <Box position="relative" width={width} height={height} sx={sx}>
            <Image fill style={{ objectFit: 'cover' }} {...props} />
        </Box>
    )
}

export default NextImage;