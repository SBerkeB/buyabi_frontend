import '../globals.css';
import ThemeRegistry from '@/components/mui/ThemeRegistery';
import { Box, Container, IconButton, Stack, } from '@mui/material';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Instagram from '@/components/icons/Instagram';
import X from '@/components/icons/X';
import LinkedIn from '@/components/icons/LinkedIn';
import Youtube from '@/components/icons/Youtube';
import NextLink from '@/components/next/NextLink';
import NextImage from '@/components/next/NextImage';
import LanguageSelect from '@/components/elements/LanguageSelect';
import RecaptchaProvider from '@/context/RecaptchaProvider';

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'tr' }];
}

export const metadata: Metadata = {
    title: 'BAU Yazılım ve Bilişim Kulübü Üyelik Formu',
    description:
        'Bahçeşehir Üniversitesi Yazılım ve Bilişim Kulübü 2007 yılında günümüz teknolojisini yakından takip eden ve bilişim sektörüne ilgi duyan öğrencileri bir araya toplamak amacıyla kurulmuştur.',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
};

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    let messages;

    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <RecaptchaProvider>
                <ThemeRegistry>
                    <html lang={locale}>
                        <body>
                            <Container
                                component="main"
                                maxWidth={false}
                                disableGutters
                                sx={{ display: { xs: 'block', md: 'flex' }, minHeight: 1, bgcolor: "secondary.main" }}
                            >
                                <Stack flex={1}  >
                                    <Box
                                        position={{ xs: 'initial', md: "absolute" }}
                                        zIndex={2}
                                        px={{ xs: 4, md: 8 }}
                                        pt={{ xs: 4, md: 8 }}
                                        width={1}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <NextImage src="/logo-white.png" width={114} height={54} alt='buyabi-logo' />
                                        <LanguageSelect />
                                    </Box>

                                    {children}
                                </Stack>

                                <Box
                                    flex={1}
                                    bgcolor="primary.main"
                                    display={{ xs: 'none', md: "flex" }}
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                    gap={4}
                                >
                                    <NextImage
                                        src="/logo-white.png"
                                        alt="BAU Yazılım ve Bilişim Kulübü"
                                        priority
                                        width={389}
                                        height={145}
                                    />

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
                                </Box>
                            </Container>
                        </body>
                    </html>
                </ThemeRegistry>
            </RecaptchaProvider>
        </NextIntlClientProvider>
    );
}
