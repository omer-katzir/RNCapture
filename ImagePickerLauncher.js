// @flow
import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { Button, StyleSheet, View } from 'react-native';
import type { PhotoData, PhotoSource } from './types';

type Props = PhotoSource;

export default class ImagePickerLauncher extends React.Component<Props> {
	showImagePicker = () => {
		const options = {
			mediaType: 'photo',
			path: 'images',
			cameraRoll: true,
		};

		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const data: PhotoData = {
					uri: response.uri,
					width: response.width,
					height: response.height,
					orientation: -1,
					deviceOrientation: -1,
				};
				this.props.delegate.onAddPhoto(data);
			}
		});
	}

	render() {
		return (
			<View style={styles.view}>
			<Button style={styles.button} title="+" onPress={this.showImagePicker} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		backgroundColor: 'white',
		fontSize: 34,
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#00f',
	},
	button: {
		width: 50,
		height: 50,
	},
});
