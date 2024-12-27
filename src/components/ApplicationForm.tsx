'use client'

import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, Modal, Paper, Select, TextField, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocale, useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import applicationSchema from '@/utils/application';
import CountryCodeSelect from './elements/CountryCodeSelect';
import { InferType } from 'yup';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const departments = [
    "computer-eng",
    "biomedical-eng",
    "electiral-and-electronics-eng",
    "industry-eng",
    "energy-systems-eng",
    "civil-eng",
    "management-eng",
    "mathematics",
    "mechatronics-eng",
    "moleculer-biology-and-genetics",
    "artificial-intelligenc",
    "software-eng",
    "cartoon-and-animation",
    "digital-game-design",
    "communication-and-design",
    "public-relations-and-publicity",
    "advertising",
    "film-and-television",
    "new-media",
    "photography",
    "american-culture-and-literature",
    "european-union-relations",
    "economics",
    "economics-and-finance",
    "business-administration",
    "logistic-management",
    "political-science-and-international-relations",
    "international-finance",
    "international-trade",
    "sociology",
    "psychology",
    "translation-and-interpreting",
    "architecture",
    "interior-architecture-and-environmental-design",
    "industrial-design",
    "nutrition-and-dietetics",
    "speech-and-language-therapy",
    "physiotherapy-and-rehabilitation",
    "nursing",
    "medical-school",
    "conservartory",
    "law-school",
    "psychological-counseling-and-guidance",
    "preschool-education",
    "english-language-teaching",
    "computer-education-and-instructional-technologies",
    "pharmaceutics",
    "dentisry",
];

type ApplicationFormProps = {
    setFormStep: Dispatch<SetStateAction<number>>
}

const ApplicationForm = ({ setFormStep }: ApplicationFormProps) => {
    const t = useTranslations();
    const locale = useLocale();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            studentNumber: '',
            email: '',
            countryCode: '+90',
            phone: undefined,
            nationality: '',
            grade: '',
            department: ''
        },
        resolver: yupResolver(applicationSchema),
    });

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data: InferType<typeof applicationSchema>) => {
        setLoading(true);
        try {
            if (!executeRecaptcha) {
                throw new Error('Recaptcha not initialized');
            }

            const recaptchaToken = await executeRecaptcha('application_form');

            const transformedData = {
                ...data,
                phone: `${data.countryCode}${data.phone}`,
                recaptchaToken
            }
            console.log("transformedData");
            const response = await fetch(`${process.env.SITE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transformedData)
            });

            const result = await response.json();

            if (result.success) {
                setFormStep(1);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            component="form"
            maxWidth="28rem"
            autoComplete='off'
            spellCheck
            onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
        >
            <Typography variant="h6" component="h1" color="primary" textAlign="center" gutterBottom>
                {t('ApplicationForm.title')}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="firstname"
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <TextField
                                {...field}
                                color='primary'
                                error={!!error}
                                helperText={error?.message && t(`ApplicationForm.${error?.message}`)}
                                label={t('ApplicationForm.firstname')}
                                fullWidth
                                sx={{ input: { textTransform: "capitalize" } }}
                            />}
                    />
                </Grid>


                <Grid item xs={12} md={6}>
                    <Controller
                        name="lastname"
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <TextField
                                {...field}
                                error={!!error}
                                helperText={error?.message && t(`ApplicationForm.${error?.message}`)}
                                label={t('ApplicationForm.lastname')}
                                fullWidth
                                sx={{ input: { textTransform: "capitalize" } }}
                            />}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="studentNumber"
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <TextField {...field} inputProps={{ maxLength: 7 }} error={!!error} helperText={error?.message && t(`ApplicationForm.${error?.message}`)} label={t('ApplicationForm.student-number')} fullWidth />}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <TextField
                                {...field}
                                type='email'
                                error={!!error}
                                helperText={error?.message && t(`ApplicationForm.${error?.message}`)}
                                label={t('ApplicationForm.email')}
                                fullWidth
                            />}
                    />
                </Grid>

                <Grid item xs={12} md={6} display="flex">
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <TextField
                                {...field}
                                type='tel'
                                fullWidth
                                label={t('ApplicationForm.phone')}
                                placeholder='5XXXXXXXXX'
                                error={!!error}
                                helperText={error?.message && t(`ApplicationForm.${error?.message}`)}
                                sx={{ flex: '1 1 66%' }}
                                InputProps={{
                                    startAdornment:
                                        <Controller
                                            name="countryCode"
                                            control={control}
                                            render={({ field, fieldState: { error } }) =>
                                                <CountryCodeSelect {...field} />
                                            }
                                        />
                                }}
                            />}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="nationality"
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <FormControl fullWidth error={!!error}>
                                <InputLabel id="nationality-select">{t('ApplicationForm.nationality')}</InputLabel>

                                <Select {...field} labelId='nationality-select' label={t('ApplicationForm.nationality')} native>
                                    <option value="" disabled hidden></option>
                                    <option value="tr">{t('ApplicationForm.tr')}</option>
                                    <option value="int">{t('ApplicationForm.int')}</option>
                                </Select>

                                {error?.message && <FormHelperText>{t(`ApplicationForm.${error?.message}`)}</FormHelperText>}
                            </FormControl>
                        }
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="department"
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <FormControl error={!!error} fullWidth>
                                <InputLabel id="grade-select">{t('ApplicationForm.department')}</InputLabel>

                                <Select {...field} native label={t('ApplicationForm.department')} >
                                    <option value="" disabled hidden></option>
                                    {departments
                                        .sort((a, b) => t(`Departments.${a}`).localeCompare(t(`Departments.${b}`), locale))
                                        .map(department =>
                                            <option key={department} value={department}>{t(`Departments.${department}`)}</option>
                                        )}
                                </Select>

                                {error?.message && <FormHelperText>{t(`ApplicationForm.${error?.message}`)}</FormHelperText>}
                            </FormControl>
                        }
                    />

                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name='grade'
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <FormControl fullWidth error={!!error}>
                                <InputLabel id="academic-year-select">{t('ApplicationForm.academic-year')}</InputLabel>

                                <Select {...field} labelId='grade-select' label={t('ApplicationForm.academic-year')} native>
                                    <option value="" disabled hidden></option>
                                    <option value={0}>{t('ApplicationForm.prep')}</option>
                                    <option value={1}>{t('ApplicationForm.grade-1')}</option>
                                    <option value={2}>{t('ApplicationForm.grade-2')}</option>
                                    <option value={3}>{t('ApplicationForm.grade-3')}</option>
                                    <option value={4}>{t('ApplicationForm.grade-4')}</option>
                                </Select>

                                {error?.message && <FormHelperText>{t(`ApplicationForm.${error?.message}`)}</FormHelperText>}
                            </FormControl>
                        }
                    />
                </Grid>
{/* 
                <Grid item xs={12}>
                    <Controller
                        name='legalNotice'
                        control={control}
                        render={({ field, fieldState: { error } }) =>
                            <FormControl error={!!error}>
                                <FormControlLabel
                                    control={<Checkbox {...field} color="tertiary" />}
                                    label={t.rich('ApplicationForm.legal-notice', { button: (chunks) => <Button variant="text" onClick={() => setOpen(true)} sx={{ p: 0, lineHeight: 2 }}>{chunks}</Button> })}
                                    color="primary"
                                    slotProps={{
                                        typography: {
                                            variant: 'body2',
                                            color: 'tertiary.main'
                                        }
                                    }}
                                />

                                {error?.message && <FormHelperText>{t(`ApplicationForm.${error?.message}`)}</FormHelperText>}
                            </FormControl>
                        }
                    />
                </Grid> */}

                <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button type="submit" fullWidth disabled={loading}>
                        {t('ApplicationForm.submit')}
                    </Button>
                </Grid>
            </Grid>

            <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={0} sx={{ maxWidth: 900, width: 1, minHeight: 400, height: '60vh', padding: 4, overflowY: 'auto', 'p': { textAlign: 'justify' } }}>
                    <h1>Kişisel Verilere İlişkin Aydınlatma Metni</h1>

                    <br />

                    <p><strong>Veri Sorumlusu</strong> : Bahçeşehir Üniversitesi Yazılım ve Bilişim Kulübü
                        Yıldız, Çırağan Cd., 34349 Beşiktaş/İstanbul, Türkiye
                    </p>

                    <br />

                    <p>Biz, Bahçeşehir Üniversitesi Yazılım ve Bilişim Kulübü olarak; Kulüp üyelerimizin uhdemizde bulunan kişisel verilerinin Türkiye Cumhuriyeti Anayasası ve insan haklarına ilişkin ülkemizin taraf olduğu uluslararası sözleşmeler ile 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) başta olmak üzere ilgili mevzuat çerçevesinde; güvence altına alınması ve işlenmesi konusuna hassasiyetle yaklaşmaktayız.</p>

                    <br />

                    <p>Bu çerçevede, KVKK kapsamında Veri sorumlusu sıfatıyla sizleri aydınlatmak istiyoruz.</p>

                    <br />

                    <p>Kulübümüz ile kulüp üyesi sıfatı ile paylaştığınız kişisel verileriniz KVKK’ya uygun şekilde, faaliyet ve hizmet amaçlarımız ile bağlantılı ve ölçülü olarak işlenebilecek, gerektiği zaman kulübümüzün faaliyetlerinin amacına uygun olarak üçüncü kişilere aktarılabilecek, saklanabilecek, kullanılabilecek ve sınıflandırılabilecektir</p>

                    <br />

                    <h2>Kişisel Verilerinizin İşlenme Amacı</h2>

                    <br />

                    <p>Kişisel verileriniz;</p>

                    <br />

                    <ol>
                        <li>Hukuka ve dürüstlük kuralının öngördüğü biçimde,</li>
                        <li>İşlenme amaçları ile bağlantılı, sınırlı ve ölçülü olarak,</li>
                        <li>Doğru ve güncel olarak,</li>
                        <li>Belirli açık ve meşru amaçlar ile </li>
                    </ol>

                    <br />

                    <p>İşlenecektir. </p>

                    <br />

                    <p>Veri sorumlusu olarak kulübümüz tarafından kişisel verileriniz, yıllardır süren kalitemizden ödün vermeden, sizleri daha iyi tanıyarak ihtiyaçlarınızı anlamak, isteklerinize daha hızlı cevap verebilmek ve sizlerle olan iletişimimizi geliştirerek sizlere daha iyi hizmet vermek amacıyla işlenecektir.</p>

                    <br />

                    <p>6698 Kişisel Verilerin Korunması Mevzuatı Uyarınca Ziyaretçi Aydınlatma Metni okudum ve Anladım</p>
                </Paper>
            </Modal>
        </Box >
    )
}

export default ApplicationForm