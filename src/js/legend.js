function updateLegend() {
    $('.wb-legend-title').html(variable);
    const c = document.getElementById('legend-container');

    c.innerHTML = "";

    const table = document.createElement("table");

    legend.forEach(([color, label]) => {
        const row = document.createElement("tr");

        const colorCell = document.createElement("td");
        colorCell.className = "wb-legend-color"
        const colorBox = document.createElement("div");
        colorBox.style.height = "10px";
        colorBox.style.backgroundColor = color;
        colorCell.appendChild(colorBox);

        const textCell = document.createElement("td");
        textCell.textContent = label;
        textCell.className = "wb-legend-label"

        row.appendChild(colorCell);
        row.appendChild(textCell);
        table.appendChild(row);
    });

    // Agregar la tabla al contenedor
    c.appendChild(table);
}

function toggleLegend(){
    $('.wb-legend').toggleClass('isActive');
    $('.wb-legend-box').toggle();
}