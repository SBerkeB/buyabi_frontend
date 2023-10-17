'use client'

import ApplicationForm from '@/components/ApplicationForm'
import FormSubmission from '@/components/FormSubmission';
import { Box } from '@mui/material'
import { useState } from 'react';

export default function Home() {
    const [formStep, setFormStep] = useState(0);

    return (
        <Box flex={1} display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'flex-end' }} p={{ xs: 4, md: 8 }} position="relative">
            {formStep === 0 && <ApplicationForm setFormStep={setFormStep} />}

            {formStep === 1 && <FormSubmission setFormStep={setFormStep} />}
        </Box>
    )
}
