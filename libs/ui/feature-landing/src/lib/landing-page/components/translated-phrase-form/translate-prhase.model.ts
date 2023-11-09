export interface EditTranslationParams {
  state: 'INITIAL' | 'HOVERED' | 'SAVING' | 'ERROR' | 'SAVED' | 'EDITING';
  id: number;
  languageName: string;
  text: string;
}
