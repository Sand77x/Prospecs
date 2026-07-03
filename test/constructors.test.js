import { verify } from '../src/test.js';

const cases = [
    [
        'default constructor',
        `
            class Foo {
                Foo() {}
            }
        `,
    ],
    [
        'constructor with parameters',
        `
            class Foo {
                Foo(int x, String name) {}
            }
        `,
    ],
    [
        'constructor assignment',
        `
            class Foo {
                int x;

                Foo(int x) {
                    this.x = x;
                }
            }
        `,
    ],
    [
        'overloaded constructors',
        `
            class Foo {
                Foo() {}
                Foo(int x) {}
            }
        `,
    ],
    [
        'constructor chaining',
        `
            class Foo {
                Foo() {
                    this(0);
                }

                Foo(int x) {}
            }
        `,
    ],
    [
        'super constructor call',
        `
            class Foo extends Bar {
                Foo() {
                    super();
                }
            }
        `,
    ],
    [
        'annotated constructor',
        `
            class Foo {
                @Inject
                Foo(Service service) {}
            }
        `,
    ],
    [
        'generic constructor parameter',
        `
            class Foo {
                Foo(List<String> values) {}
            }
        `,
    ],
    [
        'throws constructor',
        `
            class Foo {
                Foo() throws IOException {}
            }
        `,
    ],
    [
        'constructor with method call',
        `
            class Foo {
                Foo() {
                    initialize();
                }
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
