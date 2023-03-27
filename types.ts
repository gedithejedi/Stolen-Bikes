// Setting up the Types
// Response type
export type GetBikeResponse = {
	bikes?: IBike[];
	error?: string;
};
  
// The bike type
export type IBike = {
	id: number;
	status: "stolen" | "non" | "proximity"  | "all";
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
	registry_url: URL | null;
	serial: string;
	stolen: true;
	stolen_coordinates: IBikeCoordinates | null;
	stolen_location: string | null;
	thumb: URL | null;
	url: URL;
	year: number;
}

// Bike Coordinate type
export type IBikeCoordinates = {
	latitude: number;
	longitude: number;
}

// Error type
export type IBikeError = {
	error: string;
}