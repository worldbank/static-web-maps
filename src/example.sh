BASEFOLDER="$(dirname "$(pwd)")"

python3 csv_to_js.py \
  --input "${BASEFOLDER}/data/example-csv/data-speed.csv"\
  --output "${BASEFOLDER}/data/speed.js"\
  --label "2023-12"\
  --data_id "speed-2023-12"\
  --variable "mean_speed"\
  --height "count_traffic"\
  --latitude "-1.9420" \
  --longitude "29.6789" \
  --zoom "12" \
  --color_map "[(0, '#e31a1c'), (1, '#fd8d3c'), (2, '#c2e699'), (3, '#78c679'), (4, '#31a354'), (5, '#006837')]" \
  --fields "[('h3_id', 'string', 'h3_id', False, 'null'), ('mean_speed', 'real', 'Speed (km/h)', True, '.1f'), ('count_traffic', 'real', 'Traffic (ADT)', True, '.1f'), ('scale', 'integer', 'scale', False, 'null')]" \
  --tooltip_enabled True \
  --legend_map "[('#006837', '50+ kph'), ('#31a354', '40-49 kph'), ('#78c679', '30-39 kph'),  ('#c2e699', '20-29 kph'),  ('#fd8d3c', '10-19 kph'),  ('#e31a1c', '0-9 kph')]"

python3 csv_to_js.py \
  --input "${BASEFOLDER}/data/example-csv/data-traffic.csv"\
  --output "${BASEFOLDER}/data/traffic.js"\
  --label "2023-12"\
  --data_id "traffic-2023-12"\
  --variable "count_traffic"\
  --height "count_traffic"\
  --latitude "-1.9420" \
  --longitude "29.6789" \
  --zoom "12" \
  --color_map "[(0, '#fcc5c0'), (1, '#fa9fb5'), (2, '#f768a1'), (3, '#dd3497'), (4, '#ae017e'), (5, '#7a0177')]" \
  --fields "[('h3_id', 'string', 'h3_id', False, 'null'), ('count_traffic', 'real', 'Traffic (ADT)', True, '.1f'), ('scale', 'integer', 'scale', False, 'null')]" \
  --tooltip_enabled True \
  --legend_map "[('#7a0177', 'Over 25'), ('#ae017e', '20 to 24.9'), ('#dd3497', '15 to 19.9'), ('#f768a1', '10 to 14.9'), ('#fa9fb5', '5 to 9.9'), ('#fcc5c0', '0 to 4.9')]"        