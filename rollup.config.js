import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

export default [{
  input: 'src/js/index',
  output: [{
    file: pkg.main,
    format: 'es',
  }],
  external: [
    'react',
    'react-dom',
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass'],
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true,
      presets: ['@babel/preset-typescript', '@babel/preset-react'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    scss(),
    globals(),
    (process.env.BUILD === 'production' && terser()),
  ],
}, {
  input: 'testing/index.jsx',
  output: {
    file: 'testing/bundle.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass'],
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-typescript', '@babel/preset-react'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs({
      include: ['node_modules/**'],
      extensions: ['.js', '.jsx'],
      namedExports: {
        'node_modules/react/index.js': ['useState', 'useCallback'],
      },
    }),
    scss(),
    globals(),
  ],
}];
