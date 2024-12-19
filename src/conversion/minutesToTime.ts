export function minutesToTime(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}`;
}
