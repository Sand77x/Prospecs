import { verify } from '../src/test.js';

const cases = [
    [
        'miscolored params',
        `
            void foo(String x, int y) {}
            void bar(int x, String y) {}
            void baz(int x, char y) {}
            void mer(String x, Integer y) {}
        `,
    ],
    [
        'method ref',
        `
            java.util.Collections.emptyList();
            String.util.Collections.emptyList();
            String.util.field;
            String::println;
        `,
    ],
    [
        'miscolored params + records',
        `
            record Point(int x, int y) {}
            record Point(String x, int y) {}
            record Box<T>(T value) {}
            class Point(int x, int y) {}
            void bar(int x, int y);
            foo(x, y);
            class Point {
                Point(int x, int y) {}
            }

        `,
    ],
    [
        'annotation names params',
        `
            @MyAnnotation(msg = "hello")
            @MyAnnotation(value = @Inner(Foo.class))
            @MyAnnotation(as = ArrayList.class)
        `,
    ],
    [
        'super constructor call',
        `
            class Foo extends Bar {
                public final ERM = 3;
                Foo() { super(); }
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
