import { readCsf } from '@storybook/csf-tools';
import { Indexer, type PresetValue } from '@storybook/types';

const STORIES_BLOB = '**/__stories__/*.stories.@(js|jsx|mjs|ts|tsx)';

const LAYERS = ['shared', 'entities', 'features', 'widgets'];

export const stories = LAYERS.map((layer) => ({
  directory: `../src/${layer}`,
  files: STORIES_BLOB,
  titlePrefix: layer,
}));

const csfIndexer: Indexer = {
  test: /(stories|story)\.(m?js|ts)x?$/,
  createIndex: async (fileName, { makeTitle, ...options }) => {
    const customMakeTitle = (title?: string) => {
      const withoutStoriesFolder = makeTitle(title).replace('__stories__/', '');
      const tokens = withoutStoriesFolder.split('/');

      if (tokens.at(-1) === tokens.at(-2)) {
        return tokens.slice(0, -1).join('/');
      }

      return withoutStoriesFolder;
    };

    const indexInputs = (
      await readCsf(fileName, { ...options, makeTitle: customMakeTitle })
    ).parse().indexInputs;

    return indexInputs.map((index) => {
      if ('name' in index) {
        return { ...index, name: index.name.toLowerCase() };
      }

      return index;
    });
  },
};

export const experimental_indexers: PresetValue<Indexer[]> = (existingIndexers) =>
  [csfIndexer].concat(existingIndexers || []);
