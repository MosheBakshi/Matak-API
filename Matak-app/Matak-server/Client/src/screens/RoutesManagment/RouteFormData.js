const DEFAULT_FORM_MODE = 'edit';

export class RouteFormData {
    route;
    type;
    show;
    text;

    constructor(route = null, type = DEFAULT_FORM_MODE) {
        this.setRoute(route);
        this.setType(type);
    }

    setRoute(route) {
        const isObject = new Object(route) === route;
        if (isObject) {
            this.show = isObject;
            this.route = route;
        } else {
            this.show = false;
            this.route = null;

            console.warn('Route is not valid and can not be displayed on form');
        }
    }

    setType(type) {
        if (type && ["edit", "view"].find((typeOption) => typeOption === type)) {
            this.type = type;
            this.setFormText();
        } else {
            console.log(`Unknown form type, setting form type to default mode (${DEFAULT_FORM_MODE})`);
            this.type = DEFAULT_FORM_MODE;
        }
    }

    setFormText() {
        switch (this.type) {
            case "view":
                this.text = "Route Details";
                break;
            case "edit":
            default:
                this.text = "Edit Route";
        }
    }

    clone() {
        return new RouteFormData(this.route, this.type);
    }

}