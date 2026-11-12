import React from 'react';
import {Composition} from 'remotion';
import {Demo, totalFrames} from './Demo';
import {Steps, stepsTotal} from './Steps';
import {STORIES} from './stories';
import {mariaSteps} from './stories/mariaSteps';

export const Root: React.FC = () => (
  <>
    {STORIES.map((story) => (
      <Composition key={story.id} id={story.id} component={Demo} defaultProps={{story}} durationInFrames={totalFrames(story.durations)} fps={30} width={1920} height={1080} />
    ))}
    <Composition id={mariaSteps.id} component={Steps} defaultProps={{story: mariaSteps}} durationInFrames={stepsTotal(mariaSteps.durations)} fps={30} width={1920} height={1080} />
  </>
);
