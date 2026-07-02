import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('classes', () => {
    test('empty class', (t) => {
        const input = `
            class Foo {}
        `;

        verify(input, t);
    });

    test('class with fields', (t) => {
        const input = `
            class Foo {
                int x;
                String name;
            }
        `;

        verify(input, t);
    });

    test('class with methods', (t) => {
        const input = `
            class Foo {
                void bar() {}
            }
        `;

        verify(input, t);
    });

    test('class extends another class', (t) => {
        const input = `
            class Foo extends Bar {}
        `;

        verify(input, t);
    });

    test('class implements interfaces', (t) => {
        const input = `
            class Foo implements A, B {}
        `;

        verify(input, t);
    });

    test('abstract class', (t) => {
        const input = `
            abstract class Foo {}
        `;

        verify(input, t);
    });

    test('final class', (t) => {
        const input = `
            final class Foo {}
        `;

        verify(input, t);
    });

    test('nested class', (t) => {
        const input = `
            class Outer {
                class Inner {}
            }
        `;

        verify(input, t);
    });

    test('generic class', (t) => {
        const input = `
            class Box<T> {}
        `;

        verify(input, t);
    });

    test('generic class with inheritance', (t) => {
        const input = `
            class Box<T> extends Container<T> {}
        `;

        verify(input, t);
    });
});
