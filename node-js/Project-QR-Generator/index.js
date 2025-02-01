import inquirer from 'inquirer';
import qr from 'qr-image';
import fs, { writeFile } from 'fs';
inquirer
  .prompt([
    {
      message: "Enter your URL :",
      name: "URL",
    }
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url, { type: 'svg' });
    qr_svg.pipe(fs.createWriteStream('qr-img.svg'));
    console.log(`QR Code Generated Successfully!!!`);

    fs.writeFile("qr-url.txt", url, (err) => {
      if (err) {
        console.log(`Error : ${err}`);
      } else {
        console.log(`QR Code URL Saved Successfully!!!`);
      }
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(`Error is Tty Error : ${error}`)
    } else {
      console.log(`Error is Something Else!!! ERROR : ${error}`)
    }
  });