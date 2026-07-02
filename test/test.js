import { Lexer } from '../src/Lexer.js';
import { Classifier } from '../src/Classifier.js';
import { TokenType } from '../src/Types.js';
import { Colorizer } from '../src/Colorizer.js';

export function dedent(str) {
    const lines = str.split('\n');

    // Remove leading/trailing blank lines only
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

    const indent = Math.min(
        ...lines
            .filter((line) => line.trim())
            .map((line) => line.match(/^[ \t]*/)[0].length),
    );

    return lines.map((line) => line.slice(indent)).join('\n');
}

export function parse(input) {
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();

    const classifier = new Classifier(tokens);
    classifier.classify();

    const colorizer = new Colorizer(null, tokens);
    colorizer.colorizeAnsi();

    return tokens.map((t) => t.text).join('');
}

let testNumber = 1;
export function verify(input, test) {
    const parsed = parse(dedent(input));

    console.log(`#${testNumber++} ${test.name}`);
    console.log(parsed + '\n');
}
