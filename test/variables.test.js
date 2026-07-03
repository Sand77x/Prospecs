import { verify } from "../src/test.js";

const cases = [
    [
        "simple local variable",
        `
            void foo() {
                int x;
            }
        `,
    ],
    [
        "initialized variable",
        `
            void foo() {
                int x = 42;
            }
        `,
    ],
    [
        "multiple variables",
        `
            void foo() {
                int x, y, z;
            }
        `,
    ],
    [
        "generic variable",
        `
            void foo() {
                List<String> names = new ArrayList<>();
            }
        `,
    ],
    [
        "array variable",
        `
            void foo() {
                int[] numbers = new int[10];
            }
        `,
    ],
    [
        "var inference",
        `
            void foo() {
                var name = "John";
            }
        `,
    ],
    [
        "variable from method call",
        `
            void foo() {
                String name = getName();
            }
        `,
    ],
    [
        "variable from constructor",
        `
            void foo() {
                Foo foo = new Foo();
            }
        `,
    ],
    [
        "variable assignment",
        `
            void foo() {
                int x = 0;
                x = 5;
            }
        `,
    ],
    [
        "variable shadowing field",
        `
            class Foo {
                int x;

                void bar() {
                    int x = 10;
                }
            }
        `,
    ],
    [
        "for loop variable",
        `
            void foo() {
                for (int i = 0; i < 10; i++) {}
            }
        `,
    ],
    [
        "enhanced for variable",
        `
            void foo() {
                for (String name : names) {}
            }
        `,
    ],
    [
        "catch variable",
        `
            void foo() {
                try {
                } catch (Exception e) {
                }
            }
        `,
    ],
    [
        "try with resources variable",
        `
            void foo() {
                try (InputStream in = open()) {
                }
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
