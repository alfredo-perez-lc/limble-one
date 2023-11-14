export interface EditTranslationParams {
  state: 'INITIAL' | 'HOVERED' | 'SAVING' | 'ERROR' | 'SAVED' | 'EDITING';
  id: string;
  languageName: string;
  text: string;
}
