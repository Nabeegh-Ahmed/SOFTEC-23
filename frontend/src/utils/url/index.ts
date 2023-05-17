export const joinURL = (baseURL: string, relativeURL?: string): string => {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}