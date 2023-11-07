import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { AddPhraseDialogComponent } from './add-phrase-dialog.component';
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';

const meta: Meta<AddPhraseDialogComponent> = {
  component: AddPhraseDialogComponent,
  title: 'Translations/Landing Page/Add Phrase Dialog',
  parameters: {
    decorators: [
      applicationConfig({
        providers: [provideNoopAnimations()],
      }),
    ],
  },
  args: {
    visible: true,
  },
};
export default meta;
type Story = StoryObj<AddPhraseDialogComponent>;

export const Default: Story = {
  args: {},
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};
