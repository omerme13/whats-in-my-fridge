export const convertDate = expiryDate => {
    if (!expiryDate) {
        return null;
    }

    const [mm, dd, yy] = expiryDate.toLocaleDateString().split('/');
    return `${dd}-${mm}-${yy}`;
};
