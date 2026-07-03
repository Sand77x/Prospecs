import { verify } from '../src/test.js';

const cases = [
    [
        'empty record',
        `
            record Point() {}
        `,
    ],
    [
        'record with components',
        `
            record Point(int x, int y) {}
        `,
    ],
    [
        'generic record',
        `
            record Box<T>(T value) {}
        `,
    ],
    [
        'record implements interface',
        `
            record Point(int x, int y) implements Serializable {}
        `,
    ],
    [
        'record with compact constructor',
        `
            record Point(int x, int y) {
                Point {
                    if (x < 0) throw new IllegalArgumentException();
                }
            }
        `,
    ],
    [
        'record with canonical constructor',
        `
            record Point(int x, int y) {
                Point(int x, int y) {
                    this.x = x;
                    this.y = y;
                }
            }
        `,
    ],
    [
        'record with method',
        `
            record Point(int x, int y) {
                int sum() {
                    return x + y;
                }
            }
        `,
    ],
    [
        'record with static field',
        `
            record Point(int x, int y) {
                static final int ORIGIN = 0;
            }
        `,
    ],
    [
        'annotated record',
        `
            @Deprecated
            record Point(int x, int y) {}
        `,
    ],
    [
        'annotated record component',
        `
            record User(@Nullable String name, int age) {}
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
