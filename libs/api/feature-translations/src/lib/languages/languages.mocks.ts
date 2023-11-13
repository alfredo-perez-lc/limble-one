import { CreateLanguageDto } from '@limble/shared/domain';

const data = {
  seed: [
    { name: 'Arabic', code: 'ar' },
    { name: 'Chinese', code: 'zh' },
    { name: 'Dutch', code: 'nl' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Hebrew', code: 'he' },
    { name: 'Italian', code: 'it' },
    { name: 'Latvian', code: 'lv' },
    { name: 'Norwegian', code: 'no' },
    { name: 'Polish', code: 'pl' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Romanian', code: 'ro' },
    { name: 'Russian', code: 'ru' },
    { name: 'Spanish', code: 'es' },
    { name: 'Swedish', code: 'sv' },
    { name: 'Thai', code: 'th' },
    { name: 'Turkish', code: 'tr' },
  ] as Array<CreateLanguageDto>,
};

export const languagesMocks = { data };
