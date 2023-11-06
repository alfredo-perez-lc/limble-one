import type { Meta, StoryObj } from '@storybook/angular';
import { LandingPageComponent } from './landing-page.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<LandingPageComponent> = {
  component: LandingPageComponent,
  title: 'LandingPageComponent',
};
export default meta;
type Story = StoryObj<LandingPageComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/landing-page works!/gi)).toBeTruthy();
  },
};
