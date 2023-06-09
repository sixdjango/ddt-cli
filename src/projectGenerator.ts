// src/projectGenerator.ts
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import { ProjectTemplate } from './enum';


export async function generateProject(template: ProjectTemplate) {
  const projectName = await promptForProjectName();
  const projectDir = path.join(process.cwd(), projectName);

  switch (template) {
    case ProjectTemplate.Vue3:
      generateVueCliProject(projectDir);
      break;
    case ProjectTemplate.Nuxt:
      generateNuxtProject(projectDir);
      break;
    case ProjectTemplate.Express:
      generateExpressProject(projectDir);
      break;
    case ProjectTemplate.NPM:
      generateNPMProject(projectDir);
      break;
    // 处理其他项目模板
    default:
      console.log('未知的项目模板，请重新选择.');
      break;
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
  ]);
  return projectName;
}

function generateExpressProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/express-ts-template.git'
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' });
  removeGitFolder(projectDir)
}

function generateVueCliProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/vitesse.git';
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' });

  removeGitFolder(projectDir)
}

function generateNuxtProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/vitesse-nuxt3.git';
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' });

  removeGitFolder(projectDir)
}

function generateNPMProject(projectDir: string) {
  const templateRepoUrl = 'https://github.com/sixdjango/npm-project-template.git';
  execSync(`git clone ${templateRepoUrl} ${projectDir}`, { stdio: 'inherit' });

  removeGitFolder(projectDir)
}

function removeGitFolder(projectDir: string) {
  const gitFolderPath = path.join(projectDir, '.git');

  if (fs.existsSync(gitFolderPath)) {
    fs.rmSync(gitFolderPath, { recursive: true, force: true });
  }
}