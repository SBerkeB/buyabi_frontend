import Link, { LinkProps } from 'next/link'
import React from 'react'

type NextLinkProps = LinkProps & {
    children: React.ReactNode
    target?: '_blank' | '_self' | '_parent' | '_top'
}

const NextLink = ({ children, target = '_self', ...props }: NextLinkProps) => {
    return (
        <Link {...props} target={target}>
            {children}
        </Link>
    )
}

export default NextLink