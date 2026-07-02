import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('annotations', () => {
    test('marker annotation', (t) => {
        const input = `
            @Override
            public String toString() {
                return "";
            }
        `;

        verify(input, t);
    });

    test('annotation with single value', (t) => {
        const input = `
            @SuppressWarnings("unchecked")
            void foo() {}
        `;

        verify(input, t);
    });

    test('annotation with named arguments', (t) => {
        const input = `
            @RequestMapping(path = "/users", method = GET)
            void foo() {}
        `;

        verify(input, t);
    });

    test('multiple annotations', (t) => {
        const input = `
            @A
            @B
            class Test {}
        `;

        verify(input, t);
    });

    test('multiple annotations same line', (t) => {
        const input = `
            @A @B
            class Test {}
        `;

        verify(input, t);
    });

    test('annotation on parameter', (t) => {
        const input = `
            void foo(@Nullable String name) {}
        `;

        verify(input, t);
    });

    test('annotation on field', (t) => {
        const input = `
            @Inject
            private Service service;
        `;

        verify(input, t);
    });

    test('annotation with array argument', (t) => {
        const input = `
            @SuppressWarnings({"unchecked", "rawtypes"})
            void foo() {}
        `;

        verify(input, t);
    });

    test('nested annotation', (t) => {
        const input = `
            @Outer(@Inner("value"))
            class Test {}
        `;

        verify(input, t);
    });
});
