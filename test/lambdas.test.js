import { verify } from '../src/test.js';

const cases = [
    [
        'simple lambda',
        `
            Function<Integer, Integer> f = x -> x + 1;
        `,
    ],
    [
        'lambda with parentheses',
        `
            BiFunction<Integer, Integer, Integer> f = (a, b) -> a + b;
        `,
    ],
    [
        'lambda block body',
        `
            Runnable r = () -> {
                System.out.println("hello");
            };
        `,
    ],
    [
        'lambda with multiple statements',
        `
            Runnable r = () -> {
                int x = 10;
                System.out.println(x);
            };
        `,
    ],
    [
        'lambda in method call',
        `
            list.forEach(x -> System.out.println(x));
        `,
    ],
    [
        'lambda with type inference',
        `
            list.stream().map(x -> x.toString());
        `,
    ],
    [
        'method reference',
        `
            list.forEach(System.out::println);
        `,
    ],
    [
        'static method reference',
        `
            Function<String, Integer> f = Integer::parseInt;
        `,
    ],
    [
        'constructor reference',
        `
            Supplier<List<String>> s = ArrayList::new;
        `,
    ],
    [
        'generic lambda context',
        `
            Function<List<String>, Integer> f = list -> list.size();
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
