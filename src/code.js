import { Lexer } from './lexer.js';
import { Classifier } from './classifier.js';
import { Colorizer } from './colorizer.js';
import { TokenType } from './types.js';

export function onOpen() {
    SlidesApp.getUi()
        .createMenu('Prospecs')
        .addItem('Highlight Selection', 'highlightSelection')
        .addToUi();
}

export function highlightSelection() {
    const selection = SlidesApp.getActivePresentation().getSelection();
    const textRange = selection.getTextRange();

    if (textRange == null || textRange.getLength() === 0) {
        SlidesApp.getUi().alert('Prospecs: Nothing selected');
        return;
    }

    const lexer = new Lexer(textRange.asString());
    const tokens = lexer.tokenize();

    const classifier = new Classifier(tokens);
    classifier.classify();

    const colorizer = new Colorizer(textRange, tokens);
    colorizer.colorize();

    SlidesApp.getUi().alert('Prospecs: Done!');
}

// to see if everything works on GAS
export function test() {
    const lexer = new Lexer(
        `public static void main(String[] args) { System.out.println("Hello world!"); }`,
    );
    const tokens = lexer.tokenize();

    const classifier = new Classifier(tokens);
    classifier.classify();

    return tokens
        .filter((t) => t.isWord())
        .map((t) => {
            const semantic = t.semantic ? `[${t.semantic}]` : '';
            const method = t.method ? `[${t.method}]` : '';
            return `"${t.text}" ${semantic} ${method}`;
        });
}
