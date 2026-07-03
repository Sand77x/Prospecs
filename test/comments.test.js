import { verify } from '../src/test.js';

const cases = [
    [
        'single line comment',
        `
            // this is a comment
            int x = 0;
        `,
    ],
    [
        'end of line comment',
        `
            int x = 0; // inline comment
        `,
    ],
    [
        'block comment',
        `
            /*
                multi-line comment
            */
            int x = 0;
        `,
    ],
    [
        'javadoc comment',
        `
            /**
             * This is documentation
             */
            void foo() {}
        `,
    ],
    [
        'comment inside class',
        `
            class Foo {
                // field comment
                int x;
            }
        `,
    ],
    [
        'comment inside method',
        `
            void foo() {
                // logic here
                int x = 1;
            }
        `,
    ],
    [
        'block comment inline',
        `
            int x = /* inline block */ 5;
        `,
    ],
    [
        'comment-only file',
        `
            // only comments
            /* nothing else */
        `,
    ],
    [
        'nested comment-like content',
        `
            /*
                // not a real comment start
                /* nested-looking text */
            */
            int x = 0;
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
