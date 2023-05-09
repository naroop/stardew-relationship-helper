export interface Villager {
    name: string;
    imgURL: string;
    iconURL: string;
    wikiURL: string;
    friendshipPoints: number;
    isMarried: boolean;
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
    season: string;
    day: number;
  }
