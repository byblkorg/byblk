export interface Invitee {
  businessName: string;
  countryShortCode: string;
  regionName: string;
  name: string;
  createdBy: string;
  eventCode: string;
  address: string;
  description: string;
  headerImage: string;
  tags: string[];
  phoneNumber?: string;
  email?: string;
  temporaryPassword?: string;
  businessId?: string;
  country?: string;
  state?: string;
  city?: string;
}

export interface Invite {
  id: string;
  createdAt: number;
  createdBy: number;
  expires: number;
  businessId: string;
}

// export interface Tags {
//   1: {
//     name: "America";
//     subregions: ["Southern"];
//   };
//   2: {
//     name: "Caribbean";
//     subregions: ["Jamaica", "Puerto Rico", "Dominican Republic"];
//   };
//   3: {
//     name: "Latin America";
//     subregions: ["Puerto Rico", "Dominican Republic", "Brazil"];
//   };
//   4: {
//     name: "West Africa";
//     subregions: ["Nigeria", "Ghana"];
//   };
//   5: {
//     name: "Central Africa";
//     subregions: [];
//   };
//   6: {
//     name: "East Africa";
//     subregions: [];
//   };
//   7: {
//     name: "South Africa";
//     subregions: [];
//   };
//   8: {
//     name: "Europe";
//     subregions: "France";
//   };
// }
