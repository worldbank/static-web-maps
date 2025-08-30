function toggleOpacity(){
    $(`input[name="opacity-option"][value="${opacity}"]`).prop("checked", true)
    $('.wb-opacity').toggleClass('isActive');
    $('.wb-opacity-box').toggle();
}

function updateOpacity(){
    let o = $('input[name="opacity-option"]:checked').val();
    config.config.visState.layers[0].config.visConfig.opacity = o;
    updateConfig();
    customize(KeplerGl, store);
}

$('input[name="opacity-option"]').on('change', function () {
    updateOpacity()
});