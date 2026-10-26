import React from 'react';
import {Composition} from 'remotion';
import {Captions, CaptionsProps} from './Captions';

const FPS = 30;

const defaultProps: CaptionsProps = {
  videoSrc: 'input.mp4',
  transcript: {language: 'en', duration: 3, segments: []},
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Captions"
    component={Captions}
    width={1080}
    height={1920}
    fps={FPS}
    durationInFrames={FPS * 3}
    defaultProps={defaultProps}
    // Video length follows the transcript (Whisper reports the full media duration).
    calculateMetadata={({props}) => ({
      durationInFrames: Math.max(1, Math.ceil(props.transcript.duration * FPS)),
    })}
  />
);
