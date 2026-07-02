import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('comments', () => {
    test('single line comment', (t) => {
        const input = `
            // this is a comment
            int x = 0;
        `;

        verify(input, t);
    });

    test('end of line comment', (t) => {
        const input = `
            int x = 0; // inline comment
        `;

        verify(input, t);
    });

    test('block comment', (t) => {
        const input = `
            /*
                multi-line comment
            */
            int x = 0;
        `;

        verify(input, t);
    });

    test('javadoc comment', (t) => {
        const input = `
            /**
             * This is documentation
             */
            void foo() {}
        `;

        verify(input, t);
    });

    test('comment inside class', (t) => {
        const input = `
            class Foo {
                // field comment
                int x;
            }
        `;

        verify(input, t);
    });

    test('comment inside method', (t) => {
        const input = `
            void foo() {
                // logic here
                int x = 1;
            }
        `;

        verify(input, t);
    });

    test('block comment inline', (t) => {
        const input = `
            int x = /* inline block */ 5;
        `;

        verify(input, t);
    });

    test('comment-only file', (t) => {
        const input = `
            // only comments
            /* nothing else */
        `;

        verify(input, t);
    });

    test('nested comment-like content', (t) => {
        const input = `
            /*
                // not a real comment start
                /* nested-looking text */
            */
            int x = 0;
        `;

        verify(input, t);
    });
});
