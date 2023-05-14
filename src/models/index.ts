export interface Villager {
  name: string;
  imgURL: string;
  iconURL: string;
  wikiURL: string;
  friendshipPoints: number;
  isMarried: boolean;
  birthday: StardewDate;
  loves: Item[];
}

export interface Item {
  name: string;
  wikiURL: string;
  imgURL: string;
  quantity: number;
  loveCount: number; // keeps track of how many currently tracked villagers love this item, used in removal
}

export interface StardewDate {
  season: Season;
  day: number;
}

export enum Season {
  SPRING = "Spring",
  SUMMER = "Summer",
  FALL = "Fall",
  WINTER = "Winter",
}
