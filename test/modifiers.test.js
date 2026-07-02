import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('modifiers', () => {
    test('package private class', (t) => {
        const input = `
            class Foo {}
        `;

        verify(input, t);
    });

    test('public class', (t) => {
        const input = `
            public class Foo {}
        `;

        verify(input, t);
    });

    test('abstract class', (t) => {
        const input = `
            public abstract class Foo {}
        `;

        verify(input, t);
    });

    test('final class', (t) => {
        const input = `
            public final class Foo {}
        `;

        verify(input, t);
    });

    test('package private field', (t) => {
        const input = `
            class Foo {
                int x;
            }
        `;

        verify(input, t);
    });

    test('private static final field', (t) => {
        const input = `
            class Foo {
                private static final int MAX = 100;
            }
        `;

        verify(input, t);
    });

    test('volatile field', (t) => {
        const input = `
            class Foo {
                private volatile int counter;
            }
        `;

        verify(input, t);
    });

    test('transient field', (t) => {
        const input = `
            class Foo {
                private transient String cache;
            }
        `;

        verify(input, t);
    });

    test('package private method', (t) => {
        const input = `
            class Foo {
                void bar() {}
            }
        `;

        verify(input, t);
    });

    test('public static method', (t) => {
        const input = `
            class Foo {
                public static void bar() {}
            }
        `;

        verify(input, t);
    });

    test('protected final method', (t) => {
        const input = `
            class Foo {
                protected final void bar() {}
            }
        `;

        verify(input, t);
    });

    test('modifiers inline', (t) => {
        const input = `
            public void foo()
            void bar() {}
        `;

        verify(input, t);
    });

    test('private synchronized method', (t) => {
        const input = `
            class Foo {
                private synchronized void bar() {}
            }
        `;

        verify(input, t);
    });

    test('native method', (t) => {
        const input = `
            class Foo {
                public native void bar();
            }
        `;

        verify(input, t);
    });

    test('strictfp method', (t) => {
        const input = `
            class Foo {
                public strictfp double calculate() {
                    return 0.0;
                }
            }
        `;

        verify(input, t);
    });

    test('modifier ordering', (t) => {
        const input = `
            public static final List<String> VALUES = new ArrayList<>();
        `;

        verify(input, t);
    });

    test('generic static method', (t) => {
        const input = `
            public static <T> T identity(T value) {
                return value;
            }
        `;

        verify(input, t);
    });
});
