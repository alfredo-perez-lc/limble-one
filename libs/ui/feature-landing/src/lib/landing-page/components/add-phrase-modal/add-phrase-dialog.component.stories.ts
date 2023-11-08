import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { AddPhraseDialogComponent } from './add-phrase-dialog.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AddPhraseDialogComponent> = {
  component: AddPhraseDialogComponent,
  title: 'Translations/Landing Page/Add Phrase Dialog',
  parameters: {},
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  args: {
    visible: true,
  },
};
export default meta;
type Story = StoryObj<AddPhraseDialogComponent>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Create a new phrase')).toBeInTheDocument();
  },
};

export const WhileSaving: Story = {
  args: {
    isSaving: true,
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //
  //   // await canvas.getByText('key').('THIS_IS_A_KEY');
  // },
};
