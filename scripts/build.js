import { execSync } from 'child_process'
import { rimraf } from 'rimraf'
import { rollup } from 'rollup'
import fs from 'fs-extra'
import chalk from 'chalk'
import path from 'path'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const packageDir = path.resolve('packages/vue-middleware')
const entryFilePath = path.resolve(packageDir, 'src/index.ts')
const outputDir = path.resolve(packageDir, 'dist')
const tsconfigPath = path.resolve(packageDir, 'tsconfig.json')

function generateConfig(format) {
  const extension = format === 'es'
    ? 'esm.js'
    : format === 'umd'
      ? 'js'
      : 'cjs'

  return {
    input: entryFilePath,
    external: ['vue', 'vue-router'],
    plugins: [
      typescript({
        tsconfig: tsconfigPath,
        declarationDir: outputDir,
        declaration: true,
        allowImportingTsExtensions: false,
        sourceMap: false,
      }),
    ],
    output: {
      format,
      name: format === 'umd' ? 'vue-middleware' : undefined,
      exports: format === 'umd' || format === 'cjs' ? 'named' : undefined,
      globals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
      },
    },
    fileName: `vue-middleware.${extension}`,
  }
}

async function build() {
  rimraf.sync(outputDir)

  console.log(chalk.blackBright('⏳ Building library ./dist\n'))

  const formats = ['umd', 'es', 'cjs']

  for (const format of formats) {
    const { output, fileName, ...rest } = await generateConfig(format)
    const bundle = await rollup(rest)
    const { output: [{ code }] } = await bundle.generate(output)

    fs.outputFileSync(
      path.join(outputDir, fileName), code
    )
    console.log(chalk.cyan(`-> Generated library file ./dist/${fileName}`))
  }

  console.log(chalk.blackBright('\n⏳ Generating declarations...'))

  execSync(`tsc --project ${tsconfigPath}`, {
    stdio: 'inherit',
  })

  const dtsBundle = await rollup({
    input: path.resolve(outputDir, 'types/index.d.ts'),
    plugins: [dts()],
  })

  const { output: [{ code }] } = await dtsBundle.generate({
    format: 'es',
  })

  fs.outputFileSync(path.join(outputDir, 'vue-middleware.d.ts'), code)

  console.log(chalk.cyan('\n-> Declarations generated: vue-middleware.d.ts'))

  rimraf.sync(path.resolve(outputDir, 'types'))
}

build().catch((error) => {
  console.error(error)
  process.exit(1)
})
