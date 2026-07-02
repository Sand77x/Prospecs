import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('lambdas', () => {
    test('simple lambda', (t) => {
        const input = `
            Function<Integer, Integer> f = x -> x + 1;
        `;

        verify(input, t);
    });

    test('lambda with parentheses', (t) => {
        const input = `
            BiFunction<Integer, Integer, Integer> f = (a, b) -> a + b;
        `;

        verify(input, t);
    });

    test('lambda block body', (t) => {
        const input = `
            Runnable r = () -> {
                System.out.println("hello");
            };
        `;

        verify(input, t);
    });

    test('lambda with multiple statements', (t) => {
        const input = `
            Runnable r = () -> {
                int x = 10;
                System.out.println(x);
            };
        `;

        verify(input, t);
    });

    test('lambda in method call', (t) => {
        const input = `
            list.forEach(x -> System.out.println(x));
        `;

        verify(input, t);
    });

    test('lambda with type inference', (t) => {
        const input = `
            list.stream().map(x -> x.toString());
        `;

        verify(input, t);
    });

    test('method reference', (t) => {
        const input = `
            list.forEach(System.out::println);
        `;

        verify(input, t);
    });

    test('static method reference', (t) => {
        const input = `
            Function<String, Integer> f = Integer::parseInt;
        `;

        verify(input, t);
    });

    test('constructor reference', (t) => {
        const input = `
            Supplier<List<String>> s = ArrayList::new;
        `;

        verify(input, t);
    });

    test('generic lambda context', (t) => {
        const input = `
            Function<List<String>, Integer> f = list -> list.size();
        `;

        verify(input, t);
    });
});
