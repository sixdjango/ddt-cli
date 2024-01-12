// src/projectGenerator.ts
import { execSync } from 'child_process'
// 对于 'fs' 和 'path'
import * as fs from 'fs'
import * as path from 'path'
import inquirer from 'inquirer'
import { ProjectTemplate } from './enum'

export async function generateProject(template: ProjectTemplate) {
  const projectName = await promptForProjectName()
  const projectDir = path.join(process.cwd(), projectName)

  switch (template) {
    case ProjectTemplate.Vue3:
      generateVueCliProject(projectDir)
      break
    case ProjectTemplate.Nuxt:
      generateNuxtProject(projectDir)
      break
    case ProjectTemplate.Express:
      generateExpressProject(projectDir)
      break
    case ProjectTemplate.NPM:
      generateNPMProject(projectDir)
      break
    case ProjectTemplate.NPM_COMPONENT:
      generateNPM_COMPONENTProject(projectDir)
      break
    case ProjectTemplate.React:
      generateReactProject(projectDir)
      break
    case ProjectTemplate.WASM:
      generateWASMProject(projectDir)
      break
    // 处理其他项目模板
    default:
      console.log('未知的项目模板，请重新选择.')
      break
  }
}

async function promptForProjectName(): Promise<string> {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称:',
      validate: (input: string) => !!input || '项目名称不能为空',
    },
  ])
  return projectName
}

function generateExpressProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/express-ts-template.git'
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' })
  removeGitFolder(projectDir)
}

function generateVueCliProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/vitesse.git'
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' })

  removeGitFolder(projectDir)
}

function generateNuxtProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/vitesse-nuxt3.git'
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' })

  removeGitFolder(projectDir)
}

function generateNPMProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/ts-lib-rollup-starter.git'
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' })

  removeGitFolder(projectDir)
}

function generateNPM_COMPONENTProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/ts-react-component-lib-starter.git'
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' })

  removeGitFolder(projectDir)
}

function generateWASMProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/wasm-pack-starter.git'
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' })

  removeGitFolder(projectDir)
}

function generateReactProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/react-vite-templete.git'
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' })
  removeGitFolder(projectDir)
}

function removeGitFolder(projectDir: string) {
  const gitFolderPath = path.join(projectDir, '.git')

  if (fs.existsSync(gitFolderPath)) {
    fs.rmSync(gitFolderPath, { recursive: true, force: true })
  }
}
