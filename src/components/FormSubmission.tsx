'use client'

import { Button, IconButton, Stack, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import NextLink from './next/NextLink'
import Instagram from './icons/Instagram'
import X from './icons/X'
import LinkedIn from './icons/LinkedIn'
import Youtube from './icons/Youtube'
import { useTranslations } from 'next-intl'

type FormSubmissionProps = {
    setFormStep: Dispatch<SetStateAction<number>>
}

const FormSubmission = ({ setFormStep }: FormSubmissionProps) => {
    const t = useTranslations('ApplicationForm');

    return (
        <Stack spacing={2}>
            <Typography variant="h4" component="h1" color="secondary.contrastText" textAlign="center">
                {t('form-submission-title')}
            </Typography>

            <Typography variant="body1" component="p" color="secondary.contrastText" textAlign="center">
                {t.rich('form-submission-text', { anchor: (chunks) => <a href="https://panda.bau.edu.tr/auth/login" target="_blank" style={{ color: 'pink' }}>{chunks}</a> })}
            </Typography>

            <Stack justifyContent="center" spacing={2} direction="row">
                <NextLink href="https://www.instagram.com/bauyazilim/" target="_blank">
                    <IconButton color="tertiary">
                        <Instagram color="inherit" />
                    </IconButton>
                </NextLink>

                <NextLink href="https://twitter.com/buyabi" target="_blank">
                    <IconButton color="tertiary">
                        <X color="inherit" />
                    </IconButton>
                </NextLink>

                <NextLink href="https://www.linkedin.com/company/bauyazilim" target="_blank">
                    <IconButton color="tertiary">
                        <LinkedIn color="inherit" />
                    </IconButton>
                </NextLink>

                <NextLink href="https://www.youtube.com/@buyabi" target="_blank">
                    <IconButton color="tertiary">
                        <Youtube color="inherit" />
                    </IconButton>
                </NextLink>
            </Stack>

            <Button variant="text" onClick={() => setFormStep(0)}>
                {t('refill-form')}
            </Button>
        </Stack>
    )
}

export default FormSubmission