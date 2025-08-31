# Static Web Map Documentation

## Overview

The main file is **`interactive_map.html`**, which can be opened in any web browser. This HTML file imports:  

- CSS styles from the **`css/`** folder  
- JavaScript libraries and custom scripts from the **`src/js/`** folder  
- Datasets from the **`data/`** folder  

⚠️ It is important to maintain the folder structure so that the HTML file can locate all required resources.

### Offline Usage and Dataset Format

The interactive map is designed to work **offline**, without the need for a server. For security reasons, browsers restrict JavaScript from reading non-JS/CSS files directly. Therefore, datasets are **not consumed as CSV files**, but instead are converted into `.js` files containing a `data` variable with all the information from the CSV.  

In addition to the dataset, `.js` files should define additional variables for map configuration and styling. These files can be generated using **`src/csv_to_js.py`** (see "Dataset to JavaScript" section for details).  

Once the `.js` files are generated and placed in the `data/` folder, the **`config.js`** file must be updated accordingly (see "Configuration File" section for details).



## Features

In the top-right corner of the map, there are six vertically stacked buttons:

1. **Info**: Opens a modal with customizable information.  
2. **Dataset**: Allows switching the dataset currently displayed.  
3. **3D Map**: Toggles 3D view, where the height of each hexagon represents a second variable.  
4. **Opacity**: Adjusts the hexagon opacity. Options: 0%, 20%, 40%, 60%, 80%, 100%. Lower opacity allows viewing the base map underneath.  
5. **Legend**: Shows or hides the map legend.  
6. **Reset Orientation**: Resets map orientation. Orientation can be changed in 3D mode, or in 2D mode using **⌘ + arrow keys** (MacOS). Clicking this button restores initial values.



## CSS Files

The `css/` folder contains the following stylesheets:

- **`maplibre-gl.css`**: Used by KeplerGl
- **`bootstrap.css`**: Bootstrap styles for modals ([Bootstrap](https://getbootstrap.com/))  
- **`select2.min.css`**: Styles for [Select2](https://select2.org/) enhancing form select elements  
- **`interactive_map.css`**: Custom styles prefixed with `wb-`  



## JavaScript Files

The `src/js/` folder contains multiple files:

### Libraries (offline usage)
- **`bootstrap.bundle.min.js`** – [Bootstrap](https://getbootstrap.com/) library for modals.
- **`jquery-3.7.1.min.js`** – [jQuery](https://jquery.com/) is an open-source JavaScript library that simplifies writing JavaScript code.
- **`select2.min.js`** – [Select2](https://select2.org/) is a JavaScript library and jQuery plugin that replaces standard HTML `<select>` elements with a more user-friendly and functional interface, including features such as search.
- **`keplergl.min.js`, `redux.js`, `styled-components.min.js`, `react*.min.js`** – Libraries for KeplerGl.

### Custom functionality
- **`legend.js`**, **`opacity.js`**, **`orientation.js`**, **`select-database.js`**, **`toggle3d.js`** – Scripts implementing map features.
- **`config-validation.js`** – Validates parameters from `config.js` when the map loads.



## Configuration File: `config.js`

This file contains **five mandatory constants**:

1. **`DATASETS`** – List of available datasets for the select menu. Each dataset is a dictionary with:  
   - `id` – Unique identifier  
   - `label` – Display name in the select dropdown  
   - `path` – Path to the `.js` data file  

2. **`DEFAULT_DATASET_ID`** – The `id` of the dataset loaded by default.  
3. **`DEFAULT_OPACITY`** – Initial hexagon opacity. Valid values: 0, 0.2, 0.4, 0.6, 0.8, 1  
4. **`MODAL_INFO_TITLE`** – Title displayed in the Info modal  
5. **`MODAL_INFO_BODY`** – HTML content for the Info modal. Use **backticks (`)** for multi-line HTML content.



## Dataset to JavaScript (`csv_to_js.py`)

This script converts CSV datasets into `.js` files. It supports **command-line arguments** via `argparse`, or can be imported as a Python module to directly call the `create_js` function  (**`src/example.sh`** provides a console execution example). The **`data/example-data/`** folder contains two example CSV datasets with randomly generated traffic and speed data. These files can be used to test the code and serve as a reference for how the CSV should be structured.

Inputs are defined in the parser help and summarized below:

| Parameter | Description |
|-----------|-------------|
| **INPUT** | Path to CSV file. Must include a column `h3_id` (hexagon H3 index) and a column `scale` (used for color mapping). |
| **OUTPUT** | Path to the output `.js` file |
| **LABEL** | Title displayed in the tooltip |
| **DATA_ID** | Unique identifier for the dataset (must be unique across datasets) |
| **VARIABLE** | Variable used for hexagon color visualization. In Python, it is also used to drop null values and to define the legend title |
| **HEIGHT** | Variable representing height for 3D map visualization |
| **LATITUDE** | Initial latitude of the map center |
| **LONGITUDE** | Initial longitude of the map center |
| **ZOOM** | Initial zoom level |
| **COLOR_MAP** | List of tuples `(scale_value, hex_color)` mapping scale values to colors |
| **FIELDS** | List of tuples `(field_name, field_type, field_label, tooltip, format)`* |
| **TOOLTIP_ENABLED** | Boolean: show/hide tooltip |
| **LEGEND_MAP** | List of tuples `(hex_color, label)` that define the map legend. The order of the list determines the order in which items appear in the legend. |

\* Each tuple must contain the following elements:  
- `field_name`: the name of the variable. 
- `field_type`: the type of the variable (`string`, `integer`, or `real` for decimal values).
- `field_label`: the label to display on the map for this column.
- `tooltip`: boolean indicating whether this variable should be included in the tooltip.
- `format`: specifies how the value should be displayed (e.g., no decimals, one decimal, two decimals, etc.)



### Notes

- **URL dataset parameter**: Add `?s={DATASET_ID}` to the URL to pre-select a dataset. Example: `../interactive_map.html?s=speed`
- **Latitude, Longitude, Zoom** only apply when the map loads for the first time. Changing datasets after initial load keeps the current view — unless you refresh the page or load a new dataset through the URL (which also refreshes the page).
- **Variable and legend**: In the legend, the displayed variable name corresponds to the `field_label` defined in `FIELDS`.
- **Scale column**: Instead of using a continuous scale, values are grouped into discrete intervals. Each interval is identified by a number. The `scale` column indicates the interval number to which a variable value belongs. This `scale` value is then mapped to a specific color using `COLOR_MAP`.



## Usage Summary

1. Generate the datasets in `.js` format using the `src/csv_to_js.py` script, and place them in the `data/` folder.  
2. Update `config.js` constants as needed.  
3. Open `interactive_map.html` in a browser to visualize the map.  
4. Use URL parameters to pre-select datasets if desired.
