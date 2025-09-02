import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View, ActivityIndicator } from "react-native";
import colors from "../constants/colors";

const ExploreGrid = () => {
    const exploreImages = Array.from({ length: 300 }, (_, i) => ({
        id: `exp-${i}`,
        uri: `https://picsum.photos/id/${i + 50}/300/300`,
    }));

    const numBlocks = Math.ceil(exploreImages.length / 5);
    const [visibleBlocks, setVisibleBlocks] = useState(3); // start with 4
    const [loading, setLoading] = useState(true);

    // Progressive rendering effect
    useEffect(() => {
        setLoading(false); // first render done
        const interval = setInterval(() => {
            setVisibleBlocks(prev => {
                if (prev < numBlocks) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev;
            });
        }, 500); // every 500ms add one more block

        return () => clearInterval(interval);
    }, []);

    const RenderBlock = ({ index }) => {
        const blockImages = exploreImages.slice(index * 5, index * 5 + 5);
        const reverse = index % 2 !== 0;

        return (
            <View style={[styles.container, reverse && styles.containerReverse]}>
                <View style={styles.leftColumn}>
                    <View style={styles.row}>
                        <Image source={{ uri: blockImages[0]?.uri }} style={styles.smallSquare} />
                        <Image source={{ uri: blockImages[1]?.uri }} style={styles.smallSquare} />
                    </View>
                    <View style={styles.row}>
                        <Image source={{ uri: blockImages[2]?.uri }} style={styles.smallSquare} />
                        <Image source={{ uri: blockImages[3]?.uri }} style={styles.smallSquare} />
                    </View>
                </View>
                <Image source={{ uri: blockImages[4]?.uri }} style={styles.tallRectangle} />
            </View>
        );
    };

    return (
        <View style={styles.fullContainer}>

            <FlatList
                data={Array.from({ length: visibleBlocks })} // only render what’s visible
                keyExtractor={(_, i) => `block-${i}`}
                renderItem={({ index }) => <RenderBlock index={index} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: "32%" }}
                ListFooterComponent={loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} color={colors.fontColor} />}
                initialNumToRender={6}          // render only first 6 initially
                windowSize={10}                 // keep 10 screens worth in memory
                maxToRenderPerBatch={5}         // render 5 at a time
                updateCellsBatchingPeriod={50}  // render new batch every 50ms
                removeClippedSubviews={true}
            />
        </View>
    );
};

export default ExploreGrid;

const styles = StyleSheet.create({
    fullContainer: {
        marginTop: 5,
    },
    container: {
        flexDirection: "row",
    },
    leftColumn: {
        flex: 2,
        flexDirection: "column",
    },
    row: {
        flexDirection: "row",
    },
    smallSquare: {
        flex: 1,
        aspectRatio: 1,
        margin: 1,
    },
    tallRectangle: {
        flex: 1,
        aspectRatio: 0,
        margin: 1,
    },
    containerReverse: {
        flexDirection: "row-reverse",
    },
});
