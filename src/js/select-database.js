$(document).on('select2:open', () => {
    document.querySelector('.select2-container--open .select2-search__field').focus();
});

function setSelectOptions(id_selected){
    $('#dataset-select').empty();

    DATASETS.forEach(dataset => {
        const option = document.createElement("option");
        option.value = dataset.id;
        option.textContent = dataset.label;

        if (dataset.id === id_selected) option.selected = true;
   
        $('#dataset-select').append(option);
    });
}

document.addEventListener('hide.bs.modal', function (e) {
    if (document.activeElement) {
        document.activeElement.blur();
    }
});

function openModal(){
    $('#modal-database').modal('show');
}

function selectDataset(){
    const id_selected =  $('#dataset-select').val();
    const path = getSourcePath(id_selected);

    if (path != null){

        const dataset = DATASETS.find(d => d.id === id_selected);

        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        script.onload = function() {
            updateData();
            updateConfig();
            customize(KeplerGl, store);
            updateLegend();
            $('#modal-database').modal('hide');
        
            const url = new URL(window.location);
            url.searchParams.set("s", dataset.id);
            history.replaceState(null, "", url.toString());
        }
        script.onerror = function() {
            alert("Error: The file '" + dataset.label + "' is not available.");
        };
        
        document.body.appendChild(script);

    } else {
        alert("An error occurred when selecting the dataset. Please try a different one.")
    }
}

function updateData(){
    datasets[0].data.id = data_id;
    datasets[0].data.label = label;
    datasets[0].data.allData = data;
    datasets[0].data.fields = fields;
}

function updateConfig(){
    const state = store.getState();
    const mapState = state.keplerGl?.map?.mapState;

    config.config.visState.layers[0].id = data_id+'-layer';
    config.config.visState.layers[0].config.dataId = data_id;
    config.config.visState.layers[0].config.label = label;
    config.config.visState.layers[0].config.visConfig.colorRange.colors = colors;
    config.config.visState.layers[0].config.visConfig.colorRange.colorMap = color_map;
    config.config.visState.interactionConfig.tooltip.fieldsToShow = tooltip_fields;
    config.config.visState.interactionConfig.tooltip.enabled = tooltip_enabled;
    config.config.mapState.latitude = mapState.latitude;
    config.config.mapState.longitude = mapState.longitude;
    config.config.mapState.zoom = mapState.zoom;
    config.config.mapState.bearing = mapState.bearing;
    config.config.visState.layers.forEach(layer => {
        if (layer.visualChannels.hasOwnProperty('sizeField') & layer.config.visConfig.enable3d == true) {
            layer.visualChannels.sizeField = {"name":height,"type":"real"};
        }
    });
}


