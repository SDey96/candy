/**
 * Formats a date
 * @param format
 * @param date
 * @param locales
 * @returns {*}
 */
export function formatDate(format, date = Date.now(), locales = 'en-us') {

    if (typeof date === 'number') {
        date = new Date(date);
    }

    // Validate date
    if (!(date instanceof Date) || isNaN(date)) {
        return 'Invalid date';
    }

    const pad = (v, a = 2) => String(v).padStart(a, '0');
    const getLocal = (name, type) => date.toLocaleString(locales, {[name]: type});

    const strMap = {
        'HH': pad(date.getHours()),
        'mm': pad(date.getMinutes()),
        'ss': pad(date.getSeconds()),
        'x': date.getTime(),
        'SSS': pad(date.getMilliseconds(), 4),
        'YYYY': pad(date.getFullYear(), 4),
        'MMMM': getLocal('month', 'long'),
        'MMM': getLocal('month', 'short'),
        'MM': pad(date.getMonth()),
        'M': getLocal('month', 'narrow'),
        'DDDD': getLocal('weekday', 'long'),
        'DDD': getLocal('weekday', 'short'),
        'DD': pad(date.getDate()),
        'D': getLocal('weekday', 'narrow')
    };

    return format.replace(
        new RegExp(Object.keys(strMap).join('|'), 'g'),
        match => strMap[match] || ''
    );
}

/**
 * Formats a duration specified in seconds
 * @param duration
 * @returns {string}
 */
export function formatSeconds(duration = 0) {
    return [
        Math.floor(duration / 3600),
        Math.floor(duration / 60),
        duration % 60
    ].map(v => v ? String(v).padStart(2, '0') : 0).filter(Boolean).join(':');
}