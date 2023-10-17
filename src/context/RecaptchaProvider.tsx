'use client'

import { useLocale } from 'next-intl'
import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

type Props = {
    children: React.ReactNode
}

const RecaptchaProvider = ({ children }: Props) => {
    const locale = useLocale();

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.RECAPTCHA_SITE_KEY!}
            language={locale}
            scriptProps={{
                async: true, // optional, default to false,
                defer: true, // optional, default to false
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    )
}

export default RecaptchaProvider