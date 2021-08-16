<h1 align="center">
  Scrapix
</h1>
<h4 align="center">
    A TypeScript-based CLI tool for scraping and downloading Google images 🚀.
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/make-cli-tool?icon=npm" />
  <img src="https://badgen.net/github/last-commit/sajmoni/make-cli-tool?icon=github" />
</div>

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

### Description
`Scrapix` is an interactive CLI for scraping and downloading Google images easily. The core of this CLI is the [images-scraper](https://www.npmjs.com/package/images-scraper) package, which uses a puppeteer-based headless browser to automatically search and return the URLs of the images. This `scrapix` CLI can help developers and non-developers to build image datasets for computer vision tasks i.e. image classification, object detection, face recognition. 

### Installation
```bash
$ npm install -g scrapix-cli
```

### To resolve `puppeteer` installation issues on Linux based OS: -
```bash
$ sudo npm install -g scrapix-cli --unsafe-perm=true
```

### Usage 
To start the CLI, Type the `scrapix` command in your CMD or terminal: -
```bash
$ scrapix
```
### Modes 
| default | The search keywords are defined in the terminal directly |
|---------|----------------------------------------------------------|
| file    | The search keywords are defined in a .json file.         |

##### Default mode: usage
Required Parameters: -
- `keywords`: - The names of images you want to download seperated by commas (i.e. roses,daisy,hibiscus)
- `number`: - The number of images you want to download

##### File mode: usage
Required parameters: -
- Name of .json file in the base directory to load the keyword and number of images to be scraped and downloaded for each keyword.

##### Structure of the .json file content
```json
{
    "images": [
        {"keyword": "roses", "number":20},
        {"keyword":"daisy", "number":25},
        {"keyword":"hibiscus", "number":30},
    ]
}
```

[View Video Demonstration](https://www.youtube.com/watch?v=3mRXiu-i4TY)

### TODOS
- Image validation 
- Support for custom image processing actions i.e. resizing, compression
- Improve error handling
- Provide support for other search engines i.e. Bing, Wikipedia
- Improve general performance
- Clean code and develop a better documentation

### Contributing Guide
Coming soon 
