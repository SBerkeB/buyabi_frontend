import * as yup from 'yup';
import { capitalizeString } from './formatter/capitalize';
import { removeExtraWhiteSpaces } from './formatter/whiteSpace';

const applicationSchema = yup.object().shape({
    firstname: yup
        .string()
        .trim()
        .transform((value) =>
            value ? capitalizeString(removeExtraWhiteSpaces(value)) : value
        )
        .required('firstname-required'),

    lastname: yup
        .string()
        .trim()
        .transform((value) =>
            value ? capitalizeString(removeExtraWhiteSpaces(value)) : value
        )
        .required('lastname-required'),

    studentNumber: yup.string().trim().required('student-number-required').matches(/^(1\d|2[0-3])\d{5}$/, { message: 'invalid-student-number' }),

    email: yup.string().trim().email('invalid-email').required('email-required'),

    countryCode: yup.string().trim().required('countryCode-required'),

    phone: yup.number().required('phone-required'),

    nationality: yup.string().trim().required('nationality-required'),

    grade: yup.string().trim().required('grade-required'),

    department: yup.string().trim().required('department-required'),

});

export default applicationSchema;
