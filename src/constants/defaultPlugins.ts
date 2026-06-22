/** 必须安装的插件（每次启动检查补装） */
export const MANDATORY_PLUGINS = [
    {
        aliases: ["网易音乐", "网易云", "网易云音乐", "网易"],
        url: "https://raw.githubusercontent.com/ThomasBy2025/musicfree/main/plugins/wy.js",
    },
    {
        aliases: ["腾讯音乐", "QQ音乐", "QQ", "qq"],
        url: "https://raw.githubusercontent.com/ThomasBy2025/musicfree/main/plugins/tx.js",
    },
] as const;

/** 首次安装时额外预装的插件名（从聚合源筛选） */
export const DEFAULT_PLUGIN_NAMES = [
    "酷狗",
    "酷我",
    "小蜗音乐",
    "bilibili",
    "歌词网",
    "歌词千寻",
    "WebDAV",
    "猫耳FM",
] as const;

export const DEFAULT_PLUGIN_MANIFEST_URL =
    "https://musicfreepluginshub.2020818.xyz/plugins.json";

/** 聚合源不可用时的兜底直链（不含必装项，必装项单独处理） */
export const FALLBACK_DEFAULT_PLUGIN_URLS = [
    "https://raw.githubusercontent.com/ThomasBy2025/musicfree/main/plugins/wy.js",
    "https://raw.githubusercontent.com/ThomasBy2025/musicfree/main/plugins/tx.js",
    "https://raw.githubusercontent.com/ThomasBy2025/musicfree/main/plugins/kg.js",
    "https://raw.githubusercontent.com/ThomasBy2025/musicfree/main/plugins/kw.js",
    "https://gitee.com/kevinr/tvbox/raw/master/musicfree/plugins/xiaowo.js",
    "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/bilibili/index.js",
    "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/geciwang/index.js",
    "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/geciqianxun/index.js",
    "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/webdav/index.js",
    "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/maoerfm/index.js",
] as const;
