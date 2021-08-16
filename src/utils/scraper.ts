/**
 * @author [Similoluwa Okunowo (The Caveman)]
 * @email [rexsimiloluwa@gmail.com]
 * @create date 2020-12-16 20:13:17
 * @modify date 2020-12-21 08:14:27
 * @desc [description]
 */

import fs from 'fs';
import path from 'path';
import request from 'request';
import Scraper from 'images-scraper';

// Initialize the scraper 
const google = new Scraper({
    puppeteer: {
        headless: false,
    }
})

export interface ScrapedImage {
    id: number,
    url: string,
    source?: string,
    title?: string
}

export interface FileContent {
    keyword: string, 
    number: number
}

// Helper functions 

const file_headers: object = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
}


export async function saveFileFromURL(url: string, destination: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        request.get(url, file_headers)
            .on('response', (response) => {
                console.log(response.statusCode)
            })
            .on('error', (err) => {
                fs.unlinkSync(destination);
                reject(`${destination} --> ${err}`);
            })
            .pipe(fs.createWriteStream(destination))
            .on('close', () => {
                resolve();
            })

    })
}

export async function saveScrapedImages(image: ScrapedImage, name: string): Promise<void> {
    if (!fs.existsSync(path.join('.','images'))){ fs.mkdirSync(path.join('.', 'images')) };
    if (!fs.existsSync(path.join('.',`images/${name}`))) {
        fs.mkdir(path.join('.', `images/${name}`), { recursive: true }, (err) => {
            console.log(err)
        })
    }
    //console.log(`Directory ${name} created successfully !`)
    saveFileFromURL(image.url, path.join('.', `images/${name}/${image.id}.jpg`))
        .then(()=>{
            console.log('Successfully downloaded file.');
        }).catch(error=>{
            console.log(`An error occurred: - ${error}.`);
        })
}

export async function scrapeImages(keyword: string, num: number): Promise<void> {
    await google.scrape(keyword.toLowerCase().trim(), num)
        .then(results => {
            let imageUrls = Object.values(results).map((item: ScrapedImage, id: number) => (
                { id: id, url: item.url }
            ))

            for (let idx in imageUrls) {
                console.log(imageUrls[idx])
                saveScrapedImages(imageUrls[idx], keyword)
            }
        })
        .catch(error => {
            console.log(`An error occurred: - ${error}.`)
        })

}

