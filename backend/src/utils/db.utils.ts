export const formatExcludedFields = <T>(excludedFields: (keyof T)[]) => {
    return excludedFields.map((field) => `-${field as string}`);
}