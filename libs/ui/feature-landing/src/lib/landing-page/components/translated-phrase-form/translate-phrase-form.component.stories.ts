import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { TranslatedPhraseFormComponent } from './translated-phrase-form.component';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<TranslatedPhraseFormComponent> = {
  component: TranslatedPhraseFormComponent,
  title: 'Translations/Landing Page/Components/Translated Phrase Form',
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
type Story = StoryObj<TranslatedPhraseFormComponent>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
