import { TokenType, SemanticType, MethodType, Token } from './types.js';
import { SemanticColors, MethodColors, TokenColors } from './theme.js';

export class Colorizer {
    constructor(textRange, tokens) {
        this.textRange = textRange;
        this.tokens = tokens;
    }

    colorize() {
        const text = this.tokens.map((t) => t.text).join('');
        this.textRange.setText(text);

        let start = 0;

        for (const token of this.tokens) {
            const end = start + token.text.length;

            if (token.text.length > 0) {
                const range = this.textRange.getRange(start, end);
                const textStyle = range.getTextStyle();

                if (range != null && style != null) {
                    const style = this.getStyle(token);
                    textStyle.setForegroundColor(style.color);
                    textStyle.setItalic(style.italic);
                    textStyle.setBold(style.bold);
                }
            }

            start += token.text.length;
        }
    }

    colorizeAnsi(debug = false) {
        const RESET = '\x1b[0m';
        for (const token of this.tokens) {
            if (token.text.length > 0) {
                const style = this.getStyle(token);
                const code = this.hexToAnsi(
                    style.color,
                    style.italic,
                    style.bold,
                );
                token.text = code + token.text + RESET;

                if (debug) {
                    if (token.isIdentifier())
                        token.text +=
                            `[${token.semantic}` +
                            (token.method ? '-' + token.method : '') +
                            ']';
                }
            }
        }
    }

    getStyle(token) {
        let style = null;

        if (token.method !== null) {
            style = MethodColors.get(token.method);
        } else if (token.semantic !== null) {
            style = SemanticColors.get(token.semantic);
        } else if (token.type !== null) {
            style = TokenColors.get(token.type);
        }
        return style;
    }

    hexToAnsi(hex, italic = false, bold = false) {
        const codes = [];

        if (bold) codes.push(1);
        if (italic) codes.push(3);

        if (hex) {
            hex = hex.replace(/^#/, '');

            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);

            codes.push(`38;2;${r};${g};${b}`);
        }

        return `\x1b[${codes.join(';')}m`;
    }
}
