import test, { describe } from 'node:test';
import { verify } from './test.js';

describe('generics', () => {
    test('simple generic', (t) => {
        const input = `
            List<String> list;
        `;

        verify(input, t);
    });

    test('nested generics', (t) => {
        const input = `
            Map<String, List<Integer>> map;
        `;

        verify(input, t);
    });

    test('deeply nested generics', (t) => {
        const input = `
            Optional<List<Map<String, Integer>>> optional;
        `;

        verify(input, t);
    });

    test('generic method parameter', (t) => {
        const input = `
            void foo(List<Collection<String>> param) {}
        `;

        verify(input, t);
    });

    test('generic return type', (t) => {
        const input = `
            Collection<String> foo() {
                return null;
            }
        `;

        verify(input, t);
    });

    test('multiple generic parameters', (t) => {
        const input = `
            Map<String, Integer> map;
        `;

        verify(input, t);
    });

    test('wildcard', (t) => {
        const input = `
            List<?> list;
        `;

        verify(input, t);
    });

    test('extends wildcard', (t) => {
        const input = `
            List<? extends Number> numbers;
        `;

        verify(input, t);
    });

    test('super wildcard', (t) => {
        const input = `
            List<? super Integer> numbers;
        `;

        verify(input, t);
    });

    test('generic class declaration', (t) => {
        const input = `
            class Box<T> {}
        `;

        verify(input, t);
    });

    test('multiple type parameters', (t) => {
        const input = `
            class Pair<K, V> {}
        `;

        verify(input, t);
    });

    test('generic method', (t) => {
        const input = `
            <T> T identity(T value) {
                return value;
            }
        `;

        verify(input, t);
    });

    test('bounded type parameter', (t) => {
        const input = `
            class Box<T extends Number> {}
        `;

        verify(input, t);
    });

    test('multiple bounds', (t) => {
        const input = `
            class Box<T extends Number & Comparable<T>> {}
        `;

        verify(input, t);
    });
});
