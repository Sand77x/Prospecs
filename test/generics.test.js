import { verify } from '../src/test.js';

const cases = [
    [
        'simple generic',
        `
            List<String> list;
        `,
    ],
    [
        'nested generics',
        `
            Map<String, List<Integer>> map;
        `,
    ],
    [
        'deeply nested generics',
        `
            Optional<List<Map<String, Integer>>> optional;
        `,
    ],
    [
        'generic method parameter',
        `
            void foo(List<Collection<String>> param) {}
        `,
    ],
    [
        'generic return type',
        `
            Collection<String> foo() {
                return null;
            }
        `,
    ],
    [
        'multiple generic parameters',
        `
            Map<String, Integer> map;
        `,
    ],
    [
        'wildcard',
        `
            List<?> list;
        `,
    ],
    [
        'extends wildcard',
        `
            List<? extends Number> numbers;
        `,
    ],
    [
        'super wildcard',
        `
            List<? super Integer> numbers;
        `,
    ],
    [
        'generic class declaration',
        `
            class Box<T> {}
        `,
    ],
    [
        'multiple type parameters',
        `
            class Pair<K, V> {}
        `,
    ],
    [
        'generic method',
        `
            <T> T identity(T value) {
                return value;
            }
        `,
    ],
    [
        'bounded type parameter',
        `
            class Box<T extends Number> {}
        `,
    ],
    [
        'multiple bounds',
        `
            class Box<T extends Number & Comparable<T>> {}
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
