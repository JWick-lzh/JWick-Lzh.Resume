# 更新日志 (CHANGELOG)

## [2026-02-28] - 联系表单邮件发送功能

### 新增
- 集成 [EmailJS](https://www.emailjs.com/) 纯前端邮件发送服务
- 联系表单（Contact）支持真实邮件发送至 QQ 邮箱
- 添加 Toast 通知反馈（成功 / 失败提示）
- 添加发送失败时的备用联系方式提示

### 修改
- `src/sections/Contact.tsx` - 替换模拟提交为 EmailJS API 真实发送
- `package.json` - 新增 `@emailjs/browser` 依赖

---

## [2026-02-27] - 简历内容同步更新

### 修改
- 同步 `resume.md` 最新内容到所有组件
- 更新 About、Experience、Works 等模块数据
