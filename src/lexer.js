import { RESERVED, PRIMITIVES, LITERALS, Token, TokenType } from './types.js';

export class Lexer {
    constructor(source) {
        this.source = source;
        this.pos = 0;
    }

    peek() {
        return this.source[this.pos];
    }

    peekNext() {
        if (this.pos + 1 >= this.source.length) {
            return null;
        }
        return this.source[this.pos + 1];
    }

    next() {
        return this.source[this.pos++];
    }

    eof() {
        return this.pos >= this.source.length;
    }

    tokenize() {
        const tokens = [];

        while (!this.eof()) {
            const c = this.peek();

            // ignore whitespace
            if (/\s/.test(c)) {
                tokens.push(this.readWhitespace());
            } else if (/[A-Za-z_$]/.test(c)) {
                tokens.push(this.readIdentifier());
            } else if (
                /[0-9]/.test(c) ||
                (c === '.' && /[0-9]/.test(this.peekNext())) ||
                (c === '-' && /[0-9.]/.test(this.peekNext()))
            ) {
                tokens.push(this.readNumber());
            } else if (c === '"' || c === "'") {
                tokens.push(this.readString());
            } else if (c === '/') {
                tokens.push(this.readSlash());
            } else {
                tokens.push(this.readSymbol());
            }
        }

        return tokens;
    }

    readWhitespace() {
        let text = '';

        while (!this.eof() && /\s/.test(this.peek())) {
            text += this.next();
        }

        return new Token(TokenType.WHITESPACE, text);
    }

    readIdentifier() {
        let text = '';

        while (!this.eof() && /[A-Za-z0-9_$]/.test(this.peek())) {
            text += this.next();
        }

        if (RESERVED.has(text)) return new Token(TokenType.RESERVED, text);

        if (PRIMITIVES.has(text)) return new Token(TokenType.PRIMITIVE, text);

        if (LITERALS.has(text)) return new Token(TokenType.LITERAL, text);

        return new Token(TokenType.IDENTIFIER, text);
    }

    readNumber() {
        let text = '';

        while (!this.eof() && /[0-9._-fFlL]/.test(this.peek())) {
            text += this.next();
        }

        return new Token(TokenType.NUMBER, text);
    }

    readString() {
        let text = '';
        let opening = this.next();

        text += opening; // opening quote

        while (!this.eof()) {
            const c = this.next();
            text += c;

            if (c === '\\') {
                text += this.next();
                continue;
            }

            if (c === opening) break;
        }

        return new Token(TokenType.STRING, text);
    }

    readSlash() {
        let text = '';

        text += this.next();

        // assume arithmetic divide
        if (this.eof()) {
            return new Token(TokenType.SYMBOL, text);
        }

        let nextChar = this.peek();

        // single-line comment
        if (nextChar === '/') {
            text += this.next(); // consume second /

            while (!this.eof() && this.peek() !== '\n') {
                text += this.next();
            }
        }
        // multi-line comment
        else if (nextChar === '*') {
            text += this.next(); // consume *

            while (!this.eof()) {
                if (this.peek() === '*' && this.peekNext() === '/') {
                    text += this.next(); // *
                    text += this.next(); // /
                    break;
                }

                text += this.next();
            }
        }
        // arithmetic divide
        else {
            return new Token(TokenType.SYMBOL, text);
        }

        return new Token(TokenType.COMMENT, text);
    }

    readSymbol() {
        let text = '';

        text += this.next();

        return new Token(
            text === ';' ? TokenType.SEMICOLON : TokenType.SYMBOL,
            text,
        );
    }
}
