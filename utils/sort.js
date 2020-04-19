export const sortObjects = (objArr, value, direction = 1) => {
    if (!value) {
        return;
    }
    
    if (typeof(objArr[0][value]) === 'string') {
        objArr.sort((a, b) => {
            const valueA = a[value].toLowerCase();
            const valueB = b[value].toLowerCase();

            if (valueA < valueB) {
                return -1 * direction;
            }
            if (valueA > valueB) {
                return 1 * direction;
            }

            return 0;
        });
    } else {
        objArr.sort((a, b) => (a[value] - b[value]) * direction);
    }
};
