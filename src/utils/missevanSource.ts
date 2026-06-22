import { isPlayableAudioUrl } from "./trackUtils";

const MISSEVAN_UA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61";

export const MAOERFM_PLATFORM = "猫耳FM";

function isMissevanDirectM4a(url: string) {
    return /maoercdn\.com/i.test(url) && /\.m4a(\?|$)/i.test(url);
}

export function getMissevanPlayHeaders(soundId: string | number) {
    return {
        "user-agent": MISSEVAN_UA,
        referer: `https://www.missevan.com/sound/player?id=${soundId}`,
        accept: "*/*",
    };
}

/** 猫耳FM 歌单接口返回的 CDN 直链，可绕过 DRM HLS */
export function resolveMissevanDirectSource(musicItem: IMusic.IMusicItemBase) {
    const url = musicItem.url;
    if (!isPlayableAudioUrl(url) || !isMissevanDirectM4a(url)) {
        return null;
    }
    const headers = getMissevanPlayHeaders(musicItem.id);
    return {
        url,
        headers,
        userAgent: MISSEVAN_UA,
    };
}

export function isMissevanDrmHls(url?: string | null) {
    return !!url && url.includes(".m3u8");
}
