# Static Web Maps

<!-- [![CalVer](https://img.shields.io/badge/calver-YY.0M.MICRO-22bfda.svg)](https://calver.org)
[![GitHub Release](https://img.shields.io/github/v/release/worldbank/template)](https://github.com/worldbank/template/releases)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/worldbank/template/main.svg)](https://results.pre-commit.ci/latest/github/worldbank/template/main) -->

## Use case

You have high resolution geospatial point data, and you want to create an interactive website for users to be able to explore this data. The website has to be "static" (i.e., it is pre-made, and stays the same for every person that visits it), so that there are no back-end services or complicated hosting set ups. It can be served from the simplest of hosting services (e.g., github pages), on an intranet, or can even be stored, accessed and used from a laptop or a USB drive. Data does not need to be shared or processed by external parties.

When hosted on an USB drive your user simply has to open an html, and can then explore data-intensive maps interactively in a browser.

This application provides the website template and code for structuring your data to generate this ready-to-use interactive mapping portal. The mapping is done in browser by the [kepler.gl](https://kepler.gl) library.

**Question: What kind of maps does this produce?**

The tool is currently set up to produce 2D and 3D hexagonal bin maps.

**Question: Wait, doesn't kepler.gl already provide this functionality?**

Not currently. If you only have one dataset to plot, and you're free to upload it to an external service, then you could use the kepler.gl [demo](https://kepler.gl/demo) to export a single web map as a static html page. In contrast, you can use [static-web-maps](https://github.com/worldbank/static-web-maps) locally on many datasets, and it will create a drop-down within the map portal itself so that your user can switch between as many maps as needed. 

## Usage

#### 1. **Prepare your data**

Assign [h3](https://h3geo.org/docs/highlights/indexing) spatial indices to your data, at your desired level of resolution. You can do this in Python with [h3-py](https://github.com/uber/h3-py). Collapse your data in ways that will make sense to your users. Format your data into CSVs as in the [examples](data/example-csv).

#### 2. **Construct website**

Follow the instuctions in the [user guide](docs/user-guide.md).

