import { verify } from '../src/test.js';

const cases = [
    [
        'marker annotation',
        `
            @Override
            public String toString() {
                return "";
            }
        `,
    ],
    [
        'annotation with single value',
        `
            @SuppressWarnings("unchecked")
            void foo() {}
        `,
    ],
    [
        'annotation with named arguments',
        `
            @RequestMapping(path = "/users", method = GET)
            void foo() {}
        `,
    ],
    [
        'multiple annotations diff line',
        `
            @A
            @B
            class Test {}
        `,
    ],
    [
        'multiple annotations same line',
        `
            @A @B
            class Test {}
        `,
    ],
    [
        'annotation on parameter',
        `
            void foo(@Nullable String name) {}
        `,
    ],
    [
        'annotation with array argument',
        `
            @SuppressWarnings({"unchecked", "rawtypes"})
            void foo() {}
        `,
    ],
    [
        'qualified annotation',
        `
            @com.example.MyAnnotation
            void foo() {}
        `,
    ],
    [
        'multiple qualified annotation',
        `
            @com.example.MyAnnotation @org.junit.jupiter.api.Test
            void foo() {}
        `,
    ],
    [
        'qualified annotation inline',
        `
            @com.example.MyAnnotation void foo() {}
        `,
    ],
    [
        'qualified annotation with arg inline',
        `
            @com.example.MyAnnotation(msg = "hello") void foo() {}
        `,
    ],
    [
        'nested annotation',
        `
            @Outer(@Inner("value"))
            class Test {}
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
