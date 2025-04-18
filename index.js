#!/usr/bin/env node

// 设置脚本为 node 可执行
import prompts from 'prompts'
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

// 获取当前文件目录（兼容 ES 模块）
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 模板目录
const templatesDir = path.resolve(__dirname, 'templates')

// 读取模板列表
const templates = readdirSync(templatesDir).filter(name =>
    statSync(path.join(templatesDir, name)).isDirectory()
)

const { projectName, template } = await prompts([
    {
        type: 'text',
        name: 'projectName',
        message: '请输入项目名称：',
        initial: 'my-project',
    },
    {
        type: 'select',
        name: 'template',
        message: '请选择模板：',
        choices: templates.map(name => ({ title: name, value: name })),
    },
])

const targetDir = path.resolve(process.cwd(), projectName)
const templateDir = path.join(templatesDir, template)

// 复制目录函数
function copyDir(src, dest) {
    mkdirSync(dest, { recursive: true })
    const entries = readdirSync(src)
    for (const entry of entries) {
        const srcPath = path.join(src, entry)
        const destPath = path.join(dest, entry)
        if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath)
        } else {
            copyFileSync(srcPath, destPath)
        }
    }
}

// 复制模板内容
copyDir(templateDir, targetDir)

console.log(`✅ 项目 ${projectName} 创建成功！`)

// 检查 pnpm 是否已安装
try {
    execSync('pnpm -v', { stdio: 'ignore' })
} catch (e) {
    console.log('\n❗ 请先安装 pnpm：')
    console.log('👉 npm install -g pnpm\n')
    process.exit(1)
}

// 安装依赖
console.log(`📦 正在安装依赖...`)
execSync('pnpm install', { cwd: targetDir, stdio: 'inherit' })

// 使用提示
console.log('\n🚀 项目初始化完成！你可以执行以下命令开始开发：')
console.log(`cd ${projectName}`)
console.log(`pnpm dev`)