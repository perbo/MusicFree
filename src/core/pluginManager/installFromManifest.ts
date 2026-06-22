import axios from "axios";
import PluginManager from "./index";
import { IInstallPluginConfig } from "@/types/core/pluginManager";

export async function resolvePluginUrlsFromManifest(
    manifestUrl: string,
    pluginNames?: readonly string[],
): Promise<string[]> {
    const jsonFile = (
        await axios.get(manifestUrl, {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                Expires: "0",
            },
        })
    ).data;
    const plugins: Array<{ name?: string; url?: string }> =
        jsonFile?.plugins ?? [];
    const nameSet = pluginNames ? new Set(pluginNames) : null;
    return plugins
        .filter(item => item.url && (!nameSet || nameSet.has(item.name ?? "")))
        .map(item => item.url as string);
}

export async function installPluginUrls(
    urls: string[],
    config?: IInstallPluginConfig,
): Promise<void> {
    for (const url of urls) {
        await PluginManager.installPluginFromUrl(url, config).catch(() => null);
    }
}

export async function installPluginManifest(
    manifestUrl: string,
    config?: IInstallPluginConfig,
    pluginNames?: readonly string[],
): Promise<void> {
    const urls = await resolvePluginUrlsFromManifest(manifestUrl, pluginNames);
    await installPluginUrls(urls, config);
}
