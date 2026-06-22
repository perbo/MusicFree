import path from "path-browserify";

export default function getUrlExt(url?: string) {
    if (!url) {
        return;
    }
    const pathname = url.split("?")[0].split("#")[0];
    const ext = path.extname(pathname);
    if (ext) {
        return ext;
    }
    return undefined;
}
