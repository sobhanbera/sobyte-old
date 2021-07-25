export function colorBrightness(color: any = '') {
    let r, g, b, brightness
    if (color.match(/^rgb/)) {
        color = color.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
        )
        r = color[1]
        g = color[2]
        b = color[3]
    } else {
        color = +(
            '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
        )
        r = color >> 16
        g = (color >> 8) & 255
        b = color & 255
    }

    brightness = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
    return brightness
}

/**
 * function which converts Hex value of color to
 * HSB (hue, saturation, and brightness) format...
 */
export function hexToHSB(hex: string = ''): number[] {
    hex = hex.replace(/^#/, '')
    hex = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex

    var red = parseInt(hex.substr(0, 2), 16) / 255,
        green = parseInt(hex.substr(2, 2), 16) / 255,
        blue = parseInt(hex.substr(4, 2), 16) / 255

    var cMax = Math.max(red, green, blue),
        cMin = Math.min(red, green, blue),
        delta = cMax - cMin,
        saturation = cMax ? delta / cMax : 0

    switch (cMax) {
        case 0:
            return [0, 0, 0]
        case cMin:
            return [0, 0, cMax]
        case red:
            return [60 * (((green - blue) / delta) % 6) || 0, saturation, cMax]
        case green:
            return [60 * ((blue - red) / delta + 2) || 0, saturation, cMax]
        case blue:
            return [60 * ((red - green) / delta + 4) || 0, saturation, cMax]
        default:
            return [0, 0, 0]
    }
}

export type ColorsSortingDirection = 'light-first' | 'dark-first' | 'default'
export function sortColorsBasedOnBrightness(
    colors: Array<any>,
    direction: ColorsSortingDirection = 'default',
) {
    if (direction === 'dark-first')
        return colors
            .sort((a, b) => {
                return colorBrightness(a) - colorBrightness(b)
            })
            .reverse()
    else
        return colors.sort((a, b) => {
            return colorBrightness(a) - colorBrightness(b)
        })
}

export function sortColors(
    colors: Array<string>,
    direction: ColorsSortingDirection = 'default',
) {
    if (direction === 'dark-first')
        return colors
            .sort((a, b) => {
                const color1 = hexToHSB(a)[0]
                const color2 = hexToHSB(b)[0]
                return color1 - color2
            })
            .reverse()
    else
        return colors.sort((a, b) => {
            return hexToHSB(a)[0] - hexToHSB(b)[0]
        })
}

export function isColorLight(color: any = '') {
    return colorBrightness(color) > 127.5
}

export function isColorDark(color: any = '') {
    return colorBrightness(color) <= 127.5
}
