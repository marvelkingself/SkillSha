export interface CityInfo {
  slug: string;
  name: string;
  state: string;
}

export const CITIES_LIST: CityInfo[] = [
  { slug: "delhi", name: "Delhi", state: "NCR" },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh" },
  { slug: "gurugram", name: "Gurugram", state: "Haryana" },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh" },
  { slug: "greater-noida", name: "Greater Noida", state: "Uttar Pradesh" },
  { slug: "faridabad", name: "Faridabad", state: "Haryana" },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh" },
  { slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh" },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan" },
  { slug: "chandigarh", name: "Chandigarh", state: "Punjab/Haryana" },
  { slug: "pune", name: "Pune", state: "Maharashtra" },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { slug: "bangalore", name: "Bengaluru", state: "Karnataka" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana" }
];

