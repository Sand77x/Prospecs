import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('expressions', () => {
    test('assignment', (t) => {
        const input = `
            void foo() {
                int x;
                x = 42;
            }
        `;

        verify(input, t);
    });

    test('compound assignment', (t) => {
        const input = `
            void foo() {
                int x = 1;
                x += 5;
            }
        `;

        verify(input, t);
    });

    test('arithmetic expression', (t) => {
        const input = `
            void foo() {
                int x = a + b * c;
            }
        `;

        verify(input, t);
    });

    test('logical expression', (t) => {
        const input = `
            void foo() {
                if (a && b || c) {}
            }
        `;

        verify(input, t);
    });

    test('comparison expression', (t) => {
        const input = `
            void foo() {
                boolean x = a >= b;
            }
        `;

        verify(input, t);
    });

    test('ternary operator', (t) => {
        const input = `
            void foo() {
                int x = condition ? 1 : 2;
            }
        `;

        verify(input, t);
    });

    test('cast expression', (t) => {
        const input = `
            void foo() {
                int x = (int) value;
            }
        `;

        verify(input, t);
    });

    test('instanceof expression', (t) => {
        const input = `
            void foo(Object obj) {
                if (obj instanceof String) {}
            }
        `;

        verify(input, t);
    });

    test('constructor call', (t) => {
        const input = `
            void foo() {
                Foo foo = new Foo();
            }
        `;

        verify(input, t);
    });

    test('generic constructor call', (t) => {
        const input = `
            void foo() {
                List<String> list = new ArrayList<>();
            }
        `;

        verify(input, t);
    });

    test('array creation', (t) => {
        const input = `
            void foo() {
                int[] values = new int[10];
            }
        `;

        verify(input, t);
    });

    test('array access', (t) => {
        const input = `
            void foo() {
                int x = values[0];
            }
        `;

        verify(input, t);
    });

    test('field access', (t) => {
        const input = `
            void foo() {
                object.field = 10;
            }
        `;

        verify(input, t);
    });

    test('this reference', (t) => {
        const input = `
            class Foo {
                int x;

                void bar() {
                    this.x = 5;
                }
            }
        `;

        verify(input, t);
    });

    test('super method call', (t) => {
        const input = `
            class Foo extends Bar {
                void bar() {
                    super.bar();
                }
            }
        `;

        verify(input, t);
    });

    test('method chain', (t) => {
        const input = `
            void foo() {
                object.foo().bar().baz();
            }
        `;

        verify(input, t);
    });

    test('parenthesized expression', (t) => {
        const input = `
            void foo() {
                int x = (a + b) * c;
            }
        `;

        verify(input, t);
    });

    test('unary operators', (t) => {
        const input = `
            void foo() {
                int x = -value;
                boolean y = !flag;
            }
        `;

        verify(input, t);
    });

    test('increment and decrement', (t) => {
        const input = `
            void foo() {
                i++;
                --j;
            }
        `;

        verify(input, t);
    });

    test('complex expression', (t) => {
        const input = `
            void foo() {
                result = foo(bar + 1, new Box<>(value)).get().size();
            }
        `;

        verify(input, t);
    });
});
