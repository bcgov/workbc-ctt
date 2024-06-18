export const AUTOCOMPLETE_MIN_CHAR = 3
export const AUTOCOMPLETE_MIN_NUM = 1
export const KEYPRESS_DEBOUNCE = 300
export const CURRENCY_SYMBOL = '$'

export const PUBLIC_URL = process.env.GATSBY_PUBLIC_URL!
export const API_URL = process.env.GATSBY_API_URL!

export function getAutoCompleteMinimumLength(text: string): number {
    if (isNumber(text)) {
        return AUTOCOMPLETE_MIN_NUM
    }
    return AUTOCOMPLETE_MIN_CHAR
}

function isNumber(text: string) {
    return /^\d+$/.test(text)
}

export function getBackgroundImageName(noc: string):string {
    return noc + "-NOC-" + "background.png"
}

export function getProfileImageName(noc: string):string {
    return noc + "-NOC-" + "profile.png"
}

export function getUrlForDefaultProfileImage():string {
    return PUBLIC_URL + "images/WorkBC-coming-soon-profile.png"
}

export function getCareerProfileLink(noc: string) {
    return "https://www.workbc.ca/career/" + noc
}

export function getPublicUrl(): string {
    if (!!API_URL)
        return API_URL.replace('api', '')
    return PUBLIC_URL
}