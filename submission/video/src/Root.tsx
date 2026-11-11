import React from 'react';
import {Composition} from 'remotion';
import {Demo, totalFrames} from './Demo';
import {STORIES} from './stories';

export const Root: React.FC = () => (
  <>
    {STORIES.map((story) => (
      <Composition key={story.id} id={story.id} component={Demo} defaultProps={{story}} durationInFrames={totalFrames(story.durations)} fps={30} width={1920} height={1080} />
    ))}
  </>
);
