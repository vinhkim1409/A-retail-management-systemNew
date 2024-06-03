import numeral from "numeral"

export const getPriceExpr = (price, discount = 0) => {
    if (price == 0) return "0";
    return numeral(price - price * discount / 100).format("0.0")
}