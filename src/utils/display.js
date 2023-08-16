export function displayValue(value = '') {
    if (!value)
        return value
    if (value.startsWith('0x'))
        return value.slice(0, 8) + '...' + value.slice(-6)
    return value
}
