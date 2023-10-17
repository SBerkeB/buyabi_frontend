import { Components, Theme } from '@mui/material';

const components: Components<Omit<Theme, 'components'>> = {
    MuiTextField: {
        styleOverrides: {
            root: (props: { theme: Theme }) => ({
                /*
                 * This is a hack to override user agent's default styles on autofill
                 */
                '.MuiInputBase-input:-webkit-autofill, .MuiInputBase-input:-webkit-autofill:hover, .MuiInputBase-input:-webkit-autofill:focus, .MuiInputBase-input:-webkit-autofill:active':
                {
                    WebkitBackgroundClip: 'text',
                    boxShadow: 'inset 0 0 20px 20px transparent',
                    transition: 'background-color 5000s ease-in-out 0s',
                },




            })
        },
    },

    MuiInputBase: {
        styleOverrides: {
            root: (props: { theme: Theme }) => ({
                fontSize: '0.875rem',
                borderRadius: '0.375rem!important',
                color: props.theme.palette.tertiary.main,

                fieldset: {
                    borderColor: props.theme.palette.tertiary.main + '30',
                },

                '.MuiSvgIcon-root': {
                    color: props.theme.palette.tertiary.main + '60',
                },

                '&:not(.Mui-focused):hover': {
                    fieldset: { borderColor: props.theme.palette.tertiary.main + '60' }
                }
            })
        }
    },

    MuiInputLabel: {
        styleOverrides: {
            root: (props: { theme: Theme }) => ({
                fontSize: '0.875rem',
                color: props.theme.palette.tertiary.main,
            })
        }
    },

    MuiButton: {
        defaultProps: {
            disableElevation: true,
            variant: 'contained',
            color: 'primary',
        },

        styleOverrides: {
            root: {
                borderRadius: '0.375rem',
                textTransform: 'initial'
            }
        }
    }
}

export default components;