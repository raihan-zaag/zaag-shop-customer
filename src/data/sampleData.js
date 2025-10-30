// Sample address data to test your component
export const sampleAddresses = {
  content: [
    {
      id: 1,
      title: "Home",
      street: "Storgatan 12",
      zipCode: "114 56",
      city: "STOCKHOLM",
      state: "Stockholm",
      county: "Stockholm",
      country: "Sweden",
      apartment: "Near Zaag System",
      isDefault: true
    },
    {
      id: 2,
      title: "Office",
      street: "Sveavägen 65",
      zipCode: "113 50",
      city: "STOCKHOLM",
      state: "Stockholm",
      county: "Stockholm",
      country: "Sweden",
      apartment: "Floor 3, Room 302",
      isDefault: false
    },
    {
      id: 3,
      title: "Summer House",
      street: "Kustvägen 28",
      zipCode: "451 32",
      city: "UDDEVALLA",
      state: "Västra Götaland",
      county: "Västra Götaland",
      country: "Sweden",
      apartment: "Near the beach",
      isDefault: false
    }
  ],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false
  },
  totalPages: 1,
  totalElements: 3,
  last: true,
  size: 10,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false
  },
  numberOfElements: 3,
  first: true,
  empty: false
};
