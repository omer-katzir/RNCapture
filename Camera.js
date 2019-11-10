// @flow
import {RNCamera} from 'react-native-camera';
import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { PhotoData, PhotoSource } from './types';

const PendingView = () => (
	<View
		style={{
			flex: 1,
			backgroundColor: 'lightgreen',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<Text>Waiting</Text>
	</View>
);

type Props = PhotoSource;

class Camera extends React.Component<Props> {
	render() {
		return (
			<RNCamera
				style={styles.preview}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.off}
				captureAudio={false}>
				{({ camera, status }) => {
					if (status !== 'READY') {
						return <PendingView />;
					}
					return (
						<View style={styles.button}>
							<Button
								onPress={() => this.takePicture(camera)}
								title="Capture"
							/>
						</View>
					);
				}}
			</RNCamera>
		);
	}

	takePicture = async camera => {
		const options = {quality: 0.5, base64: true};
		const { width, height, uri, orientation, deviceOrientation } = await camera.takePictureAsync(options);
		const photoData: PhotoData = { width, height, uri, orientation, deviceOrientation };
		this.props.delegate.onAddPhoto(photoData);
	};
}

export default Camera;

const styles = StyleSheet.create({
	preview: {
		flex: 3,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'gray',
	},
	button: {
		width: 100,
		height: 50,
	},
});
