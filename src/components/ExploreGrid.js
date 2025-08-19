import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

const ExploreGrid = (count) => {
    const exploreImages = Array.from({ length: 300 }, (_, i) => ({
        id: `exp-${i}`,
        uri: `https://picsum.photos/id/${i + 50}/300/300`,
    }));

    const randerItem = ({ index }) => {
        const blockImages = exploreImages.slice(index * 5, index * 5 + 5);
        const reverse = index % 2 !== 0


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
    const numBlocks = Math.ceil(exploreImages.length / 5);
    return (
        <View style={styles.fullContainer}>
            <FlatList
                data={Array.from({ length: numBlocks })}
                keyExtractor={(_, i) => `block-${i}`}
                renderItem={randerItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )

};

export default ExploreGrid;

const styles = StyleSheet.create({
    fullContainer: {
        marginTop: 5
    },
    container: {
        flexDirection: 'row',
    },
    leftColumn: {
        flex: 2,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
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
        flexDirection: 'row-reverse',
    },
});
