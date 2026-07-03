import { SemanticType, TokenType, MethodType } from './types.js';

export const SemanticColors = new Map([
    [SemanticType.CLASS, { color: '#33cccc', bold: false, italic: false }],
    [SemanticType.INTERFACE, { color: '#a9b7c6', bold: false, italic: false }],
    [
        SemanticType.PARAMETERIZED_CLASS,
        { color: '#a9b7c6', bold: false, italic: false },
    ],
    [SemanticType.METHOD, { color: '#ffffff', bold: false, italic: false }],
    [SemanticType.FIELD, { color: '#f59762', bold: false, italic: true }],
    [SemanticType.VARIABLE, { color: '#f59762', bold: false, italic: false }],
    [SemanticType.PARAMETER, { color: '#a9b7c6', bold: false, italic: false }],
    [SemanticType.PACKAGE, { color: '#a9b7c6', bold: false, italic: false }],
    [SemanticType.IMPORT, { color: '#a9b7c6', bold: false, italic: false }],
    [SemanticType.CONSTANT, { color: '#B1B1BA', bold: false, italic: true }],
    [SemanticType.ANNOTATION, { color: '#b5bd68', bold: false, italic: false }],
]);

export const TokenColors = new Map([
    [TokenType.WHITESPACE, { color: '#ffffff', bold: false, italic: false }],
    [TokenType.RESERVED, { color: '#cc6666', bold: false, italic: false }],
    [TokenType.PRIMITIVE, { color: '#cc6666', bold: false, italic: false }],
    [TokenType.IDENTIFIER, { color: '#000000', bold: false, italic: false }],
    [TokenType.LITERAL, { color: '#cc6666', bold: false, italic: false }],
    [TokenType.NUMBER, { color: '#6897bb', bold: false, italic: false }],
    [TokenType.STRING, { color: '#f0c674', bold: false, italic: false }],
    [TokenType.COMMENT, { color: '#808080', bold: false, italic: true }],
    [TokenType.SYMBOL, { color: '#a9b7c6', bold: false, italic: false }],
    [TokenType.SEMICOLON, { color: '#f0c674', bold: false, italic: false }],
]);

export const MethodColors = new Map([
    [MethodType.DEFINITION, { color: '#ffc66d', bold: false, italic: false }],
    [MethodType.CALL, { color: '#a9b7c6', bold: false, italic: false }],
    [MethodType.CHAIN, { color: '#b5bd68', bold: false, italic: false }],
]);
