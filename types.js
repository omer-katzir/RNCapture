export type PhotoData = $ReadOnly<{
	uri: string,
	width: number,
	height: number,
	orientation: number,
	deviceOrientation: number,
}>;

export type PhotosDelegate = {
	onAddPhoto: PhotoData => void,
};

export type PhotoSource = {
	delegate: PhotosDelegate,
	getPhotosList?: () => Array<PhotoData>,
};
