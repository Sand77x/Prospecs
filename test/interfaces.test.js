import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('interfaces', () => {
    test('empty interface', (t) => {
        const input = `
            interface Foo {}
        `;

        verify(input, t);
    });

    test('interface with method', (t) => {
        const input = `
            interface Foo {
                void bar();
            }
        `;

        verify(input, t);
    });

    test('interface with default method', (t) => {
        const input = `
            interface Foo {
                default void bar() {}
            }
        `;

        verify(input, t);
    });

    test('interface with static method', (t) => {
        const input = `
            interface Foo {
                static void bar() {}
            }
        `;

        verify(input, t);
    });

    test('interface constant', (t) => {
        const input = `
            interface Foo {
                int VALUE = 42;
            }
        `;

        verify(input, t);
    });

    test('generic interface', (t) => {
        const input = `
            interface Box<T> {}
        `;

        verify(input, t);
    });

    test('interface extends interface', (t) => {
        const input = `
            interface Foo extends Bar {}
        `;

        verify(input, t);
    });

    test('interface extends multiple interfaces', (t) => {
        const input = `
            interface Foo extends Bar, Baz {}
        `;

        verify(input, t);
    });

    test('class implements interface', (t) => {
        const input = `
            class Foo implements Bar {}
        `;

        verify(input, t);
    });

    test('class implements multiple interfaces', (t) => {
        const input = `
            class Foo implements Bar, Baz {}
        `;

        verify(input, t);
    });

    test('annotated interface', (t) => {
        const input = `
            @FunctionalInterface
            interface Foo {
                void run();
            }
        `;

        verify(input, t);
    });

    test('nested interface', (t) => {
        const input = `
            class Outer {
                interface Inner {}
            }
        `;

        verify(input, t);
    });
});
