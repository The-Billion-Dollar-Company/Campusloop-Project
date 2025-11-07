import { Types } from "mongoose";

export enum ItemCategory{
    RENT="RENT",
    SELL="SELL",
    SKILL="SKILL"
}

export enum Availability{
    IN_STOCK="IN_STOCK",
    RENTED="RENTED",
    SOLD="SOLD"
}

export enum ObjectCategory {
  TRANSPORTATION = "TRANSPORTATION", // Cars, Bikes, Scooters, Bicycles, Trucks

  ELECTRONICS = "ELECTRONICS",       // General electronics like Speakers, Headphones, Power Banks
  LAPTOP = "LAPTOP",                 // Dell XPS, MacBook Pro, Lenovo ThinkPad
  PHONES = "PHONES",                 // iPhone, Samsung Galaxy, Google Pixel
  TV = "TV",                         // LG OLED, Samsung Smart TV, Sony Bravia
  GAMING = "GAMING",                 // PlayStation, Xbox, Gaming PC, VR headset
  CAMERA = "CAMERA",                 // DSLR, Mirrorless Camera, GoPro
  PROJECTOR = "PROJECTOR",           // Epson Projector, Mini Projector
  LIGHTS = "LIGHTS",                 // LED Lights, Studio Lights, Decorative Lights

  CLOTHING = "CLOTHING",             // Jackets, Sarees, T-Shirts, Shoes, Accessories
  SPORTS = "SPORTS",                 // Cricket Bat, Football, Badminton Racket, Gym Equipment
  BOOKS = "BOOKS",                   // Novels, Textbooks, Comics, Magazines
  FURNITURE = "FURNITURE",           // Sofa, Table, Chair, Bed, Wardrobe

  EVENTS = "EVENTS",                 // Event Decoration, Stage Setup, Sound System
  WEDDING = "WEDDING",               // Wedding Dress, Jewelry, Stage, Mandap

  SKILL="SKILL",

  OTHERS = "OTHERS",                 // Anything not listed above
}

export enum ItemStatus{
    PENDING="PENDING",
    PUBLISHED="PUBLISHED",
    CANCEL="CANCEL",
}

export interface IItem {
  _id?: Types.ObjectId;
  ownerId: Types.ObjectId;
  title: string;
  description?: string;  
  price: number;
  deposit?: number;       
  condition?: "NEW" | "USED"; 
  
  status: ItemStatus,
  sellingCategory: ItemCategory; // RENT | SELL | SKILL
  availability: Availability;    // IN_STOCK | RENTED | SOLD
  objectCategory: ObjectCategory; // one of the listed categories

  tags?: string[];        
  picture?: string;      
  pictures?: string[];    // multiple images
}

export interface QueryParams {
  search?: string;
  category?: string;
  sellingCategory?: string;
  availability?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  status?: string;
  sortOrder?: "asc" | "desc";
  page?: string;
  limit?: string;
}
