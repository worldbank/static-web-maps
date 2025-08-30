function resetOrientation(){
    const state = store.getState();
    const mapState = state.keplerGl?.map?.mapState;
    if (mapState.bearing != 0) {
      updateConfig();
      config.config.mapState.bearing = 0;
      customize(KeplerGl, store);
    }
}