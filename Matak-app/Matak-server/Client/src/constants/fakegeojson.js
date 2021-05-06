export const info2 = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [34.647789001464844, 31.680264464234185],
      },
    },
  ],
};

export const info = {
  type: "FeatureCollection",
  groupId: "info",
  features: [
    {
      type: "Feature",
      properties: {
        groupId: "info",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [34.56298828124999, 31.70743182668477],
          [34.52419281005859, 31.66039512307388],
          [34.54547882080078, 31.656888327540212],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        groupId: "info",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [34.62238311767578, 31.656011607977955],
            [34.60075378417969, 31.64607487489883],
            [34.6234130859375, 31.63964465804662],
            [34.62238311767578, 31.656011607977955],
          ],
        ],
      },
    },
  ],
};
//info Array presents a collectoion of routes group
//info is a collection of routes
export const InfoArray = [info, info2];
