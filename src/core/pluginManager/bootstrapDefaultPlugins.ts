import {
    DEFAULT_PLUGIN_MANIFEST_URL,
    DEFAULT_PLUGIN_NAMES,
    FALLBACK_DEFAULT_PLUGIN_URLS,
    MANDATORY_PLUGINS,
} from "@/constants/defaultPlugins";
import { trace } from "@/utils/log";
import PersistStatus from "@/utils/persistStatus";
import PluginManager from "./index";
import {
    installPluginManifest,
    installPluginUrls,
} from "./installFromManifest";

const installConfig = {
    notCheckVersion: true,
};

function hasMandatoryPlugin(aliases: readonly string[]) {
    const installedNames = PluginManager.getSortedPlugins().map(p => p.name);
    return aliases.some(alias => installedNames.includes(alias));
}

/** 确保网易云、QQ 等必装插件存在 */
export async function ensureMandatoryPlugins() {
    for (const plugin of MANDATORY_PLUGINS) {
        if (hasMandatoryPlugin(plugin.aliases)) {
            continue;
        }
        trace("补装必装插件", plugin.aliases[0], plugin.url);
        const result = await PluginManager.installPluginFromUrl(
            plugin.url,
            installConfig,
        );
        if (!result.success) {
            trace("必装插件安装失败", plugin.aliases[0], result.message);
        }
    }
}

export default async function bootstrapDefaultPlugins() {
    await ensureMandatoryPlugins();

    const existingPlugins = PluginManager.getSortedPlugins();
    if (
        PersistStatus.get("app.defaultPluginsBootstrapped") &&
        existingPlugins.length > 0
    ) {
        return;
    }
    if (existingPlugins.length > 0) {
        PersistStatus.set("app.defaultPluginsBootstrapped", true);
        return;
    }

    trace("开始安装默认插件");
    try {
        try {
            await installPluginManifest(
                DEFAULT_PLUGIN_MANIFEST_URL,
                installConfig,
                DEFAULT_PLUGIN_NAMES,
            );
        } catch (e) {
            trace("默认插件聚合源安装失败，使用兜底列表", e);
            await installPluginUrls(
                [...FALLBACK_DEFAULT_PLUGIN_URLS],
                installConfig,
            );
        }
        await ensureMandatoryPlugins();
    } catch (e) {
        trace("默认插件安装失败", e);
    } finally {
        PersistStatus.set("app.defaultPluginsBootstrapped", true);
    }
}
