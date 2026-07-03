import { verify } from '../src/test.js';

const cases = [
    [
        'assignment',
        `
            void foo() {
                int x;
                x = 42;
            }
        `,
    ],
    [
        'compound assignment',
        `
            void foo() {
                int x = 1;
                x += 5;
            }
        `,
    ],
    [
        'arithmetic expression',
        `
            void foo() {
                int x = a + b * c;
            }
        `,
    ],
    [
        'logical expression',
        `
            void foo() {
                if (a && b || c) {}
            }
        `,
    ],
    [
        'comparison expression',
        `
            void foo() {
                boolean x = a >= b;
            }
        `,
    ],
    [
        'ternary operator',
        `
            void foo() {
                int x = condition ? 1 : 2;
            }
        `,
    ],
    [
        'cast expression',
        `
            void foo() {
                int x = (int) value;
            }
        `,
    ],
    [
        'instanceof expression',
        `
            void foo(Object obj) {
                if (obj instanceof String) {}
            }
        `,
    ],
    [
        'constructor call',
        `
            void foo() {
                Foo foo = new Foo();
            }
        `,
    ],
    [
        'generic constructor call',
        `
            void foo() {
                List<String> list = new ArrayList<>();
            }
        `,
    ],
    [
        'array creation',
        `
            void foo() {
                int[] values = new int[10];
            }
        `,
    ],
    [
        'array access',
        `
            void foo() {
                int x = values[0];
            }
        `,
    ],
    [
        'field access',
        `
            void foo() {
                object.field = 10;
            }
        `,
    ],
    [
        'this reference',
        `
            class Foo {
                int x;

                void bar() {
                    this.x = 5;
                }
            }
        `,
    ],
    [
        'super method call',
        `
            class Foo extends Bar {
                void bar() {
                    super.bar();
                }
            }
        `,
    ],
    [
        'method chain',
        `
            void foo() {
                object.foo().bar().baz();
            }
        `,
    ],
    [
        'parenthesized expression',
        `
            void foo() {
                int x = (a + b) * c;
            }
        `,
    ],
    [
        'unary operators',
        `
            void foo() {
                int x = -value;
                boolean y = !flag;
            }
        `,
    ],
    [
        'increment and decrement',
        `
            void foo() {
                i++;
                --j;
            }
        `,
    ],
    [
        'complex expression',
        `
            void foo() {
                result = foo(bar + 1, new Box<>(value)).get().size();
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
