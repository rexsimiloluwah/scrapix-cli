"use strict";
/**
 * @author [Similoluwa Okunowo (The Caveman)]
 * @email [rexsimiloluwa@gmail.com]
 * @create date 2020-12-16 20:13:17
 * @modify date 2020-12-21 08:14:27
 * @desc [description]
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeImages = exports.saveScrapedImages = exports.saveFileFromURL = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var request_1 = __importDefault(require("request"));
var images_scraper_1 = __importDefault(require("images-scraper"));
// Initialize the scraper 
var google = new images_scraper_1.default({
    puppeteer: {
        headless: false,
    }
});
// Helper functions 
var file_headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
};
function saveFileFromURL(url, destination) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    request_1.default.get(url, file_headers)
                        .on('response', function (response) {
                        console.log(response.statusCode);
                    })
                        .on('error', function (err) {
                        fs_1.default.unlinkSync(destination);
                        reject(destination + " --> " + err);
                    })
                        .pipe(fs_1.default.createWriteStream(destination))
                        .on('close', function () {
                        resolve();
                    });
                })];
        });
    });
}
exports.saveFileFromURL = saveFileFromURL;
function saveScrapedImages(image, name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!fs_1.default.existsSync(path_1.default.join('.', 'scraped-images'))) {
                fs_1.default.mkdirSync(path_1.default.join('.', 'scraped-images'));
            }
            ;
            if (!fs_1.default.existsSync(path_1.default.join('.', "scraped-images/" + name))) {
                fs_1.default.mkdir(path_1.default.join('.', "scraped-images/" + name), { recursive: true }, function (err) {
                    console.log(err);
                });
            }
            //console.log(`Directory ${name} created successfully !`)
            saveFileFromURL(image.url, path_1.default.join('.', "scraped-images/" + name + "/" + image.id + ".jpg"))
                .then(function () {
                console.log('Successfully downloaded file.');
            }).catch(function (error) {
                console.log("An error occurred: - " + error + ".");
            });
            return [2 /*return*/];
        });
    });
}
exports.saveScrapedImages = saveScrapedImages;
function scrapeImages(keyword, num) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, google.scrape(keyword.toLowerCase().trim(), num)
                        .then(function (results) {
                        var imageUrls = Object.values(results).map(function (item, id) { return ({ id: id, url: item.url }); });
                        for (var idx in imageUrls) {
                            console.log(imageUrls[idx]);
                            saveScrapedImages(imageUrls[idx], keyword);
                        }
                    })
                        .catch(function (error) {
                        console.log("An error occurred: - " + error + ".");
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.scrapeImages = scrapeImages;
