import {
    MethodType,
    TokenType,
    SemanticType,
    Context,
    Expect,
} from './Types.js';

// TODO:
// color parameters used as gray (via symbol table)
// implement "expectType" for type contexts and leave the rest to variable / constants (better)
// implement method references (field)
// exception throws 
// should super / this be same color as constructor? (special color)

export class Classifier {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;

        // state
        this.context = Context.NORMAL;
        this.resetExpectations();
        this.inParameterList = false;

        // annotation
        this.annotationParenDepth = 0;
        this.annotationSeenName = false;
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
            if (
                this.tokens[idx].type === TokenType.WHITESPACE ||
                this.tokens[idx].type === TokenType.COMMENT
            ) {
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
        return null;
    }

    peekPreviousMeaningful() {
        let idx = this.pos - 2;
        while (idx >= 0) {
            if (
                this.tokens[idx].type === TokenType.WHITESPACE ||
                this.tokens[idx].type === TokenType.COMMENT
            ) {
                idx--;
                continue;
            }
            return this.tokens[idx];
        }
        return null;
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
            const isIdentifier = token.type == TokenType.IDENTIFIER;
            const text = token.text;
            const type = token.type;

            const next = this.peekNextMeaningful();
            const prev = this.peekPreviousMeaningful();

            // follow context

            switch (this.context) {
                case Context.PACKAGE:
                    if (isIdentifier) token.semantic = SemanticType.PACKAGE;
                    break;

                case Context.IMPORT:
                    if (isIdentifier) token.semantic = SemanticType.IMPORT;
                    break;

                case Context.INTERFACE:
                    if (isIdentifier) token.semantic = SemanticType.INTERFACE;
                    break;

                case Context.ANNOTATION:
                    this.consumeAnnotation(token);
                    break;
            }

            if (token.semantic != null) continue;

            // classify identifiers

            if (isIdentifier) {
                if (
                    this.expect === Expect.DECLARATION_NAME &&
                    !this.isDot(prev)
                ) {
                    if (this.isOpenParen(next)) {
                        token.semantic = SemanticType.METHOD;
                        token.method = MethodType.DEFINITION;
                        this.resetExpectations();
                        this.inParameterList = true;
                    }
                } else if (this.expect === Expect.PARAMETER_NAME) {
                    token.semantic = SemanticType.PARAMETER;
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
            } else if (text === ';') {
                this.context = Context.NORMAL;
                this.resetExpectations();
            } else if (text === '{' || text === '}') {
                this.resetExpectations();
            } else if (text === '@') {
                this.context = Context.ANNOTATION;
                this.annotationSeenName = false;
                this.annotationParenDepth = 0;
                this.resetExpectations();
            } else if (type === TokenType.COMMENT) {
                this.context = Context.NORMAL;
                this.resetExpectations();
            } else if (this.isType(token)) {
                if (this.isDot(next)) {
                    // for qualified expressions
                    this.resetExpectations();
                } else if (this.inParameterList && this.isCapitalized(token)) {
                    this.resetExpectations();
                } else if (this.inParameterList) {
                    this.expect = Expect.PARAMETER_NAME;
                } else if (next?.text !== '<' && next?.text !== ',') {
                    this.expect = Expect.DECLARATION_NAME;
                }
            } else if (this.isCloseParen(token)) {
                this.inParameterList = false;
            }

            if (token.semantic != null) continue;

            // local patterns

            if (isIdentifier) {
                if (this.isDot(prev)) {
                    if (this.isOpenParen(next)) {
                        token.semantic = SemanticType.METHOD;
                        token.method = MethodType.CHAIN;
                    } else {
                        token.semantic = SemanticType.FIELD;
                    }
                } else if (this.isCapitalized(token) && this.isDot(next)) {
                    token.semantic = SemanticType.CLASS;
                } else if (this.isOpenParen(next)) {
                    token.semantic = SemanticType.METHOD;
                    token.method = MethodType.CALL;
                }
            }

            if (token.semantic != null) continue;

            // cleanup

            if (isIdentifier) {
                if (this.isCapitalized(token)) {
                    if (next?.text === '<') {
                        token.semantic = SemanticType.PARAMETERIZED_CLASS;
                    } else if (prev?.text !== '<' && this.isAllCaps(token)) {
                        token.semantic = SemanticType.CONSTANT;
                    } else {
                        token.semantic = SemanticType.CLASS;
                    }
                } else {
                    token.semantic = SemanticType.VARIABLE;
                }
            }

            if (type === TokenType.IDENTIFIER) {
                // Logger.log(`${token.type} ${token.semantic} ${token.text}`);
            }
        }
    }

    isCapitalized(token) {
        return /^[A-Z]/.test(token.text);
    }

    isAllCaps(token) {
        return /^[A-Z0-9_]{2,}$/.test(token.text);
    }

    isDot(token) {
        return token?.text === '.';
    }

    isOpenParen(token) {
        return token?.text === '(';
    }

    isCloseParen(token) {
        return token?.text === ')';
    }

    isType(token) {
        return (
            token?.type === TokenType.PRIMITIVE ||
            (token?.type === TokenType.IDENTIFIER && this.isCapitalized(token))
        );
    }

    isLiteral(token) {
        return (
            token?.type === TokenType.NUMBER ||
            token?.type === TokenType.STRING ||
            token?.type === TokenType.LITERAL
        );
    }

    isMeaningful(token) {
        return (
            token.type !== TokenType.WHITESPACE &&
            token.type !== TokenType.COMMENT
        );
    }

    resetExpectations() {
        this.expect = Expect.NONE;
    }

    // maybe useful later on
    tokenInList(token, list) {
        return list.includes(token?.text);
    }

    consumeAnnotation(token) {
        token.semantic = SemanticType.ANNOTATION;

        // @interface is not an annotation usage.
        if (token.text === 'interface') {
            this.context = Context.NORMAL;
            return;
        }

        // Track nested parentheses.
        if (this.isOpenParen(token)) {
            this.annotationParenDepth++;
            return;
        }

        if (this.isCloseParen(token)) {
            this.annotationParenDepth--;

            if (this.annotationParenDepth === 0) {
                this.context = Context.NORMAL;
            }
            return;
        }

        // Qualified annotation names.
        if (this.isDot(token)) {
            return;
        }

        // First identifier after @.
        if (token.type === TokenType.IDENTIFIER) {
            this.annotationSeenName = true;
            return;
        }

        // After the name, if we aren't entering (...),
        // the annotation is finished.
        if (this.annotationSeenName && this.annotationParenDepth === 0) {
            this.context = Context.NORMAL;
        }
    }
}
