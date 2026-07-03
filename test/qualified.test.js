import { verify } from '../src/test.js';

const cases = [
    [
        'field access',
        `
            foo.bar;
        `,
    ],
    [
        'nested field access',
        `
            foo.bar.baz;
        `,
    ],
    [
        'qualified method call',
        `
            foo.bar();
        `,
    ],
    [
        'nested qualified method call',
        `
            foo.bar().baz();
        `,
    ],
    [
        'static method call',
        `
            Math.max(a, b);
        `,
    ],
    [
        'static field access',
        `
            System.out;
        `,
    ],
    [
        'chained static access',
        `
            System.out.println("Hello");
        `,
    ],
    [
        'qualified this access',
        `
            Outer.this.value;
        `,
    ],
    [
        'qualified super method call',
        `
            Outer.super.foo();
        `,
    ],
    [
        'class literal',
        `
            String.class;
        `,
    ],
    [
        'qualified enum constant',
        `
            Day.MONDAY;
        `,
    ],
    [
        'qualified generic type',
        `
            java.util.List<String> list;
        `,
    ],
    [
        'fully qualified static method',
        `
            java.util.Collections.emptyList();
        `,
    ],
    [
        'method call followed by field access',
        `
            foo.getBar().value;
        `,
    ],
    [
        'field access followed by method call',
        `
            foo.bar.baz();
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
