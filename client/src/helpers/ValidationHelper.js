export const ValidateEmail = (email) => {
    let ragex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = email.match(ragex);
    if(valid) {
        return true;
    }
    return false;
}

export const ValidateMobile = (mobile) => {
    let ragex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = mobile.match(ragex);
    if(valid) {
        return true;
    }
    return false;
}