import React from 'react';
import { View, StyleSheet } from 'react-native';
import Camera from './Camera';
import ImagePickerLauncher from './ImagePickerLauncher';
import PhotosListView from './PhotosListView';
import type { PhotosDelegate, PhotoSource } from 'types';

const images = [
	{ uri: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png", width:400, height: 400},
	{ uri: "https://homepages.cae.wisc.edu/~ece533/images/pool.png", width:400, height:400 },
	{ uri: "https://homepages.cae.wisc.edu/~ece533/images/baboon.png", width: 400, height: 400},
	{ uri: "https://homepages.cae.wisc.edu/~ece533/images/barbara.bmp", width:400, height: 400},
	{ uri: "https://homepages.cae.wisc.edu/~ece533/images/boat.png", width: 400, height: 400},
	{ uri: "https://homepages.cae.wisc.edu/~ece533/images/monarch.png", width:400, height:400 },
	{ uri: "https://homepages.cae.wisc.edu/~ece533/images/tulips.png", width: 400, height: 400 },
];

export default class Main extends React.Component
	implements PhotosDelegate, PhotoSource {
	constructor(props) {
		super(props);
		this.state = {
			photos: images,
		};
		this.onAddPhoto = this.onAddPhoto.bind(this);
	}

	onAddPhoto(photoData) {
		const photos = [...this.state.photos];
		photos.push(photoData);
		this.setState({ photos: photos });
	}

	getPhotosList = () => {
		return this.state.photos;
	};

	render() {
		return (
			<View style={styles.container}>
				<Camera style={styles.camera} delegate={this} />
				<ImagePickerLauncher style={styles.imagePicker} delegate={this} />
				<PhotosListView style={styles.photoList} source={this} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column-reverse',
		backgroundColor: 'black',
	},
	camera: {
		flex: 1,
	},
	photoList: {
		flex: 1,
	},
	imagePicker: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: 50,
		height: 50,
	},
});
