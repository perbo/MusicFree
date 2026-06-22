import "react-native-get-random-values";

/**
 * Fisher-Yates 洗牌，使用 crypto 随机源保证每次结果独立均匀
 */
function randomInt(max: number): number {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

export function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function randomPick<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined;
    }
    return array[randomInt(array.length)];
}
