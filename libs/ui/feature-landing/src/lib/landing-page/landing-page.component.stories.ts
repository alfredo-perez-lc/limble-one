import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { LandingPageComponent } from './landing-page.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';

const meta: Meta<LandingPageComponent> = {
  component: LandingPageComponent,
  title: 'Translations/Landing Page',
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient(), DialogService],
    }),
  ],
};
export default meta;
type Story = StoryObj<LandingPageComponent>;

export const Default: Story = {
  args: {},
};
