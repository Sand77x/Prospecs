import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('constructors', () => {
    test('default constructor', (t) => {
        const input = `
            class Foo {
                Foo() {}
            }
        `;

        verify(input, t);
    });

    test('constructor with parameters', (t) => {
        const input = `
            class Foo {
                Foo(int x, String name) {}
            }
        `;

        verify(input, t);
    });

    test('constructor assignment', (t) => {
        const input = `
            class Foo {
                int x;

                Foo(int x) {
                    this.x = x;
                }
            }
        `;

        verify(input, t);
    });

    test('overloaded constructors', (t) => {
        const input = `
            class Foo {
                Foo() {}
                Foo(int x) {}
            }
        `;

        verify(input, t);
    });

    test('constructor chaining', (t) => {
        const input = `
            class Foo {
                Foo() {
                    this(0);
                }

                Foo(int x) {}
            }
        `;

        verify(input, t);
    });

    test('super constructor call', (t) => {
        const input = `
            class Foo extends Bar {
                Foo() {
                    super();
                }
            }
        `;

        verify(input, t);
    });

    test('annotated constructor', (t) => {
        const input = `
            class Foo {
                @Inject
                Foo(Service service) {}
            }
        `;

        verify(input, t);
    });

    test('generic constructor parameter', (t) => {
        const input = `
            class Foo {
                Foo(List<String> values) {}
            }
        `;

        verify(input, t);
    });

    test('throws constructor', (t) => {
        const input = `
            class Foo {
                Foo() throws IOException {}
            }
        `;

        verify(input, t);
    });

    test('constructor with method call', (t) => {
        const input = `
            class Foo {
                Foo() {
                    initialize();
                }
            }
        `;

        verify(input, t);
    });
});
