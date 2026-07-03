import { verify } from '../src/test.js';

const cases = [
    [
        'empty interface',
        `
            interface Foo {}
        `,
    ],
    [
        'interface with method',
        `
            interface Foo {
                void bar();
            }
        `,
    ],
    [
        'interface with default method',
        `
            interface Foo {
                default void bar() {}
            }
        `,
    ],
    [
        'interface with static method',
        `
            interface Foo {
                static void bar() {}
            }
        `,
    ],
    [
        'interface constant',
        `
            interface Foo {
                int VALUE = 42;
            }
        `,
    ],
    [
        'generic interface',
        `
            interface Box<T> {}
        `,
    ],
    [
        'interface extends interface',
        `
            interface Foo extends Bar {}
        `,
    ],
    [
        'interface extends multiple interfaces',
        `
            interface Foo extends Bar, Baz {}
        `,
    ],
    [
        'class implements interface',
        `
            class Foo implements Bar {}
        `,
    ],
    [
        'class implements multiple interfaces',
        `
            class Foo implements Bar, Baz {}
        `,
    ],
    [
        'annotated interface',
        `
            @FunctionalInterface
            interface Foo {
                void run();
            }
        `,
    ],
    [
        'nested interface',
        `
            class Outer {
                interface Inner {}
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
