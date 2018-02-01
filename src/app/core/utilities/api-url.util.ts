import { startsWith } from 'lodash';
import { environment } from 'environments/environment';

export function getApiUrlUtil(url: string): string {
    const isFullUrl = startsWith(url, 'http://') || startsWith(url, 'https://') || startsWith(url, '//');

    return isFullUrl ? url : `${environment.APP.API_HOST}${url}`;
}
