import { verify } from '../src/test.js';

const cases = [
    [
        'empty enum',
        `
            enum Color {}
        `,
    ],
    [
        'simple enum',
        `
            enum Color {
                RED, GREEN, BLUE
            }
        `,
    ],
    [
        'enum with semicolon',
        `
            enum Color {
                RED, GREEN, BLUE;
            }
        `,
    ],
    [
        'enum with field',
        `
            enum Color {
                RED;

                private int value;
            }
        `,
    ],
    [
        'enum with constructor',
        `
            enum Color {
                RED(1);

                private final int value;

                Color(int value) {
                    this.value = value;
                }
            }
        `,
    ],
    [
        'enum with method',
        `
            enum Color {
                RED;

                int value() {
                    return 1;
                }
            }
        `,
    ],
    [
        'enum implements interface',
        `
            enum Color implements Serializable {
                RED;
            }
        `,
    ],
    [
        'generic field in enum',
        `
            enum Test {
                A;

                List<String> values;
            }
        `,
    ],
    [
        'annotated enum',
        `
            @Deprecated
            enum Color {
                RED
            }
        `,
    ],
    [
        'enum constant with class body',
        `
            enum Operation {
                ADD {
                    void apply() {}
                };
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
