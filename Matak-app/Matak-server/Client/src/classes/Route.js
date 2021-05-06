class Route {
  constructor(routeType = "", permanent = false, positions = []) {
    this.routeType = routeType;
    this.isPermanent = permanent;
    this.positions = positions;
  }

  addPosition(pos) {
    if (this.routeType === "Polygon" || this.routeType === "LineString") {
      this.positions.push(pos);
    } else {
      this.positions = [pos];
    }
  }
}
export default Route;
