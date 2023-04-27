// src/replaceValues.ts
import fs from 'fs';
import path from 'path';

export async function replaceValuesInTemplate(projectDir: string, projectName: string) {
  const packageJsonPath = path.join(projectDir, 'package.json');
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // 替换项目名称
  packageJson.name = projectName;

  // 如果需要替换其他值，可以在这里添加逻辑

  // 将修改后的内容写回 package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
