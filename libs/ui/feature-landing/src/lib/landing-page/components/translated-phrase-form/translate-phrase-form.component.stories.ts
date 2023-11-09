import type { Meta, StoryObj } from '@storybook/angular';
import {
  applicationConfig,
  componentWrapperDecorator,
} from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslatedPhraseFormComponent } from './translated-phrase-form.component';
import { provideHttpClient } from '@angular/common/http';
import { LandingPageMocks } from '../../landing-page.mocks';

const meta: Meta<TranslatedPhraseFormComponent> = {
  component: TranslatedPhraseFormComponent,
  title: 'Translations/Landing Page/Components/Translated Phrase Form',
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="p-4" style="background:white;width: 300px; height:500px">${story}</div>`
    ),
  ],
};
export default meta;
type Story = StoryObj<TranslatedPhraseFormComponent>;

export const Default: Story = {
  args: {
    phrase: LandingPageMocks.data.translatedPhrase,
    languages: LandingPageMocks.data.languages,
  },
};
