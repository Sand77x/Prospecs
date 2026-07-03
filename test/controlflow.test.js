import { verify } from '../src/test.js';

const cases = [
    [
        'if statement',
        `
            void foo() {
                if (x > 0) {}
            }
        `,
    ],
    [
        'if else',
        `
            void foo() {
                if (x > 0) {
                    positive();
                } else {
                    negative();
                }
            }
        `,
    ],
    [
        'nested if',
        `
            void foo() {
                if (a) {
                    if (b) {
                        work();
                    }
                }
            }
        `,
    ],
    [
        'while loop',
        `
            void foo() {
                while (running) {}
            }
        `,
    ],
    [
        'do while loop',
        `
            void foo() {
                do {
                    work();
                } while (running);
            }
        `,
    ],
    [
        'for loop',
        `
            void foo() {
                for (int i = 0; i < 10; i++) {}
            }
        `,
    ],
    [
        'enhanced for loop',
        `
            void foo() {
                for (String s : list) {}
            }
        `,
    ],
    [
        'switch statement',
        `
            void foo(int x) {
                switch (x) {
                    case 1:
                        break;
                    default:
                        break;
                }
            }
        `,
    ],
    [
        'switch expression',
        `
            int foo(int x) {
                return switch (x) {
                    case 1 -> 10;
                    default -> 0;
                };
            }
        `,
    ],
    [
        'try catch',
        `
            void foo() {
                try {
                    work();
                } catch (Exception e) {
                    handle(e);
                }
            }
        `,
    ],
    [
        'try catch finally',
        `
            void foo() {
                try {
                    work();
                } catch (Exception e) {
                    handle(e);
                } finally {
                    cleanup();
                }
            }
        `,
    ],
    [
        'try with resources',
        `
            void foo() {
                try (InputStream in = open()) {
                    read(in);
                }
            }
        `,
    ],
    [
        'throw statement',
        `
            void foo() {
                throw new RuntimeException();
            }
        `,
    ],
    [
        'break and continue',
        `
            void foo() {
                while (true) {
                    if (done) break;
                    continue;
                }
            }
        `,
    ],
    [
        'return statement',
        `
            int foo() {
                return 42;
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
