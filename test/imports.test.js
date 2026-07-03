import { verify } from '../src/test.js';

const cases = [
    [
        'package declaration',
        `
            package com.example.app;
        `,
    ],
    [
        'nested package',
        `
            package com.example.project.parser;
        `,
    ],
    [
        'single import',
        `
            import java.util.List;
        `,
    ],
    [
        'multiple imports',
        `
            import java.util.List;
            import java.util.Map;
        `,
    ],
    [
        'wildcard import',
        `
            import java.util.*;
        `,
    ],
    [
        'static import',
        `
            import static java.lang.Math.max;
        `,
    ],
    [
        'static wildcard import',
        `
            import static java.lang.Math.*;
        `,
    ],
    [
        'package and imports',
        `
            package com.example;

            import java.util.List;
            import java.util.Map;

            class Test {}
        `,
    ],
    [
        'generic import usage',
        `
            import java.util.List;

            class Test {
                List<String> names;
            }
        `,
    ],
    [
        'fully qualified type',
        `
            class Test {
                java.util.List<String> names;
            }
        `,
    ],
];

for (const [name, input] of cases) {
    verify(name, input);
}
