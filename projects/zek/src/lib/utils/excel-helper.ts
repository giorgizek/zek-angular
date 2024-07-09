export class ExcelHelper {
    static getColumnName(columnNumber: number) {
        let dividend = columnNumber;
        let columnName = '';

        while (dividend > 0) {
            const modulo = Math.floor((dividend - 1) % 26);           
            columnName = String.fromCharCode(65 + modulo) + columnName;
            dividend = Math.floor((dividend - modulo) / 26);
        }
        return columnName;
    }
}