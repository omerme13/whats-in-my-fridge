export const convertDate = (date, areAmericanUnits, isLong) => {
    if (!date) {
        return null;
    }
    
    const [yy, mm, dd] = date.toISOString().split('T')[0].split('-');

    if (isLong) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

        return `${+dd} ${months[mm - 1]} ${yy}`;

    }
    if (areAmericanUnits) {
        return `${mm}-${dd}-${yy}`;
    }

    return `${dd}-${mm}-${yy}`;
};

export const convertToJsDate = date => {
    return new Date(String(date).replace(/-/g,"/"));
};

export const convertToSqlDate = date => {
    return date ? date.toISOString().slice(0, 19).replace('T', ' ') : null;
};

export const shortenString = (str, chars) => {
    return str.length > chars ? str.slice(0,chars) + '...' : str;
}

export const roundDecimal = (number, by = 1) => {
    if (isNaN(number)) {
        return '';
    }
    
    return number % 1 === 0 ? number : (+number).toFixed(by);
};

export const getIncDecResult = (quantity, operator, unit) => {
    if ((quantity === 1 || quantity <= 0.1) && operator !== '+') {
        return null;
    }

    let op = operator === '+' ? 1 : -1;
    let result = +quantity + op;
    
    if (unit === 'KG' || unit === 'LBS') {
        op = op * 0.1;
        result = (+quantity + op).toFixed(1)
    }

    return result;
}