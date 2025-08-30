const DATASETS = [
  {
    id: "speed",
    label: "Speed 2023-12",
    path: "./data/speed.js"
  },
  {
    id: "traffic",
    label: "Traffic 2023-12",
    path: "./data/traffic.js"
  },
];

const DEFAULT_DATASET_ID = 'speed';

const DEFAULT_OPACITY = 0.6;

const MODAL_INFO_TITLE = "Information";

const MODAL_INFO_BODY = `
  <p><b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. Ut sagittis libero ut risus tempus, a semper magna pharetra. Suspendisse potenti. Donec vitae purus turpis. Suspendisse sodales mauris eget velit laoreet, nec feugiat magna dictum. Proin ornare ligula erat, non ullamcorper nibh tincidunt et. Phasellus semper ac sem vitae sagittis. Integer tempor neque accumsan nunc porttitor ultrices. Morbi id ante sed nibh feugiat rhoncus. Morbi venenatis interdum ex ac porta. Mauris gravida, nunc eget condimentum placerat, mi velit consectetur quam, eu tempus nibh justo eu augue. Duis gravida quis mi vel convallis. Proin tincidunt ante quis turpis mattis imperdiet. Duis imperdiet sagittis ex, nec tincidunt nunc.</p>

  <p><i>Aliquam et quam sed mauris tristique dictum vel sit amet quam.</i> Phasellus non augue in magna posuere lacinia vitae ac elit. Nunc nec nulla eu ligula tincidunt cursus sit amet vestibulum justo. Mauris dui ex, porta et gravida in, varius vel urna. Morbi non mi eu sapien molestie ultrices. Duis laoreet ex sed laoreet egestas. In sed rhoncus lectus. Morbi neque dui, aliquam quis mattis vel, tincidunt ac erat. Nullam at molestie risus. Aenean congue id magna vitae congue. Sed quis quam sapien. Nunc consectetur urna in arcu pharetra, eget pulvinar odio tristique. Suspendisse potenti.</p>

  <p><u>Aliquam erat volutpat</u>. Nam dictum, quam vitae gravida ornare, est felis mattis lorem, vel interdum risus arcu at metus. In tempor at elit dapibus lobortis. Sed commodo gravida dui mattis finibus. Morbi id arcu vestibulum dolor eleifend faucibus. In hac habitasse platea dictumst. Aenean vitae justo id nibh auctor laoreet. Cras eu nunc ac ex dictum luctus.</p>

  <p>In consectetur orci nunc, eu egestas purus euismod eu. Maecenas rutrum mauris quis neque facilisis luctus. Nam posuere, tortor ac condimentum dapibus, ligula metus interdum leo, condimentum faucibus leo felis vitae mauris. Sed porttitor ligula ex, consequat fermentum nibh sodales sit amet. Sed vitae convallis nibh, non pretium ex. Donec vehicula tempus egestas. Proin non placerat mi. Vivamus hendrerit hendrerit nisl ac blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas diam justo, vehicula vitae laoreet sit amet, dignissim quis lorem. Nam sit amet condimentum diam. Curabitur cursus consequat efficitur. Suspendisse augue tortor, commodo at finibus eu, molestie sed nisi.</p>
`;