import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('records', () => {
    test('empty record', (t) => {
        const input = `
            record Point() {}
        `;

        verify(input, t);
    });

    test('record with components', (t) => {
        const input = `
            record Point(int x, int y) {}
        `;

        verify(input, t);
    });

    test('generic record', (t) => {
        const input = `
            record Box<T>(T value) {}
        `;

        verify(input, t);
    });

    test('record implements interface', (t) => {
        const input = `
            record Point(int x, int y) implements Serializable {}
        `;

        verify(input, t);
    });

    test('record with compact constructor', (t) => {
        const input = `
            record Point(int x, int y) {
                Point {
                    if (x < 0) throw new IllegalArgumentException();
                }
            }
        `;

        verify(input, t);
    });

    test('record with canonical constructor', (t) => {
        const input = `
            record Point(int x, int y) {
                Point(int x, int y) {
                    this.x = x;
                    this.y = y;
                }
            }
        `;

        verify(input, t);
    });

    test('record with method', (t) => {
        const input = `
            record Point(int x, int y) {
                int sum() {
                    return x + y;
                }
            }
        `;

        verify(input, t);
    });

    test('record with static field', (t) => {
        const input = `
            record Point(int x, int y) {
                static final int ORIGIN = 0;
            }
        `;

        verify(input, t);
    });

    test('annotated record', (t) => {
        const input = `
            @Deprecated
            record Point(int x, int y) {}
        `;

        verify(input, t);
    });

    test('annotated record component', (t) => {
        const input = `
            record User(@Nullable String name, int age) {}
        `;

        verify(input, t);
    });
});
