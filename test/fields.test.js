import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('fields', () => {
    test('simple field', (t) => {
        const input = `
            class Foo {
                int x;
            }
        `;

        verify(input, t);
    });

    test('multiple fields', (t) => {
        const input = `
            class Foo {
                int x;
                String name;
                boolean active;
            }
        `;

        verify(input, t);
    });

    test('field with initializer', (t) => {
        const input = `
            class Foo {
                int x = 42;
            }
        `;

        verify(input, t);
    });

    test('multiple declarations', (t) => {
        const input = `
            class Foo {
                int x, y, z;
            }
        `;

        verify(input, t);
    });

    test('generic field', (t) => {
        const input = `
            class Foo {
                List<String> names;
            }
        `;

        verify(input, t);
    });

    test('array field', (t) => {
        const input = `
            class Foo {
                int[] numbers;
            }
        `;

        verify(input, t);
    });

    test('static final field', (t) => {
        const input = `
            class Foo {
                static final int MAX = 100;
            }
        `;

        verify(input, t);
    });

    test('annotated field', (t) => {
        const input = `
            class Foo {
                @Inject
                Service service;
            }
        `;

        verify(input, t);
    });

    test('field with constructor call', (t) => {
        const input = `
            class Foo {
                List<String> list = new ArrayList<>();
            }
        `;

        verify(input, t);
    });

    test('field with method call', (t) => {
        const input = `
            class Foo {
                String name = System.getProperty("user.name");
            }
        `;

        verify(input, t);
    });
});
