export const convertDate = date => {
    if (!date) {
        return null;
    }

    const [yy, mm, dd] = date.toISOString().split('T')[0].split('-');
    return `${dd}-${mm}-${yy}`;
};

export const convertToJsDate = date => {
    return new Date(String(date).replace(/-/g,"/"));
};

export const convertToSqlDate = date => {
    return date ? date.toISOString().slice(0, 19).replace('T', ' ') : null;
};