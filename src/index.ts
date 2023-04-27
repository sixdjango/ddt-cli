// src/index.ts
import inquirer from 'inquirer';
import { ProjectTemplate } from './enum';
import { generateProject } from './projectGenerator';
import pkg from '../package.json'


const version = pkg.version;

// 查看版本号
if (process.argv.includes('-v') || process.argv.includes('--version')) {
  console.log(version);
  process.exit(0);
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
        ProjectTemplate.Express
        // 添加更多项目模板选项
      ],
    },
  ]);

  switch (projectChoice) {
    case ProjectTemplate.Vue3:
      await generateProject(projectChoice);
      break;
    case ProjectTemplate.Nuxt:
      await generateProject(projectChoice);
      break;
    case ProjectTemplate.Express:
      await generateProject(projectChoice);
      break;
    // 处理其他项目模板
    default:
      console.log('未知的项目模板，请重新选择.');
      break;
  }
}

main();
