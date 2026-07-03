import { verify } from '../src/test.js';

const cases = [
    [
        'empty class',
        `
            class Foo {}
        `,
    ],
    [
        'class with fields',
        `
            class Foo {
                int x;
                String name;
            }
        `,
    ],
    [
        'class with methods',
        `
            class Foo {
                void bar() {}
            }
        `,
    ],
    [
        'class extends another class',
        `
            class Foo extends Bar {}
        `,
    ],
    [
        'class implements interfaces',
        `
            class Foo implements A, B {}
        `,
    ],
    [
        'abstract class',
        `
            abstract class Foo {}
        `,
    ],
    [
        'final class',
        `
            final class Foo {}
        `,
    ],
    [
        'nested class',
        `
            class Outer {
                class Inner {}
            }
        `,
    ],

    [
        'generic class',
        `
            class Box<T> {}
        `,
    ],

    [
        'generic class with inheritance',
        `
            class Box<T> extends Container<T> {}
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
