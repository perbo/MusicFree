import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import rpx from "@/utils/rpx";
import { ImgAsset } from "@/constants/assetsConst";
import ThemeText from "@/components/base/themeText";
import useOrientation from "@/hooks/useOrientation";
import { default as deviceInfoModule } from "react-native-device-info";

export default function AboutSetting() {
    const orientation = useOrientation();

    return (
        <View
            style={[
                style.wrapper,
                orientation === "horizontal"
                    ? {
                        flexDirection: "row",
                    }
                    : null,
            ]}>
            <View
                style={[
                    style.header,
                    orientation === "horizontal" ? style.horizontalSize : null,
                ]}>
                <Image
                    source={ImgAsset.author}
                    style={style.image}
                    resizeMode="contain"
                />
                <ThemeText style={style.margin}>MusicFree 本地版</ThemeText>
                <ThemeText style={style.margin}>
                    版本 {deviceInfoModule.getVersion()}
                </ThemeText>
            </View>
            <ScrollView
                contentContainerStyle={style.scrollViewContainer}
                style={style.scrollView}>
                <ThemeText fontSize="title">说明</ThemeText>
                <ThemeText style={style.content}>
                    这是基于 MusicFree 的本地自用版本，已预装常用插件，并移除了应用更新检测等联网维护功能。
                </ThemeText>
                <ThemeText style={style.content}>
                    软件本体基于 AGPL-3.0 开源协议。音源能力由第三方插件提供，请合理合法使用。
                </ThemeText>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    wrapper: {
        width: "100%",
        flex: 1,
        paddingHorizontal: rpx(24),
    },
    header: {
        alignItems: "center",
        paddingVertical: rpx(48),
    },
    horizontalSize: {
        width: "40%",
    },
    image: {
        width: rpx(180),
        height: rpx(180),
        borderRadius: rpx(90),
    },
    margin: {
        marginTop: rpx(24),
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContainer: {
        paddingBottom: rpx(48),
    },
    content: {
        marginTop: rpx(24),
        lineHeight: rpx(42),
    },
});
