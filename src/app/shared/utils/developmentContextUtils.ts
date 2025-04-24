import { getBaseUrl } from "./urlUtils";

export class DevelopmentContextUtils {

    static isDev() {
        return getBaseUrl().includes('localhost:8080');
    }

    static isDemo() {
        return getBaseUrl() == 'https://inko-demo.onrender.com';
    }
}