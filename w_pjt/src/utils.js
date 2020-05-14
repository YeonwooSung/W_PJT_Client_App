export function validateScreenName(screenName) {
    if (screenNameList.indexOf(screenName) >= 0)
        return true;
    return false;
}

const screenNameList = [
    'filterManagement',
    ''
]
