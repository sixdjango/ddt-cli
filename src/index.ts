// src/index.ts
import inquirer from 'inquirer'
import { ProjectTemplate } from './enum'
import { generateProject } from './projectGenerator'

// 对于 JSON 文件
import * as pkg from '../package.json'
import 'tslib'

const version = pkg.version

// 查看版本号
if (process.argv.includes('-v') || process.argv.includes('--version')) {
  console.log(version)
  process.exit(0)
}

async function main() {
  const { projectChoice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectChoice',
      message: '请选择一个项目模板:',
      choices: [
        ProjectTemplate.Vue3,
        ProjectTemplate.Nuxt,
        ProjectTemplate.Express,
        ProjectTemplate.NPM,
        ProjectTemplate.React,
        // 添加更多项目模板选项
      ],
    },
  ])

  await generateProject(projectChoice)
}

main()
