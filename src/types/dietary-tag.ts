export type DietaryTagName = 
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "halal"
  | "dairy-free"
  | "nut-free";

export interface DietaryTag {
  id: string;
  name: {
    en: DietaryTagName;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  color: string;
  active: boolean;
}

export interface DietaryTagResponse {
  count: number;
  response: {
    items: DietaryTag[];
  };
  message: string;
}
