import type { Meta, StoryObj } from '@storybook/angular';
import {
  applicationConfig,
  componentWrapperDecorator,
} from '@storybook/angular';
import { AddPhraseDialogComponent } from './add-phrase-dialog.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { LandingPageMocks } from '../../landing-page.mocks';
import { provideHttpClient } from '@angular/common/http';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

const meta: Meta<AddPhraseDialogComponent> = {
  component: AddPhraseDialogComponent,
  title: 'Translations/Landing Page/Components/Add Phrase Dialog',
  parameters: {},
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideHttpClient(),
        DynamicDialogConfig,
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="p-4 rounded-md"  style="background:white;width: 500px; height:400px; overflow: scroll">${story}</div>`
    ),
  ],
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
      '<strong>Http failure response for http://localhost:3000/phrases: 400 Bad Request</strong><br/><p>scopeId should not be empty</p><p>scopeId must be a number conforming to the specified constraints</p>',
  },
};
