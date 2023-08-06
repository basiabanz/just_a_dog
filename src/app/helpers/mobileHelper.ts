export class mobileHelper {
    public static isMobile(): boolean {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
}
