export const formatUnit = (unit) => {
    switch (unit) {
        case "KILOGRAM":
            return "kg"
        case "PERCENT":
            return "%"
        case "KILOCALORIE":
            return "kcal"
        case "CENTIMETER":
            return "cm"
        default:
            return ""
    }
}