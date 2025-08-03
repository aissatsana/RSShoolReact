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
