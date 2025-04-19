export class JwtUtils {

    static parseJwt(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            return {};
        }
    }

    static isTokenCloseToExpiring(expirationDate: Date | null): boolean {
        if (!expirationDate) {
            return false;
        }
        const timeRemainingUntilExpire = expirationDate.getTime() - new Date().getTime();
        const fiveMinutes = 5 * 60 * 1000;
        return timeRemainingUntilExpire < fiveMinutes;
    }

    static fetchExpirationDate(tokenPayload: any) {
        if (tokenPayload.exp) {
            return new Date(tokenPayload.exp * 1000);
        }
        return null;
    }

    static hasTokenExpired(expirationDate: Date | null): boolean {
        if (expirationDate) {
            const now = new Date();
            return expirationDate <= now;
        }
        return false;
    }
}