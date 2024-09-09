"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateConverter = async (date) => {
    const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const dateFormatted = dateFormatter.format(date);
    return dateFormatted;
};
exports.default = dateConverter;
