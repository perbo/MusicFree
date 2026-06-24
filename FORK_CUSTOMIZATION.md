# MusicFree 自用定制说明

本分支在 [maotoumao/MusicFree](https://github.com/maotoumao/MusicFree) 基础上做了本地自用相关改动，便于与官方 Release 并存安装、日常听歌与插件维护。

## 构建与安装

### 测试包（推荐自用）

与正式版 **并存安装**（包名 `fun.upup.musicfree.test`，应用名「MusicFree 测试」）：

```bash
npm run build-android-test
```

产物路径：

```
android/app/build/outputs/apk/preview/app-preview.apk
```

- 单架构 **arm64-v8a**（面向华为 P30 Pro 等 64 位 ARM 真机），体积约 12MB
- 开启 R8 压缩与资源裁剪
- 使用 debug 签名，无需配置 `keystore.properties`

### 正式 Release 包

```bash
cd android && ./gradlew assembleRelease
```

- 包名 `fun.upup.musicfree`，与商店/官方版相同，会覆盖安装
- 按 ABI 分包输出多个 APK
- 需在 `android/keystore.properties` 配置正式签名（未配置时回退 debug 签名）

### preview 与 release 的区别

| 项目 | preview（测试） | release（正式） |
|------|----------------|----------------|
| 包名 | `fun.upup.musicfree.test` | `fun.upup.musicfree` |
| 应用名 | MusicFree 测试 | MusicFree |
| 代码压缩 | 是 | 否（当前配置） |
| ABI | 脚本指定单架构 | 多架构分包 |
| 签名 | debug | 正式 keystore（可选） |

## 功能改动摘要

### 1. 随机播放

- 新增 `src/utils/shuffle.ts`：Fisher-Yates 洗牌，使用 `crypto.getRandomValues` 提高随机性
- 切换随机模式、替换播放列表时会重新洗牌
- 恢复播放时不再对已有队列二次洗牌

### 2. 本地音乐扫描去重

- `normalizeLocalPath` 规范化本地路径
- 扫描时按路径与 platform/id 去重，避免同文件重复入库（如华为等设备上的路径差异）

### 3. 歌单播放队列

- 在歌单/专辑内点单曲时，统一走 `playWithReplacePlayList` 替换当前队列
- 「播放歌曲」模式仅替换为当前一首；「播放专辑」模式替换为整个歌单
- 随机模式下在 **当前歌单** 内洗牌，避免播完后回到之前的本地音乐队列

### 4. 播放稳定性

- 无效或占位 URL 不再进入「假播放」状态
- 播放失败时走 `handlePlayFail` 处理
- 猫耳 FM：优先使用 CDN m4a 直链，规避部分 DRM HLS 无声问题
- 修正带 query 参数的 `.m3u8` 扩展名识别

### 5. 默认插件

- 启动时自动补装 **网易云**、**腾讯音乐**（ThomasBy2025 源）
- 首次启动从聚合源预装常用插件（酷狗、酷我、小蜗、bilibili、歌词、WebDAV、猫耳 FM 等）
- 相关配置见 `src/constants/defaultPlugins.ts`

### 6. 已移除的 App 自身功能

- 应用内 **检查更新**（侧边栏入口、启动检测、`checkUpdate` 相关逻辑）
- 关于页部分冗余展示已精简

**保留**：插件安装、更新、订阅及管理界面。

## 主要涉及文件

| 模块 | 路径 |
|------|------|
| 播放器 | `src/core/trackPlayer/index.ts` |
| 洗牌工具 | `src/utils/shuffle.ts` |
| 本地扫描 | `src/core/localMusicSheet.ts`, `src/utils/mediaUtils.ts` |
| 歌单点击 | `src/components/musicSheetPage/components/sheetMusicList.tsx` |
| 默认插件 | `src/constants/defaultPlugins.ts`, `src/core/pluginManager/bootstrapDefaultPlugins.ts` |
| 插件逻辑 | `src/core/pluginManager/plugin.ts` |
| 猫耳 FM | `src/utils/missevanSource.ts` |
| Android 构建 | `android/app/build.gradle` |

## 使用提示

1. **歌单内随机播放**：进入歌单后点「播放全部」，或设置 → 基本设置 → 点击专辑内单曲时 → **播放专辑**，并保持随机模式。
2. **与官方版并存**：安装 `preview` 测试包，不要与 `release` 混用同一包名。
3. **插件源**：若聚合源不可用，会自动尝试 `FALLBACK_DEFAULT_PLUGIN_URLS` 中的直链。

## 上游关系

- 上游仓库：https://github.com/maotoumao/MusicFree
- 本 Fork：https://github.com/perbo/MusicFree

合并上游更新时，请重点检查 `trackPlayer`、`pluginManager`、`build.gradle` 是否有冲突。
