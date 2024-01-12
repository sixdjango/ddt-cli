## ddt-cli

本项目是一个快速创建并 clone 到本地的 cli 工具

### ci

> 当把`tag` push到远程仓库（github）时，会自动触发 ci cd

- 自动 publish 到 `npm` 如果 `package.json` 中的 `version` 属性与 `npm` 中的版本重复，则取消这次部署
- 自动生成 `release` 版本
