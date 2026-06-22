import { State } from "react-native-track-player";

const INTERNAL_AUDIO_URLS = new Set([
    "musicfree://fake-audio",
    "musicfree://proposed-audio",
]);

/** 是否为可实际播放的音频地址 */
export function isPlayableAudioUrl(url?: string | null): url is string {
    if (!url || typeof url !== "string") {
        return false;
    }
    const trimmed = url.trim();
    if (!trimmed || INTERNAL_AUDIO_URLS.has(trimmed)) {
        return false;
    }
    if (trimmed.startsWith("musicfree://")) {
        return false;
    }
    return (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("file://") ||
        trimmed.startsWith("content://")
    );
}

/**
 * 音乐是否处于停止状态
 * @param state
 * @returns
 */
export const musicIsPaused = (state: State | undefined) =>
    state !== State.Playing;

/**
 * 音乐是否处于缓冲中状态
 * @param state
 * @returns
 */
export const musicIsBuffering = (state: State | undefined) =>
    state === State.Loading || state === State.Buffering;
