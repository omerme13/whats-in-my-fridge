import { colors } from '../../utils/variables';

export const navOptions = {
    headerStyle: {
        backgroundColor: colors.primary
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        letterSpacing: 1,
        textTransform: 'capitalize',
        fontFamily: 'lato-bold',
        fontWeight: null /* in order to let the font family work */
    }
};

export const tabOptions = {
    activeTintColor: colors.secondary,
    labelStyle: {
        fontSize: 12,
        fontFamily: 'lato-bold'
    }
};