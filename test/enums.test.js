import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('enums', () => {
    test('empty enum', (t) => {
        const input = `
            enum Color {}
        `;

        verify(input, t);
    });

    test('simple enum', (t) => {
        const input = `
            enum Color {
                RED, GREEN, BLUE
            }
        `;

        verify(input, t);
    });

    test('enum with semicolon', (t) => {
        const input = `
            enum Color {
                RED, GREEN, BLUE;
            }
        `;

        verify(input, t);
    });

    test('enum with field', (t) => {
        const input = `
            enum Color {
                RED;

                private int value;
            }
        `;

        verify(input, t);
    });

    test('enum with constructor', (t) => {
        const input = `
            enum Color {
                RED(1);

                private final int value;

                Color(int value) {
                    this.value = value;
                }
            }
        `;

        verify(input, t);
    });

    test('enum with method', (t) => {
        const input = `
            enum Color {
                RED;

                int value() {
                    return 1;
                }
            }
        `;

        verify(input, t);
    });

    test('enum implements interface', (t) => {
        const input = `
            enum Color implements Serializable {
                RED;
            }
        `;

        verify(input, t);
    });

    test('generic field in enum', (t) => {
        const input = `
            enum Test {
                A;

                List<String> values;
            }
        `;

        verify(input, t);
    });

    test('annotated enum', (t) => {
        const input = `
            @Deprecated
            enum Color {
                RED
            }
        `;

        verify(input, t);
    });

    test('enum constant with class body', (t) => {
        const input = `
            enum Operation {
                ADD {
                    void apply() {}
                };
            }
        `;

        verify(input, t);
    });
});
