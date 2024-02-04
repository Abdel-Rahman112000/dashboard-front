import { Attachment } from "./Attachment";

type DesignType = {
  id: number;
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  has_descount: DB_Boolean;
  price_before: number;
  price_after: number;
  desc_date_from: string;
  desc_date_to: string;
  area: number;
  floors_num: number;
  bed_rooms_num: number;
  width_floor: number;
  height_floor: number;
  width_front_street: number;
  bathroom_num: number;
  engineering_name: string;
  main_bedroom: number;
  living_room: number;
  dinner_room: number;
  status_design: string;
  status_web: DB_Boolean;
  status_mob: DB_Boolean;
  created_at: string;
  updated_at: string;
  kitchen: number;
  name: string;
  desc: string;
  subImages: Media[];
  booklet: Media[];
  engImage: Media[];
  mainImage: Media[];
  engImageIdea: Media[];
  attachments: Attachment[];
  utilities: Attachment[];
  media: Media[];
};

export type Design = Partial<DesignType>;
