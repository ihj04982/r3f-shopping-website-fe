import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            50: "#f8f9fa",
            100: "#f1f3f4",
            200: "#e8eaed",
            300: "#dadce0",
            400: "#bdc1c6",
            500: "#9aa0a6",
            600: "#80868b",
            700: "#5f6368",
            800: "#3c4043",
            900: "#202124",
            main: "#9aa0a6",
            light: "#bdc1c6",
            dark: "#5f6368",
            contrastText: "#ffffff",
        },
        grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#e5e5e5",
            300: "#d4d4d4",
            400: "#a3a3a3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
        },
        background: {
            default: "#ffffff",
            paper: "#f8f9fa",
        },
        text: {
            primary: "#202124",
            secondary: "#5f6368",
        },
        divider: "#e8eaed",
    },

    typography: {
        fontFamily: ["Noto Sans KR", "Oswald", "Arial", "Dotum", "Gulim", "sans-serif"].join(","),

        h1: {
            fontSize: "2.5rem",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#202124",
            fontFamily: ["Oswald", "Noto Sans KR", "Arial", "sans-serif"].join(","),
            "&:lang(ko)": {
                fontWeight: 900,
                letterSpacing: "-0.01em",
            },
        },

        h2: {
            fontSize: "2rem",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "#202124",
            fontFamily: ["Oswald", "Noto Sans KR", "Arial", "sans-serif"].join(","),
            "&:lang(ko)": {
                fontWeight: 700,
                letterSpacing: "0",
            },
        },

        h3: {
            fontSize: "1.75rem",
            fontWeight: 700,
            lineHeight: 1.25,
            color: "#202124",
            fontFamily: ["Noto Sans KR", "Oswald", "Arial", "sans-serif"].join(","),
        },

        h4: {
            fontSize: "1.375rem",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#202124",
            fontFamily: ["Noto Sans KR", "Oswald", "Arial", "sans-serif"].join(","),
        },

        h5: {
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: 1.4,
            color: "#202124",
            fontFamily: ["Noto Sans KR", "Oswald", "Arial", "sans-serif"].join(","),
        },

        h6: {
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.4,
            color: "#202124",
            fontFamily: ["Noto Sans KR", "Oswald", "Arial", "sans-serif"].join(","),
        },

        subtitle1: {
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            color: "#5f6368",
            fontFamily: ["Noto Sans KR", "Arial", "sans-serif"].join(","),
        },

        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: 1.5,
            color: "#5f6368",
            fontFamily: ["Noto Sans KR", "Arial", "sans-serif"].join(","),
        },

        body1: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "#202124",
            fontFamily: ["Noto Sans KR", "Arial", "sans-serif"].join(","),
        },

        body2: {
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "#5f6368",
            fontFamily: ["Noto Sans KR", "Arial", "sans-serif"].join(","),
        },

        button: {
            fontSize: "0.875rem",
            fontWeight: 500,
            textTransform: "none",
            letterSpacing: "0.025em",
            fontFamily: ["Noto Sans KR", "Arial", "sans-serif"].join(","),
        },

        caption: {
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#80868b",
            fontFamily: ["Noto Sans KR", "Arial", "sans-serif"].join(","),
        },

        overline: {
            fontSize: "0.75rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#80868b",
            fontFamily: ["Oswald", "Noto Sans KR", "Arial", "sans-serif"].join(","),
        },
    },

    spacing: 8,
    shape: {
        borderRadius: 6,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },

    shadows: [
        "none",
        "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "4.5px 4.5px 0px 0px rgba(32, 33, 36, 0.16)",
        "4.5px 4.5px 0px 0px rgba(32, 33, 36, 0.32), 4.5px 1px 2px -1px rgba(32, 33, 36, 0.32)",
        "4.5px 4.5px 0px 0px rgba(32, 33, 36, 0.32), 4.5px 2px 4px -1px rgba(32, 33, 36, 0.32)",
        "4.5px 4.5px 0px 0px rgba(32, 33, 36, 0.32), 4.5px 4px 6px -1px rgba(32, 33, 36, 0.32)",
        "4.5px 4.5px 0px 0px rgba(32, 33, 36, 0.32), 4.5px 8px 10px -1px rgba(32, 33, 36, 0.32)",
        "4.5px 4.5px 0px 0px rgba(32, 33, 36, 0.8)",
        "0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08)",
        "0 0 8px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08)",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
        "none",
    ],

    transitions: {
        easing: {
            easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            easeOut: "cubic-bezier(0, 0, 0.2, 1)",
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
        },
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    background-color: #ffffff;
                    color: #202124;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    font-family: 'Noto Sans KR', 'Oswald', Arial, Dotum, Gulim, sans-serif;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #f1f3f4;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #dadce0;
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #bdc1c6;
                }
            `,
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableRipple: false,
            },
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    textTransform: "none",
                    fontWeight: 500,
                    padding: "10px 20px",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.025em",
                    transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                    border: "1px solid transparent",
                    minHeight: "40px",
                    fontFamily: "'Noto Sans KR', Arial, sans-serif",
                    "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    },
                },
                contained: {
                    backgroundColor: "#202124",
                    color: "#ffffff",
                    border: "1px solid #202124",
                    "&:hover": {
                        backgroundColor: "#404040",
                        borderColor: "#404040",
                    },
                },
                outlined: {
                    backgroundColor: "transparent",
                    color: "#202124",
                    border: "1px solid #202124",
                    "&:hover": {
                        backgroundColor: "#202124",
                        color: "#ffffff",
                    },
                },
                text: {
                    backgroundColor: "transparent",
                    color: "#202124",
                    border: "1px solid transparent",
                    "&:hover": {
                        backgroundColor: "#f1f3f4",
                    },
                },
                sizeSmall: {
                    padding: "6px 12px",
                    fontSize: "0.75rem",
                    minHeight: "32px",
                },
                sizeLarge: {
                    padding: "14px 28px",
                    fontSize: "1rem",
                    minHeight: "48px",
                },
            },
        },

        // 카드 최적화
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    border: "1px solid #e8eaed",
                },
            },
        },

        // 텍스트 필드 최적화
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 6,
                        backgroundColor: "#ffffff",
                        border: "1px solid #dadce0",
                        transition: "all 200ms ease",
                        fontFamily: "'Noto Sans KR', Arial, sans-serif",
                        "& fieldset": {
                            border: "none",
                        },
                        "&:hover fieldset": {
                            border: "none",
                        },
                        "&.Mui-focused fieldset": {
                            border: "none",
                        },
                        "&:hover": {
                            borderColor: "#202124",
                        },
                        "&.Mui-focused": {
                            borderColor: "#202124",
                            boxShadow: "0 0 0 2px rgba(32, 33, 36, 0.1)",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#5f6368",
                        fontFamily: "'Noto Sans KR', Arial, sans-serif",
                        "&.Mui-focused": {
                            color: "#202124",
                        },
                    },
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    color: "#202124",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    borderRadius: 6,
                },
            },
        },

        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 500,
                    fontFamily: "'Noto Sans KR', Arial, sans-serif",
                },
            },
        },

        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 500,
                    fontFamily: "'Noto Sans KR', Arial, sans-serif",
                },
            },
        },
    },

    custom: {
        typography: {
            brandTitle: {
                fontFamily: "'Oswald', 'Noto Sans KR', Arial, sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
            },
            koreanTitle: {
                fontFamily: "'Noto Sans KR', Arial, sans-serif",
                fontWeight: 900,
                letterSpacing: "-0.01em",
            },
            body: {
                fontFamily: "'Noto Sans KR', Arial, sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
            },
            ui: {
                fontFamily: "'Noto Sans KR', Arial, sans-serif",
                fontWeight: 500,
            },
        },

        gradients: {
            primary: "linear-gradient(135deg, #202124 0%, #404040 100%)",
            secondary: "linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%)",
            hero: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
            text: {
                primary: "linear-gradient(to right, #202124, #404040, #202124)",
                white: "linear-gradient(to right, #ffffff, #e5e7eb, #ffffff)",
                fade: "linear-gradient(to right, transparent, #202124, transparent)",
            },
            background: {
                subtle: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                dark: "linear-gradient(135deg, #202124 0%, #404040 100%)",
                overlay: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
            },
        },

        zIndex: {
            hide: -1,
            auto: "auto",
            base: 0,
            docked: 10,
            dropdown: 1000,
            sticky: 1100,
            banner: 1200,
            overlay: 1300,
            modal: 1400,
            popover: 1500,
            skipLink: 1600,
            toast: 1700,
            tooltip: 1800,
        },
    },
});

export default theme;
