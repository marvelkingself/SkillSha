export interface CityInfo {
  slug: string;
  name: string;
  state: string;
}

export const CITIES_LIST: CityInfo[] = [
  { slug: "delhi", name: "Delhi", state: "NCR" },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { slug: "bangalore", name: "Bangalore", state: "Karnataka" },
  { slug: "pune", name: "Pune", state: "Maharashtra" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana" },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu" },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal" },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh" },
  { slug: "gurugram", name: "Gurugram", state: "Haryana" },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat" },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan" },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh" }
];
