import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import moment from "moment";
/* components */
import { Stars } from "../components/Stars";
/* types */
import { Diary } from "../types/diary";

type Props = {
    diary: Diary;
};

export const ReviewItem: React.FC<Props> = ({ diary }: Props) => {
    const createdAt = moment(diary.createdAt.toDate()).format("YYYY/M/D");
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View>
                    <Stars score={diary.score} starSize={16} textSize={12}/>
                    <Text style={styles.diaryText}>{diary.text}</Text>
                </View>
                <Text
                    style={styles.nameText}
                >{`${diary.user.family}   ${createdAt}`}</Text>
            </View>
            {/* 画像を入れるときの処理 someday */}
            {/* <View style={styles.rightContainer}>
                <Image style={styles.image} source={{ uri: diary.imageUrl }} />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 16,
    },
    leftContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    rightContainer: {},
    image: {
        width: 100,
        height: 100,
    },
    diaryText: {
        marginTop: 4,
        color: "#000",
    },
    nameText: {
        color: "#888",
        fontSize: 12,
    },
});