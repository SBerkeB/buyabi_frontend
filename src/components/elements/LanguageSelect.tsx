'use client'

import { Select, SelectChangeEvent } from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent } from 'react'

type Props = {}

const LanguageSelect = (props: Props) => {
    const router = useRouter();
    const locale = useLocale();

    const handleSelect = (event: SelectChangeEvent) => {
        const locale = event.target.value;

        router.push(locale);
    }

    return (
        <Select
            native
            value={locale}
            size="small"
            onChange={handleSelect}
        >
            <option value="en">EN</option>
            <option value="tr">TR</option>
        </Select>
    )
}

export default LanguageSelect;