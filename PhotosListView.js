// @flow
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import type { PhotoSource } from './types';
import CachedImage from 'react-native-image-cache-wrapper';

export default ({ source }: { source: PhotoSource }) => {
	const photos = source.getPhotosList();
	console.log(photos);
	return (
		<ScrollView
			horizontal
			contentInsetAdjustmentBehavior="automatic"
			style={styles.scrollView}>
			<View style={styles.body}>
				{photos &&
					photos.map((data, i) => (
						<View key={i} style={styles.sectionContainer}>
							<TouchableOpacity onPress={() => { Linking.openURL(data.uri) }}>
								<Text style={styles.sectionTitle}>{i}</Text>
							</TouchableOpacity>
							<CachedImage
								style={styles.image}
								source={{ uri: data.uri, cache: 'only-if-cached' }}
								activityIndicator
							/>
						</View>
					))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	image: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: 90,
		height: 50,
	},
	scrollView: {
		flex: 1,
		backgroundColor: 'white',
	},
	body: {
		backgroundColor: Colors.white,
		flexDirection: 'row',
	},
	sectionContainer: {
		flexDirection: 'column',
		marginTop: 32,
		paddingHorizontal: 24,
		width: 100,
		height: 100,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: '#57f',
	},
});
