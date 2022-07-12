#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const arg = require('arg');
const _ = require('lodash');

const downloadFile = async (url, output) => {
  const fileName = path.basename(url);

  const fileRoute = path.resolve(__dirname, process.cwd(), output, fileName);

  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    await createFile(response.data, fileRoute);
  } catch (err) {
    console.log('Request failed :', url);
  }
};

const createFile = (data, fileRoute) => {
  return new Promise((resolve, reject) => {
    const w = data.pipe(fs.createWriteStream(fileRoute));

    w.on('finish', () => {
      resolve('Successfully downloaded file!');
    });
  });
};

const start = async () => {
  const {
    _: [assets, output = ''],
  } = arg({});

  const dir = `${process.cwd()}${output && `/${output}`}`;

  if (assets == undefined && output == '') {
    return console.log(
      '\n-----------------------------------\n\ndnld-files [url(s)] [save in]\n\n-----------------------------------\n'
    );
  }

  console.log('\n-----------------------------------\n\nInitializing');

  if (!assets) {
    return console.log('Url required\n\n-----------------------------------\n');
  }

  if (!fs.existsSync(dir)) {
    return console.log(
      'Directory not found\n\n-----------------------------------\n'
    );
  }

  const chunkList = _.chunk(
    assets.split(',').filter((e) => e),
    50
  );

  console.log('Downloading...');

  for await (const row of chunkList) {
    await Promise.all(row.map((item) => downloadFile(item, output)));
  }

  console.log('Finalized\n\n-----------------------------------\n');
};

start();
