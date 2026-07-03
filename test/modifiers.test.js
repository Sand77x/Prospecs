import { verify } from '../src/test.js';

const cases = [
    [
        'package private class',
        `
            class Foo {}
        `,
    ],
    [
        'public class',
        `
            public class Foo {}
        `,
    ],
    [
        'abstract class',
        `
            public abstract class Foo {}
        `,
    ],
    [
        'final class',
        `
            public final class Foo {}
        `,
    ],
    [
        'package private field',
        `
            class Foo {
                int x;
            }
        `,
    ],
    [
        'private static final field',
        `
            class Foo {
                private static final int MAX = 100;
            }
        `,
    ],
    [
        'volatile field',
        `
            class Foo {
                private volatile int counter;
            }
        `,
    ],
    [
        'transient field',
        `
            class Foo {
                private transient String cache;
            }
        `,
    ],
    [
        'package private method',
        `
            class Foo {
                void bar() {}
            }
        `,
    ],
    [
        'public static method',
        `
            class Foo {
                public static void bar() {}
            }
        `,
    ],
    [
        'protected final method',
        `
            class Foo {
                protected final void bar() {}
            }
        `,
    ],
    [
        'modifiers inline',
        `
            public void foo()
            void bar() {}
        `,
    ],
    [
        'private synchronized method',
        `
            class Foo {
                private synchronized void bar() {}
            }
        `,
    ],
    [
        'native method',
        `
            class Foo {
                public native void bar();
            }
        `,
    ],
    [
        'strictfp method',
        `
            class Foo {
                public strictfp double calculate() {
                    return 0.0;
                }
            }
        `,
    ],
    [
        'modifier ordering',
        `
            public static final List<String> VALUES = new ArrayList<>();
        `,
    ],
    [
        'generic static method',
        `
            public static <T> T identity(T value) {
                return value;
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
