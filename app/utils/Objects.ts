export function returnNullCallback(nullableValue: any, defaultValue: any): any {
    return !nullableValue ||
        nullableValue === null ||
        nullableValue === undefined
        ? defaultValue
        : nullableValue
}
