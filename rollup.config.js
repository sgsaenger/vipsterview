import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'vipster-js-widget',
        amd: {
            id: 'vipster-js-widget'
        },
        globals: {
            '@jupyter-widgets/base': 'base'
        }
    },
    external: [ '@jupyter-widgets/base' ],
    plugins: [
        resolve()
    ]
}
