import { describe, test } from 'node:test';
import { verify } from './test.js';

describe('packages and imports', () => {
    test('package declaration', (t) => {
        const input = `
            package com.example.app;
        `;

        verify(input, t);
    });

    test('nested package', (t) => {
        const input = `
            package com.example.project.parser;
        `;

        verify(input, t);
    });

    test('single import', (t) => {
        const input = `
            import java.util.List;
        `;

        verify(input, t);
    });

    test('multiple imports', (t) => {
        const input = `
            import java.util.List;
            import java.util.Map;
        `;

        verify(input, t);
    });

    test('wildcard import', (t) => {
        const input = `
            import java.util.*;
        `;

        verify(input, t);
    });

    test('static import', (t) => {
        const input = `
            import static java.lang.Math.max;
        `;

        verify(input, t);
    });

    test('static wildcard import', (t) => {
        const input = `
            import static java.lang.Math.*;
        `;

        verify(input, t);
    });

    test('package and imports', (t) => {
        const input = `
            package com.example;

            import java.util.List;
            import java.util.Map;

            class Test {}
        `;

        verify(input, t);
    });

    test('generic import usage', (t) => {
        const input = `
            import java.util.List;

            class Test {
                List<String> names;
            }
        `;

        verify(input, t);
    });

    test('fully qualified type', (t) => {
        const input = `
            class Test {
                java.util.List<String> names;
            }
        `;

        verify(input, t);
    });
});
