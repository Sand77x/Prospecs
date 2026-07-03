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
    TYPE_DECLARATION: 'typeDeclaration',
    PARAMETER_NAME: 'parameterName',
    METHOD_REFERENCE: 'methodRef'
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

export const TYPE_DECLARATION_KEYWORDS = new Set([
    'class',
    'interface',
    'record',
    'enum',
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

    isNull() {
        return this.type === null;
    }

    // means not useless
    // TODO: update name
    isMeaningful() {
        return (
            !this.isNull() &&
            this.type !== TokenType.WHITESPACE &&
            this.type !== TokenType.COMMENT
        );
    }

    isSymbol() {
        return (
            this.type === TokenType.SYMBOL || this.type === TokenType.SEMICOLON
        );
    }

    isIdentifier() {
        return this.type === TokenType.IDENTIFIER;
    }

    isWord() {
        return !this.isNull() && this.isMeaningful() && !this.isSymbol();
    }

    isCapitalized() {
        return /^[A-Z]/.test(this.text);
    }

    isAllCaps() {
        return /^[A-Z0-9_]{2,}$/.test(this.text);
    }

    isDot() {
        return this.text === '.';
    }

    isOpenParen() {
        return this.text === '(';
    }

    isCloseParen() {
        return this.text === ')';
    }

    isType() {
        return (
            this.type === TokenType.PRIMITIVE ||
            (this.type === TokenType.IDENTIFIER && this.isCapitalized())
        );
    }

    isLiteral() {
        return (
            this.type === TokenType.NUMBER ||
            this.type === TokenType.STRING ||
            this.type === TokenType.LITERAL
        );
    }
}
