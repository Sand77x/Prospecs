import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('methods', () => {
    test('simple method', (t) => {
        const input = `
            void foo() {}
        `;

        verify(input, t);
    });

    test('method with parameters', (t) => {
        const input = `
            void foo(int a, String b) {}
        `;

        verify(input, t);
    });

    test('method call', (t) => {
        const input = `
            foo();
        `;

        verify(input, t);
    });

    test('method with return value', (t) => {
        const input = `
            int sum(int a, int b) {
                return a + b;
            }
        `;

        verify(input, t);
    });

    test('method chain', (t) => {
        const input = `
            object.foo().bar().baz();
        `;

        verify(input, t);
    });

    test('static method', (t) => {
        const input = `
            Math.max(a, b);
        `;

        verify(input, t);
    });

    test('generic method call', (t) => {
        const input = `
            Collections.<String>emptyList();
        `;

        verify(input, t);
    });

    test('varargs method', (t) => {
        const input = `
            void foo(String... args) {}
        `;

        verify(input, t);
    });

    test('throws clause', (t) => {
        const input = `
            void foo() throws IOException {}
        `;

        verify(input, t);
    });

    test('method reference', (t) => {
        const input = `
            list.forEach(System.out::println);
        `;

        verify(input, t);
    });
});
