// Setting up the Types
// Response type
export type GetBikeResponse = {
  bikes?: Bike[];
  error?: string;
};

export type GetBikeCountResponse = {
  proximity: number;
  stolen: number;
  non: number;
};

// The bike type
export type Bike = {
  id: number;
  status: "stolen" | "non" | "proximity" | "all";
  title: string;
  date_stolen: number | null;
  description: string | null;
  frame_colors: Array<string> | null;
  frame_model: string | null;
  is_stock_img: false;
  large_img: string | null;
  location_found: null;
  manufacturer_name: string;
  external_id: number | null;
  registry_name: string | null;
  registry_url: string | null;
  serial: string;
  stolen: true;
  stolen_coordinates: Array<number> | null;
  stolen_location: string | null;
  thumb: string | null;
  url: string;
  year: number | null;
  registration_created_at?: number | null;
  registration_updated_at?: number | null;
};

// Error type
export type BikeError = {
  error: string;
};

export type GetBikeDataResponse = {
  bike: Bike;
};
