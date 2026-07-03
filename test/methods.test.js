import { verify } from '../src/test.js';

const cases = [
    [
        'simple method',
        `
            void foo() {}
        `,
    ],
    [
        'method with parameters',
        `
            void foo(int a, String b) {}
        `,
    ],
    [
        'method call',
        `
            foo();
        `,
    ],
    [
        'method with return value',
        `
            int sum(int a, int b) {
                return a + b;
            }
        `,
    ],
    [
        'method chain',
        `
            object.foo().bar().baz();
        `,
    ],
    [
        'static method',
        `
            Math.max(a, b);
        `,
    ],
    [
        'generic method call',
        `
            Collections.<String>emptyList();
        `,
    ],
    [
        'varargs method',
        `
            void foo(String... args) {}
        `,
    ],
    [
        'throws clause',
        `
            void foo() throws IOException {}
        `,
    ],
    [
        'method reference',
        `
            list.forEach(System.out::println);
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
