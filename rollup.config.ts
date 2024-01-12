import { defineConfig } from 'rollup'
import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import zipPlugin from './scripts/rollupPluginZip'
import json from '@rollup/plugin-json'
import addShebangPlugin from './scripts/rollupPluginAddShebang'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    json(),
    typescript(),
    terser(),
    addShebangPlugin({ include: 'dist/**/**.js' }),
    zipPlugin({ outputDir: 'zipDist' }),
  ],
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      esModule: false,
      sourcemap: true,
    },
    {
      format: 'es',
      file: pkg.module,
      sourcemap: false,
    },
    {
      format: 'iife',
      file: pkg.jsdelivr,
      name: 'Test',
      extend: true,
      globals: {},
    },
  ],
})
