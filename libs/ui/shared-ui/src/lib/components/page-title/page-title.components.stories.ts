import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { PageTitleComponent } from './page-title.component';

const meta: Meta<PageTitleComponent> = {
  component: PageTitleComponent,
  title: 'Page Title',
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient()],
    }),
  ],
};
export default meta;
type Story = StoryObj<PageTitleComponent>;

export const Default: Story = {
  args: {},
};
