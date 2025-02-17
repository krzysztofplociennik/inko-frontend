import { environment } from "src/environment/environment";

export function getBaseUrl(): string {
    return environment.baseUrl;
}