import { verify } from '../src/test.js';

const cases = [
    [
        'simple field',
        `
            class Foo {
                int x;
            }
        `,
    ],
    [
        'multiple fields',
        `
            class Foo {
                int x;
                String name;
                boolean active;
            }
        `,
    ],
    [
        'field with initializer',
        `
            class Foo {
                int x = 42;
            }
        `,
    ],
    [
        'multiple declarations',
        `
            class Foo {
                int x, y, z;
            }
        `,
    ],
    [
        'generic field',
        `
            class Foo {
                List<String> names;
            }
        `,
    ],
    [
        'array field',
        `
            class Foo {
                int[] numbers;
            }
        `,
    ],
    [
        'static final field',
        `
            class Foo {
                static final int MAX = 100;
            }
        `,
    ],
    [
        'annotated field',
        `
            class Foo {
                @Inject
                Service service;
            }
        `,
    ],
    [
        'field with constructor call',
        `
            class Foo {
                List<String> list = new ArrayList<>();
            }
        `,
    ],
    [
        'field with method call',
        `
            class Foo {
                String name = System.getProperty("user.name");
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
