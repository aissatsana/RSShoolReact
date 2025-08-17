export interface Character {
  id: number;
  name: string;
  image: string;
}

export interface CharacterDetail extends Character {
  gender: string;
  species: string;
  status: string;
  location: {
    name: string;
  };
}

export interface PageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersResponse {
  info: PageInfo;
  results: Character[];
}
