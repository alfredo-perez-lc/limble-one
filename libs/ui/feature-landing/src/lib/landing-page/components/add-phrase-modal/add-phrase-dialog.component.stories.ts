import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { AddPhraseDialogComponent } from './add-phrase-dialog.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { LandingPageMocks } from '../../landing-page.mocks';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<AddPhraseDialogComponent> = {
  component: AddPhraseDialogComponent,
  title: 'Translations/Landing Page/Components/Add Phrase Dialog',
  parameters: {},
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient()],
    }),
  ],
  args: {
    visible: true,
  },
};
export default meta;
type Story = StoryObj<AddPhraseDialogComponent>;

export const Default: Story = {
  args: {
    state: 'INITIAL',
    languages: LandingPageMocks.data.languages,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Create a new phrase')).toBeInTheDocument();
  },
};

export const Saving: Story = {
  args: {
    state: 'SAVING',
    phrase: {
      key: 'hello-world',
      text: 'Hello World',
    } as any,
    languages: LandingPageMocks.data.languages,
  },
};

export const Saved: Story = {
  args: {
    state: 'SAVED',
    phrase: LandingPageMocks.data.translatedPhrase,
    languages: LandingPageMocks.data.languages,
  },
};

export const Error: Story = {
  args: {
    state: 'ERROR',
    error:
      '404 - What a horrible error! \n try again later. Or not! it is up to you!',
  },
};
