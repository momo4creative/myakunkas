export function formatDistanceDateFromNow(value: string | Date) {
    const rtf = new Intl.RelativeTimeFormat('id', { numeric: 'auto' })
    const dateValue = new Date(value).getTime()
    const dateNow = new Date().getTime()

    const secondsDiff = Math.round((dateValue - dateNow) / 1000);
    const unitsInSec = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
    const unitStrings: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];
    const unitIndex = unitsInSec.findIndex((cutoff) => cutoff > Math.abs(secondsDiff));
    const divisor = unitIndex ? unitsInSec[unitIndex - 1] : 1;
    const relativeTime = rtf.format(Math.floor(secondsDiff / divisor), unitStrings[unitIndex]);

    return relativeTime
}

export function formatRupiah(value: number) {
    return new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(value)
}

export function formatDateInput(value: string | Date) {
    return new Intl.DateTimeFormat('fr-CA').format(new Date(value))
}