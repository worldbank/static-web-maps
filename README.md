# Static Web Maps

[![CalVer](https://img.shields.io/badge/calver-YY.0M.MICRO-22bfda.svg)](https://calver.org)
[![GitHub Release](https://img.shields.io/github/v/release/worldbank/template)](https://github.com/worldbank/template/releases)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/worldbank/template/main.svg)](https://results.pre-commit.ci/latest/github/worldbank/template/main)

## Use case

You have high resolution geospatial point data, and you want to create an interactive website for others to be able to explore this data. The website has to be "static" (i.e., it is pre-made, and stays the same for every person that visits it), so that there are no back-end services or complicated hosting set-ups. It can be served from the simplest of hosting services (e.g., github pages), or can even be stored, accessed and used from a laptop or a USB drive. 

When hosted on an USB drive your user simply has to open an html, and can then start exploring the data interactively in their browser.

This application provides the website template and code for structuring your data to generate this ready-to-use interactive website.

## Usage

#### 1. **Prepare your data**

Assign [h3](https://h3geo.org/docs/highlights/indexing) spatial indices to your data, at your desired level of resolution. You can do this in Python with [h3-py](https://github.com/uber/h3-py). Collapse your data in ways that will make sense to your users. Format your data into CSVs as in the [examples](data/example-csv).

#### 2. **Construct website**

Follow the instuctions in the [user guide](docs/user-guide.md).

