export class SleepUtils {
    static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static sleepInSeconds(seconds: number) {
        return this.sleep(seconds * 1000);
    }
    
    static sleepInMinutes(minutes: number) {
        return this.sleepInSeconds(minutes * 60);
    }
}