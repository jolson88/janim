module.exports = {
    out: './docs',
    includes: './src',
    exclude: [
        '**/*.test.ts',
        '**/janim.ts',
        '**/testHelpers.ts'
    ],
    mode: 'modules',
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true
};
