import React from 'react';
import { View, StyleSheet } from 'react-native';
import CachedImage from 'react-native-image-cache-wrapper';
import Camera from './Camera';
import ImagePickerLauncher from './ImagePickerLauncher';
import PhotosListView from './PhotosListView';
import type { PhotoData, PhotosDelegate, PhotoSource} from 'types';
import PhotoPreview from './photoPreview';

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
		this.onAddPhoto = this.onAddPhoto.bind(this);
		this.state = {
			photos: [],
			previewIndex: -1,
		};
		images.forEach(data => this.onAddPhoto(data));
	}

	async onAddPhoto(photoData) {
		let uri = photoData.uri;
		let size = { width: photoData.width, height: photoData.height };
		const remoteUri = uri.includes('http://') || uri.includes('https://');
		if (remoteUri) {
			console.log(uri);
			uri = await CachedImage.getCacheFilename(uri);
			await CachedImage.getSize(uri, size_ => {
				size = size_;
			});
		}
		const data = {
			...photoData,
			uri,
			...size,
		};
		console.log(data);

		const photos = [...this.state.photos];
		photos.push(data);
		this.setState({ ...this.state, photos: photos });
	}

	getPhotosList = () => {
		return this.state.photos;
	};

	setPreviewIndex = index => {
		this.setState({
			...this.state,
			previewIndex: index,
		});
	};

	render() {
		console.log(this.state.previewIndex);
		return (
			<View style={styles.container}>
				<Camera style={styles.camera} delegate={this} />
				<ImagePickerLauncher style={styles.imagePicker} delegate={this} />
				<PhotosListView
					style={styles.photoList}
					source={this}
					onPhotoPressed={this.setPreviewIndex}
				/>
				{this.state.previewIndex >= 0 && (
					<PhotoPreview
						source={this}
						startIndex={this.state.previewIndex}
						onClose={() => this.setPreviewIndex(-1)}
					/>
				)}
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
