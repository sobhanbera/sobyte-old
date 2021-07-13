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

export type ColorsSortingDirection = 'light-first' | 'dark-first' | 'default'
export function sortColorsBasedOnBrightness(
    colors: Array<any>,
    direction: ColorsSortingDirection = 'default',
) {
    if (direction === 'light-first')
        return colors.sort((a, b) => {
            return colorBrightness(a) - colorBrightness(b)
        })
    else
        return colors
            .sort((a, b) => {
                return colorBrightness(a) - colorBrightness(b)
            })
            .reverse()
}

export function isColorLight(color: any = '') {
    return colorBrightness(color) > 127.5
}

export function isColorDark(color: any = '') {
    return colorBrightness(color) <= 127.5
}
