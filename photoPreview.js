import React from 'react';
import { View, Text } from 'react-native';
import ImageView from 'react-native-image-view';
import type { PhotoSource } from './types';

type Props = $ReadOnly<{|
	onClose: index => void,
	startIndex: number,
	...PhotoSource,
|}>;

class Preview extends React.Component<Props> {
	state = {
		currentIndex: this.props.startIndex,
	};

	render() {
		{
			const { source, onClose, startIndex } = this.props;
			const photos = source.getPhotosList();
			console.log(photos);
			const paths = photos.map(data => {
				return {
					source: {
						uri: data.uri,
					},
					width: data.width,
					height: data.height,
				};
			});

			console.log(paths);

			return (
				<ImageView
					images={paths}
					animationType="silde"
					onClose={() => onClose(this.state.currentIndex)}
					onImageChange={() => {}}
					imageIndex={startIndex}
					isVisible
					renderFooter={(<View><Text>My footer</Text></View>)}
				/>
			);
		}
	}
}

export default Preview;
