# npm-dnld-files

Download all files in a list separated by commas

## Installation

```sh
$ npm install -g @guidofc/dnld-files
```

Or if you prefer using Yarn:

```sh
$ yarn global add @guidofc/dnld-files
```

## Usage

First goes the command "dnld-files"

The second argument goes the url(s) separated by "," and without spaces

Third argument goes to the folder where it is going to be saved, if you do not put anything, it is saved in where the command is executed

## Command

```sh
$ dnld-files [url(s)] [save folder]
```

## Example for a single file

download an file and save it in the image folder

```sh
$ dnld-files https://example/image01.jpeg image
```

## Example for a multiple files

download two files and save it in the folder where the command is executed

```sh
$ dnld-files https://example/image01.jpeg,https://example/image02.jpeg
```
