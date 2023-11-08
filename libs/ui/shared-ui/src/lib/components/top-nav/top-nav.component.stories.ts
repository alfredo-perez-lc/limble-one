import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { TopNavComponent } from './top-nav.component';

const meta: Meta<TopNavComponent> = {
  component: TopNavComponent,
  title: 'Top Nav',
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideHttpClient()],
    }),
  ],
};
export default meta;
type Story = StoryObj<TopNavComponent>;

export const Default: Story = {
  args: {},
};
