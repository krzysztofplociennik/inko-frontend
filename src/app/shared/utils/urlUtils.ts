export function getBaseUrl(): string {
    const config = (window as any).config;
    return config.apiUrl;
}