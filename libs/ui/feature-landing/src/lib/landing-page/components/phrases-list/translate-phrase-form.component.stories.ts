import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { PhrasesListComponent } from './phrases-list.component';
import { LandingPageMocks } from '../../landing-page.mocks';

const meta: Meta<PhrasesListComponent> = {
  component: PhrasesListComponent,
  title: 'Translations/Landing Page/Components/Phrases List',
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient()],
    }),
  ],
};
export default meta;
type Story = StoryObj<PhrasesListComponent>;

export const Default: Story = {
  args: {
    phrases: LandingPageMocks.data.phrases,
  },
};

export const WithoutPhrases: Story = {
  args: {
    phrases: [],
  },
};

export const WithLotsOfPhrases: Story = {
  args: {
    phrases: [
      ...LandingPageMocks.data.phrases,
      ...LandingPageMocks.data.phrases,
      ...LandingPageMocks.data.phrases,
      ...LandingPageMocks.data.phrases,
      ...LandingPageMocks.data.phrases,
    ],
  },
};
