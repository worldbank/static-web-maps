function toggle3d() {
    const e = $('.wb-toggle3d');

    const state = store.getState();
    const mapState = state.keplerGl?.map?.mapState;
    if (!e.hasClass('isActive')) {
        config.config.visState.layers.forEach(layer => {
        if (layer.config.visConfig.hasOwnProperty('enable3d')) {
            layer.config.visConfig.enable3d = true;
        }
        if (layer.visualChannels.hasOwnProperty('sizeField')) {
            layer.visualChannels.sizeField = {"name": height,"type":"real"};
        }
        });
        config.config.mapState.latitude = mapState.latitude;
        config.config.mapState.longitude = mapState.longitude;
        config.config.mapState.zoom = mapState.zoom;
        config.config.mapState.bearing = mapState.bearing;
        config.config.mapState.dragRotate = true;
        config.config.mapState.pitch = 57;
    } else {
        config.config.visState.layers.forEach(layer => {
        if (layer.config.visConfig.hasOwnProperty('enable3d')) {
            layer.config.visConfig.enable3d = false;
        }
        if (layer.visualChannels.hasOwnProperty('sizeField')) {
            layer.visualChannels.sizeField = null;
        }
        });

        config.config.mapState.latitude = mapState.latitude;
        config.config.mapState.longitude = mapState.longitude;
        config.config.mapState.zoom = mapState.zoom;
        config.config.mapState.bearing = mapState.bearing;
        config.config.mapState.dragRotate = false;
        config.config.mapState.pitch = 0;
    }
    e.toggleClass('isActive');
    customize(KeplerGl, store);
}