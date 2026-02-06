import pandas as pd
import argparse
import os
from typing import List, Tuple
import ast, re
import time

def main():
    args = parse_arguments()

    create_js(
        args.input,
        args.output,
        args.label,
        args.data_id,
        args.variable,
        args.height,
        args.latitude,
        args.longitude,
        args.zoom,
        args.color_map,
        args.fields,
        args.tooltip_enabled,
        args.legend_map
    )

    return

def csv_file(path):
    if not isinstance(path, str):
        raise argparse.ArgumentTypeError("The output path must be a string.")
    if not path.endswith(".csv"):
        raise argparse.ArgumentTypeError("The input file must end with '.csv'")
    return path

def js_file(path):
    if not isinstance(path, str):
        raise argparse.ArgumentTypeError("The output path must be a string.")
    if not path.endswith(".js"):
        raise argparse.ArgumentTypeError("The output file must end with '.js'")
    return path

def color_map(value):
    try:
        parsed = ast.literal_eval(value)
    except Exception:
        raise argparse.ArgumentTypeError(
            "The color map must be a valid Python list of tuples."
        )
    
    if not isinstance(parsed, list):
        raise argparse.ArgumentTypeError("The color map must be a list.")
    
    hex_color_regex = re.compile(r"^#(?:[0-9a-fA-F]{3}){1,2}$")
    
    for i, item in enumerate(parsed):
        if not (isinstance(item, tuple) and len(item) == 2):
            raise argparse.ArgumentTypeError(
                f"Item {i} must be a tuple of (number, hex color)."
            )
        num, color = item
        if not isinstance(num, (int, float)):
            raise argparse.ArgumentTypeError(
                f"The first element of tuple {i} must be a number."
            )
        if not (isinstance(color, str) and hex_color_regex.match(color)):
            raise argparse.ArgumentTypeError(
                f"The second element of tuple {i} must be a valid hex color string."
            )
    
    return parsed

def fields(value):
    allowed_types = {"string", "integer", "real"}

    try:
        parsed = ast.literal_eval(value)
    except Exception:
        raise argparse.ArgumentTypeError(
            "The fields argument must be a valid Python list of tuples."
        )
    
    if not isinstance(parsed, list):
        raise argparse.ArgumentTypeError("The fields argument must be a list.")
    
    for i, item in enumerate(parsed):
        if not (isinstance(item, tuple) and len(item) == 5):
            raise argparse.ArgumentTypeError(
                f"Item {i} must be a tuple with exactly 5 elements."
            )
        field_name, field_type, field_label, tooltip, fmt = item
        
        if not isinstance(field_name, str):
            raise argparse.ArgumentTypeError(f"Item {i} field_name must be a string.")
        if not isinstance(field_type, str):
            raise argparse.ArgumentTypeError(f"Item {i} field_type must be a string.")
        if field_type not in allowed_types:
            raise argparse.ArgumentTypeError(
                f"Item {i} field_type must be one of {allowed_types}."
            )
        if not isinstance(field_label, str):
            raise argparse.ArgumentTypeError(f"Item {i} field_label must be a string.")
        if not isinstance(tooltip, bool):
            raise argparse.ArgumentTypeError(f"Item {i} tooltip must be a boolean.")
        if not (isinstance(fmt, str) or fmt is None):
            raise argparse.ArgumentTypeError(f"Item {i} format must be a string or None.")
    
    return parsed

def string_boolean(value):
    if value.lower() in {'true', '1', 'yes', 'y'}:
        return True
    if value.lower() in {'false', '0', 'no', 'n'}:
        return False
    raise argparse.ArgumentTypeError("Boolean value expected (True or False).")

def legend_map(value):
    try:
        parsed = ast.literal_eval(value)
    except Exception:
        raise argparse.ArgumentTypeError(
            "The legend_map must be a valid Python list of tuples."
        )
    
    if not isinstance(parsed, list):
        raise argparse.ArgumentTypeError("The legend_map must be a list.")
    
    hex_color_regex = re.compile(r"^#(?:[0-9a-fA-F]{3}){1,2}$")
    
    for i, item in enumerate(parsed):
        if not (isinstance(item, tuple) and len(item) == 2):
            raise argparse.ArgumentTypeError(
                f"Item {i} must be a tuple with exactly 2 elements (hex color, label)."
            )
        color, label = item
        if not (isinstance(color, str) and hex_color_regex.match(color)):
            raise argparse.ArgumentTypeError(
                f"Item {i}: first element must be a valid hex color string."
            )
        if not isinstance(label, str):
            raise argparse.ArgumentTypeError(
                f"Item {i}: second element must be a string label."
            )
    
    return parsed

def parse_arguments():
    parser = argparse.ArgumentParser(
        description=(
            "Generate a JavaScript file from a CSV containing H3 geospatial data for visualization on an interactive map."
        )
    )

    parser.add_argument(
        "--input",
        type=csv_file,
        required=True,
        help=(
            "Path to the input CSV file containing the data."
            "The DataFrame must include a 'h3_id' column with H3 indexes and a 'scale' column. "
            "The numeric 'scale' values are then mapped to colors using the color_map to assign a color to each hexagon."
        )
    )

    parser.add_argument(
        "--output",
        type=js_file,
        required=True,
        help="Path to the output JavaScript file (must end with .js)."
    )

    parser.add_argument(
        "--label",
        type=str,
        required=True,
        help="Title to display in the tooltip for each hexagon on the map."
    )

    parser.add_argument(
        "--data_id",
        type=str,
        required=True,
        help="Unique identifier for the dataset."
    )

    parser.add_argument(
        "--variable",
        type=str,
        required=True,
        help="Name of the variable represented by the 'scale' column."
    )

    parser.add_argument(
        "--height",
        type=str,
        required=True,
        help="Name of the column used to define the height of each hexagon."

    )

    parser.add_argument(
        "--latitude",
        type=float,
        required=True,
        help="Latitude to center the map view when loading the data."
    )

    parser.add_argument(
        "--longitude",
        type=float,
        required=True,
        help="Longitude to center the map view when loading the data."
    )

    parser.add_argument(
        "--zoom",
        type=int,
        required=True,
        help="Initial zoom level of the map when the data is loaded."
    )

    parser.add_argument(
        "--color_map",
        type=color_map,
        required=True,
        help=(
            "List of tuples defining the color mapping. Each tuple must have a number and a hex color string. "
            "For example: [(0, '#e31a1c'), (1, '#fd8d3c'), (2, '#c2e699')]"
        )
    )

    parser.add_argument(
        "--fields",
        type=fields,
        required=True,
        help=(
            "List of tuples defining fields to process. Each tuple must have 5 elements: "
            "(field_name:str, field_type:str, field_label:str, tooltip:bool, format:str or 'null'). "
            "field_type must be one of 'string', 'integer', or 'real' (for float values). "
            "Example: "
            "[('h3_id', 'string', 'h3_id', False, 'null'), ('mean_speed', 'real', 'Speed (km/h)', True, '.1f'), ('scale', 'integer', 'scale', False, 'null')]"
        )
    )

    parser.add_argument(
        "--tooltip_enabled",
        type=string_boolean,
        required=True,
        help=(
            "If True, tooltips will be displayed on the interactive map when hovering over a hexagon. "
            "If False, tooltips will not be shown."
        )
    )

    parser.add_argument(
        "--legend_map",
        type=legend_map,
        required=True,
        help=(
            "List of tuples defining the legend entries. "
            "Each tuple must contain a hex color string and a label string. "
            "Example: [ ('#006837', '50+ kph'), ('#78c679', '20-49 kph'), ('#e31a1c', '0-19 kph')]"
        )
    )

    args = parser.parse_args()
    return args

def create_js(
        input_path: str,
        output_path: str,
        label: str,
        data_id: str,
        variable: str,
        height: str,
        latitude: float,
        longitude: float,
        zoom: int,
        color_map: List[Tuple[int, str]], # color_map: List[Tuple[idscale, hexcolor]]
        fields: List[Tuple[str, str, str, bool, str]], # fields: List[Tuple[field_name, field_type, field_label, tooltip]]
        tooltip_enabled: bool,
        legend_map: List[Tuple[int, str]], # legend: List[Tuple[hexcolor, label]]
        ):

    t0 = time.time()

    js_content = ''
    js_content += f'var label = "{label}";\n'
    js_content += f'var data_id = "{data_id}";\n'
    js_content += f'var latitude = {latitude};\n'
    js_content += f'var longitude = {longitude};\n'
    js_content += f'var zoom = {zoom};\n'

    colors = '['
    cmap = '['
    for scale, hexcolor in color_map:
        colors += f"'{hexcolor}',"
        cmap += f"[{scale}, '{hexcolor}'],"
    colors = colors[:-1] + ']'
    cmap = cmap[:-1] + ']'

    js_content += f'var colors = {colors};\n';
    js_content += f'var color_map = {cmap};\n';

    legend = '['
    for hexcolor, label in legend_map:
        legend += f"['{hexcolor}', '{label}'],"
    legend = legend[:-1] + ']'

    js_content += f'var legend = {legend};\n';

    f = '[\n'
    tf = '{'+ f'"{data_id}": [\n'
    analyzerType = {'string': 'STRING', 'integer': 'INTEGER', 'real': 'FLOAT'}
    for field_name, field_type, field_label, tooltip, tformat in fields:
        tformat = f'"{tformat}"' if tformat != 'null' else f'{tformat}'
        if variable == field_name: variable = field_label
        if height == field_name: height = field_label
        f += f'\t{{"name":"{field_label}","type":"{field_type}","format":"","analyzerType":"{analyzerType[field_type]}"}},\n'
        if tooltip: tf += f'\t{{"name":"{field_label}","format":{tformat}}},\n'
    tf += ']};'
    f += '];'
    
    js_content += f'var variable = "{variable}"\n'
    js_content += f'var height = "{height}"\n'
    js_content += f'var fields = {f}\n'
    js_content += f'var tooltip_enabled = {str(tooltip_enabled).lower()};\n'
    js_content += f'var tooltip_fields = {tf}\n'
    
    js_content += '\n'

    df = pd.read_csv(input_path)

    if 'scale' not in df.columns: raise ValueError("The dataframe must contain a column 'scale'.")
    if 'h3_id' not in df.columns: raise ValueError("The dataframe must contain a column 'h3_id'.")

    df.rename(columns={field_name: field_label for field_name, _, field_label, _, _ in fields}, inplace=True)
    field_labels = [field_label for _, _, field_label, _, _ in fields]
    df = df.dropna(subset=[variable])
    data_list = [[row[field] for field in field_labels] for _, row in df.iterrows()]
    js_content += f'var data = {data_list};'
    
    with open(output_path, 'w') as f:
        f.write(js_content)

    t1 = time.time()
    elapsed_time = t1 - t0
    print(f'File {os.path.basename(output_path)} saved ({elapsed_time:.2f} sec)')

    return

if __name__ == '__main__':
    main()