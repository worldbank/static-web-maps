function checkConstants() {
  const constants = [
    "DATASETS",
    "DEFAULT_DATASET_ID",
    "DEFAULT_OPACITY",
    "MODAL_INFO_TITLE",
    "MODAL_INFO_BODY"
  ];

  const missing = constants.filter(name => {
    try {
      return typeof eval(name) === "undefined";
    } catch (e) {
      return true;
    }
  });

  if (missing.length > 0) {
    alert("The following constants are not defined:\n" + missing.join("\n") + "\nPlease check the configuration file.");
  }
}

function checkDefaultOpacity() {
  const allowedValues = [0, 0.2, 0.4, 0.6, 0.8, 1];

  if (typeof DEFAULT_OPACITY === "undefined") {
    alert("DEFAULT_OPACITY is not defined. Please check the configuration file.");
    return;
  }

  if (typeof DEFAULT_OPACITY !== "number") {
    alert("DEFAULT_OPACITY must be a number. Please check the configuration file.");
    return;
  }

  if (!allowedValues.includes(DEFAULT_OPACITY)) {
    alert("DEFAULT_OPACITY must be one of the following values:\n" + allowedValues.join(", "));
    return;
  }
}

function checkDatasets() {
  if (typeof DATASETS === "undefined") {
    alert("DATASETS is not defined. Please check the configuration file.");
    return;
  }

  if (!Array.isArray(DATASETS)) {
    alert("DATASETS must be an array. Please check the configuration file.");
    return;
  }

  const ids = new Set();
  const errors = [];

  DATASETS.forEach((item, index) => {
    if (typeof item !== "object" || item === null) {
      errors.push(`- Item at index ${index} is not an object.`);
      return;
    }

    const keys = ["id", "label", "path"];
    keys.forEach(key => {
      if (!(key in item)) {
        errors.push(`- Item at index ${index} is missing key '${key}'.`);
      }
    });

    if ("id" in item) {
      if (ids.has(item.id)) {
        errors.push(`- Duplicate id '${item.id}' found at index ${index}.`);
      } else {
        ids.add(item.id);
      }
    }
  });

  if (errors.length > 0) {
    alert("Errors found in DATASETS:\n" + errors.join("\n") + "\nPlease check the configuration file.");
  }
}

function checkDefaultDatasetId() {
  if (typeof DEFAULT_DATASET_ID === "undefined") {
    alert("DEFAULT_DATASET_ID is not defined. Please check the configuration file.");
    return;
  }

  if (typeof DEFAULT_DATASET_ID !== "string") {
    alert("DEFAULT_DATASET_ID must be a string. Please check the configuration file.");
    return;
  }

  const ids = DATASETS.map(item => item.id);
  if (!ids.includes(DEFAULT_DATASET_ID)) {
    alert(
      "DEFAULT_DATASET_ID does not match any ID in DATASETS.\n" +
      "Please check the configuration file."
    );
    return;
  }
}

checkConstants();
checkDefaultOpacity();
checkDatasets();
checkDefaultDatasetId();