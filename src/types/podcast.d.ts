export interface Podcast {
  id: {
    attributes: {
      'im:id': string;
    };
  };
  'im:image': Array<{ label: string }>;
  'im:name': { label: string };
  'im:artist': { label: string };
}
