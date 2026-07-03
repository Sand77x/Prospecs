import {
    MethodType,
    TokenType,
    SemanticType,
    Context,
    Expect,
    Token,
    TYPE_DECLARATION_KEYWORDS,
} from './types.js';

// TODO:
// color parameters used as gray (via symbol table)
// implement "expectType" for type contexts and leave the rest to variable / constants (better)
// implement method references (field)
// exception throws
// should super / this be same color as constructor? (special color)
// make inClass or inMethod flags (for fields vs local vars)

export class Classifier {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;

        // state
        this.context = Context.NORMAL;
        this.resetExpectations();
        this.inParameterList = false;

        // record
        this.inFieldParameterList = false;
    }

    peek() {
        return this.tokens[this.pos];
    }

    peekNext() {
        if (this.pos + 1 >= this.tokens.length) {
            return null;
        }
        return this.tokens[this.pos + 1];
    }

    peekNextMeaningful(skip = 0) {
        let idx = this.pos;
        while (idx < this.tokens.length) {
            if (!this.tokens[idx].isMeaningful()) {
                idx++;
                continue;
            }
            if (skip > 0) {
                skip--;
                idx++;
                continue;
            }
            return this.tokens[idx];
        }
        return new Token(null, null);
    }

    peekPreviousMeaningful() {
        let idx = this.pos - 2;
        while (idx >= 0) {
            if (!this.tokens[idx].isMeaningful()) {
                idx--;
                continue;
            }
            return this.tokens[idx];
        }
        return new Token(null, null);
    }

    next() {
        return this.tokens[this.pos++];
    }

    eof() {
        return this.pos >= this.tokens.length;
    }

    classify() {
        while (!this.eof()) {
            const token = this.next();
            const text = token.text;
            const type = token.type;

            const next = this.peekNextMeaningful();
            const prev = this.peekPreviousMeaningful();

            // follow context

            switch (this.context) {
                case Context.PACKAGE:
                    if (token.isIdentifier())
                        token.semantic = SemanticType.PACKAGE;
                    break;

                case Context.IMPORT:
                    if (token.isIdentifier())
                        token.semantic = SemanticType.IMPORT;
                    break;

                case Context.INTERFACE:
                    if (token.isIdentifier())
                        token.semantic = SemanticType.INTERFACE;
                    break;

                case Context.ANNOTATION:
                    if (
                        token.isIdentifier() &&
                        (prev.isDot() || prev.text === '@')
                    ) {
                        token.semantic = SemanticType.ANNOTATION;
                    } else if (token.isOpenParen()) {
                        this.inParameterList = true;
                        this.Context = Context.NORMAL;

                        if (next.isIdentifier() && !next.isType()) {
                            this.expect = Expect.PARAMETER_NAME;
                        }
                    } else {
                        this.Context = Context.NORMAL;
                    }
                    break;
            }

            if (token.semantic != null) continue;

            // follow expects

            if (token.isIdentifier()) {
                if (this.expect === Expect.METHOD_REFERENCE) {
                    token.semantic = SemanticType.METHOD;
                    token.method = MethodType.DEFINITION;
                    this.resetExpectations();
                } else if (this.expect === Expect.PARAMETER_NAME) {
                    if (this.inParameterList) {
                        token.semantic = SemanticType.PARAMETER;
                    } else if (this.inFieldParameterList) {
                        token.semantic = SemanticType.FIELD;
                    }
                    this.resetExpectations();
                } else if (this.expect === Expect.TYPE_DECLARATION) {
                    if (!token.isCapitalized()) {
                        token.semantic = SemanticType.FIELD;
                    } else {
                        token.semantic =
                            next.text === '<'
                                ? SemanticType.PARAMETERIZED_CLASS
                                : SemanticType.CLASS;
                    }
                    this.resetExpectations();
                }
            }

            // switch context

            if (text === 'package') {
                this.context = Context.PACKAGE;
                this.resetExpectations();
            } else if (text === 'import') {
                this.context = Context.IMPORT;
                this.resetExpectations();
            } else if (text === 'implements' || text === 'extends') {
                this.context = Context.INTERFACE;
                this.resetExpectations();
            } else if (text === ';' || text === '{' || text === '}') {
                this.context = Context.NORMAL;
                this.resetExpectations();
            } else if (text === '@') {
                this.context = Context.ANNOTATION;
                this.resetExpectations();
            } else if (text === ':' && prev.text === ':') {
                this.expect = Expect.METHOD_REFERENCE;
            } else if (type === TokenType.COMMENT) {
                this.context = Context.NORMAL;
                this.resetExpectations();
            } else if (TYPE_DECLARATION_KEYWORDS.has(token.text)) {
                this.expect = Expect.TYPE_DECLARATION;
            } else if (token.isType()) {
                if (next.isDot()) {
                    // for qualified expressions
                    this.resetExpectations();
                } else if (
                    token.isType() &&
                    (this.inParameterList || this.inFieldParameterList)
                ) {
                    this.expect = Expect.PARAMETER_NAME;
                }
            } else if (token.isCloseParen()) {
                this.inFieldParameterList = false;
                this.inParameterList = false;
            }

            if (token.semantic != null) continue;

            // local patterns

            if (token.isIdentifier()) {
                if (prev.isDot()) {
                    if (next.isOpenParen()) {
                        token.semantic = SemanticType.METHOD;
                        token.method = MethodType.CHAIN;
                    } else {
                        token.semantic = SemanticType.FIELD;
                    }
                } else if (token.isCapitalized() && next.isDot()) {
                    token.semantic = SemanticType.CLASS;
                } else if (next.isOpenParen()) {
                    // assume if method call is capitalized its a constructor
                    // if preceded by a type, then its a definition
                    if (prev.isType() || token.isCapitalized()) {
                        token.semantic = SemanticType.METHOD;
                        token.method = MethodType.DEFINITION;
                        this.inParameterList = true;
                    }
                    // else its a method call
                    else {
                        token.semantic = SemanticType.METHOD;
                        token.method = MethodType.CALL;
                    }
                }
            }

            if (token.semantic != null) continue;

            // cleanup

            if (token.isIdentifier()) {
                if (token.isCapitalized()) {
                    if (next.text === '<') {
                        token.semantic = SemanticType.PARAMETERIZED_CLASS;
                    } else if (prev.text !== '<' && token.isAllCaps()) {
                        token.semantic = SemanticType.CONSTANT;
                    } else {
                        token.semantic = SemanticType.CLASS;
                    }
                } else {
                    token.semantic = SemanticType.VARIABLE;
                }
            }
        }
    }

    resetExpectations() {
        this.expect = Expect.NONE;
    }

    // maybe useful later on
    tokenInList(token, list) {
        return list.includes(token.text);
    }
}
