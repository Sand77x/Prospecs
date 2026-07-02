import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('control flow', () => {
    test('if statement', (t) => {
        const input = `
            void foo() {
                if (x > 0) {}
            }
        `;

        verify(input, t);
    });

    test('if else', (t) => {
        const input = `
            void foo() {
                if (x > 0) {
                    positive();
                } else {
                    negative();
                }
            }
        `;

        verify(input, t);
    });

    test('nested if', (t) => {
        const input = `
            void foo() {
                if (a) {
                    if (b) {
                        work();
                    }
                }
            }
        `;

        verify(input, t);
    });

    test('while loop', (t) => {
        const input = `
            void foo() {
                while (running) {}
            }
        `;

        verify(input, t);
    });

    test('do while loop', (t) => {
        const input = `
            void foo() {
                do {
                    work();
                } while (running);
            }
        `;

        verify(input, t);
    });

    test('for loop', (t) => {
        const input = `
            void foo() {
                for (int i = 0; i < 10; i++) {}
            }
        `;

        verify(input, t);
    });

    test('enhanced for loop', (t) => {
        const input = `
            void foo() {
                for (String s : list) {}
            }
        `;

        verify(input, t);
    });

    test('switch statement', (t) => {
        const input = `
            void foo(int x) {
                switch (x) {
                    case 1:
                        break;
                    default:
                        break;
                }
            }
        `;

        verify(input, t);
    });

    test('switch expression', (t) => {
        const input = `
            int foo(int x) {
                return switch (x) {
                    case 1 -> 10;
                    default -> 0;
                };
            }
        `;

        verify(input, t);
    });

    test('try catch', (t) => {
        const input = `
            void foo() {
                try {
                    work();
                } catch (Exception e) {
                    handle(e);
                }
            }
        `;

        verify(input, t);
    });

    test('try catch finally', (t) => {
        const input = `
            void foo() {
                try {
                    work();
                } catch (Exception e) {
                    handle(e);
                } finally {
                    cleanup();
                }
            }
        `;

        verify(input, t);
    });

    test('try with resources', (t) => {
        const input = `
            void foo() {
                try (InputStream in = open()) {
                    read(in);
                }
            }
        `;

        verify(input, t);
    });

    test('throw statement', (t) => {
        const input = `
            void foo() {
                throw new RuntimeException();
            }
        `;

        verify(input, t);
    });

    test('break and continue', (t) => {
        const input = `
            void foo() {
                while (true) {
                    if (done) break;
                    continue;
                }
            }
        `;

        verify(input, t);
    });

    test('return statement', (t) => {
        const input = `
            int foo() {
                return 42;
            }
        `;

        verify(input, t);
    });
});
