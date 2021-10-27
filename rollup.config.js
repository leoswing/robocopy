import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

import { name, version, author } from './package.json';

const banner =
  `${'/*!\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      // sourcemap: process.env.NODE_ENV === 'production',
      exports: 'named',
      banner
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false,
      banner
    },
  ],
  plugins: [
    typescript(),
    commonjs(),
    nodeResolve(),
    buble({ transforms: { asyncAwait: false } }),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(terser());
}

export default config;
