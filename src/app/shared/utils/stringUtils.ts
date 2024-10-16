export class StringUtils {

    static loseCaps(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
}