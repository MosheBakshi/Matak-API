class GeoJsonShape {
  constructor(type) {
    this.type = "Feature";
    this.properties = {};
    this.geometry = {
      type: type,
      coordinates: [],
    };
  }

  addCoordinates(inputCoordinates) {
    switch (this.geometry.type) {
      case "Polygon":
        this.geometry.coordinates = [
          inputCoordinates.map(coordinate => {
            const { lat, lng } = coordinate;
            return [lng, lat];
          }),
        ];
        break;
      case "LineString":
        this.geometry.coordinates = inputCoordinates.map(coordinate => {
          const { lat, lng } = coordinate;
          return [lng, lat];
        });
        break;
      case "Point":
        const { lat, lng } = inputCoordinates[0];
        this.geometry.coordinates = [lng, lat];
        break;
      default:
        break;
    }
  }
}
export default GeoJsonShape;
