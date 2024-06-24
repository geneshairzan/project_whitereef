// import { Formidable } from "formidable";
const formidable = require("formidable");

const fs = require("fs");
const path = require("path");

export const upload = async (file, newfilename, storage = "public") => {
  if (newfilename) {
    newfilename = newfilename + getExt(file.originalFilename);
  }
  const dir = path.resolve(`storage/upload/${storage}`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`${dir}/${newfilename || file.originalFilename}`, data);
  fs.unlinkSync(file.filepath);

  return newfilename || file.originalFilename;

  //   fs.rename(file.originalFilename, `storage/upload/${newfilename || file.originalFilename}`, (err) => err);
  return;
};

export const parse = async (request) =>
  await new Promise((resolve, reject) => {
    // const form = new Formidable({ multiples: false });
    const form = new formidable.IncomingForm({ multiples: true });

    // const form = new Formidable.IncomingForm({ multiples: true });

    let inputFields = {};
    let inputFiles = {};
    form.parse(request, function parsedMultipart(err, fields, files) {
      if (err) reject({ err });
      const fieldsObject = {};
      // console.log(fields);
      for (const fieldName in fields) {
        if (fields.hasOwnProperty(fieldName)) {
          fieldsObject[fieldName] = fields[fieldName][0];
        }
      }
      for (const fieldName in files) {
        if (files.hasOwnProperty(fieldName)) {
          fieldsObject[fieldName] = files[fieldName][0];
        }
      }
      resolve(fieldsObject);
    });
  });

export const getExt = (fileName) => fileName.substr(fileName.lastIndexOf("."));
