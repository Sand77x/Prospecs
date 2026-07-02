export const MethodType = Object.freeze({
    DEFINITION: 'definition',
    CALL: 'call',
    CHAIN: 'chain',
});

export const SemanticType = Object.freeze({
    CLASS: 'class',
    INTERFACE: 'interface',
    PARAMETERIZED_CLASS: 'parameterizedClass',
    METHOD: 'method',
    FIELD: 'field',
    VARIABLE: 'variable',
    PARAMETER: 'parameter',
    PACKAGE: 'package',
    IMPORT: 'import',
    CONSTANT: 'constant',
    ANNOTATION: 'annotation',
});

export const Context = Object.freeze({
    NORMAL: 'normal', // default
    PACKAGE: 'package',
    IMPORT: 'import',
    ANNOTATION: 'annotation',
    INTERFACE: 'interface',
});

export const Expect = Object.freeze({
    NONE: 'none',
    DECLARATION_NAME: 'declarationName',
    PARAMETER_NAME: 'parameterName',
});

export const RESERVED = new Set([
    'package',
    'import',

    'class',
    'interface',
    'record',
    'enum',

    'super',
    'this',

    'implements',
    'extends',

    'abstract',
    'public',
    'private',
    'protected',
    'static',
    'final',
    'default',
    'synchronized',
    'volatile',
    'transient',
    'native',
    'strictfp',

    'new',
    'instanceof',
    'throws',
    'throw',

    'if',
    'for',
    'else',
    'while',
    'do',
    'switch',
    'case',
    'break',

    'try',
    'catch',
    'finally',

    'return',
]);

export const PRIMITIVES = new Set([
    'int',
    'double',
    'boolean',
    'char',
    'long',
    'float',
    'byte',
    'short',
    'void',
    'var',
]);

export const LITERALS = new Set(['true', 'false', 'null']);

export const TokenType = Object.freeze({
    WHITESPACE: 'whitespace',
    RESERVED: 'reserved',
    PRIMITIVE: 'primitive',
    IDENTIFIER: 'identifier',
    LITERAL: 'literal',
    NUMBER: 'number',
    STRING: 'string',
    COMMENT: 'comment',
    SYMBOL: 'symbol',
    SEMICOLON: 'semicolon', // FIX: make symboltype?
});

export class Token {
    constructor(type, text) {
        this.type = type;
        this.text = text;

        this.semantic = null;
        this.method = null;
    }
}
