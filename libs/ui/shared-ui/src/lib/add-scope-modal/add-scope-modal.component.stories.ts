import type { Meta, StoryObj } from '@storybook/angular';
import { AddScopeModalComponent } from './add-scope-modal.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AddScopeModalComponent> = {
  component: AddScopeModalComponent,
  title: 'AddScopeModalComponent',
};
export default meta;
type Story = StoryObj<AddScopeModalComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/add-scope-modal works!/gi)).toBeTruthy();
  },
};
