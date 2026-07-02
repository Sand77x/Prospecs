import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('variables', () => {
    test('simple local variable', (t) => {
        const input = `
            void foo() {
                int x;
            }
        `;

        verify(input, t);
    });

    test('initialized variable', (t) => {
        const input = `
            void foo() {
                int x = 42;
            }
        `;

        verify(input, t);
    });

    test('multiple variables', (t) => {
        const input = `
            void foo() {
                int x, y, z;
            }
        `;

        verify(input, t);
    });

    test('generic variable', (t) => {
        const input = `
            void foo() {
                List<String> names = new ArrayList<>();
            }
        `;

        verify(input, t);
    });

    test('array variable', (t) => {
        const input = `
            void foo() {
                int[] numbers = new int[10];
            }
        `;

        verify(input, t);
    });

    test('var inference', (t) => {
        const input = `
            void foo() {
                var name = "John";
            }
        `;

        verify(input, t);
    });

    test('variable from method call', (t) => {
        const input = `
            void foo() {
                String name = getName();
            }
        `;

        verify(input, t);
    });

    test('variable from constructor', (t) => {
        const input = `
            void foo() {
                Foo foo = new Foo();
            }
        `;

        verify(input, t);
    });

    test('variable assignment', (t) => {
        const input = `
            void foo() {
                int x = 0;
                x = 5;
            }
        `;

        verify(input, t);
    });

    test('variable shadowing field', (t) => {
        const input = `
            class Foo {
                int x;

                void bar() {
                    int x = 10;
                }
            }
        `;

        verify(input, t);
    });

    test('for loop variable', (t) => {
        const input = `
            void foo() {
                for (int i = 0; i < 10; i++) {}
            }
        `;

        verify(input, t);
    });

    test('enhanced for variable', (t) => {
        const input = `
            void foo() {
                for (String name : names) {}
            }
        `;

        verify(input, t);
    });

    test('catch variable', (t) => {
        const input = `
            void foo() {
                try {
                } catch (Exception e) {
                }
            }
        `;

        verify(input, t);
    });

    test('try with resources variable', (t) => {
        const input = `
            void foo() {
                try (InputStream in = open()) {
                }
            }
        `;

        verify(input, t);
    });
});
