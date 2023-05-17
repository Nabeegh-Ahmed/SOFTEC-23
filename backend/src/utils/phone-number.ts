export const toCountryCodeAndNumber = (phoneNumber: string, delim: string = "-") => {
    const parts = phoneNumber.split(delim);
    const countryCode = parts[0];
    const number = parts[1];
    return {
        countryCode,
        number,
    };
};