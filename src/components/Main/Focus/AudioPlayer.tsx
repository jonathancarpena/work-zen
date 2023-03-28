import { forwardRef, ForwardedRef } from 'react';

interface Props {
	url: string;
}

function AudioPlayer({ url }: Props, ref: ForwardedRef<HTMLMediaElement>) {
	return (
		<audio src={url} ref={ref} loop key={url}>
			Your browser does not support the
			<code>audio</code> element.
		</audio>
	);
}

export default forwardRef(AudioPlayer);
