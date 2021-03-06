#!/usr/bin/env node
"use strict";
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
var commander_1 = require("commander");
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var clear_1 = __importDefault(require("clear"));
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var perf_hooks_1 = require("perf_hooks");
var inquirer_1 = require("./utils/inquirer");
var scraper_1 = require("./utils/scraper");
var _a = require('../package.json'), description = _a.description, version = _a.version;
if (!process.argv.slice(2).length) {
    clear_1.default(); // To clear the terminal
    console.log(chalk_1.default.red(figlet_1.default.textSync('Scrapix', { horizontalLayout: 'full' })));
    console.log(chalk_1.default.gray('??? A CLI tool for scraping Google images the right way'));
}
commander_1.program
    .description(description)
    .version(chalk_1.default.green("Version: " + version), '-v')
    .parse(process.argv);
// start the CLI 
function measurePromise(fn) {
    var onPromiseDone = function () { return perf_hooks_1.performance.now() - start; };
    var start = perf_hooks_1.performance.now();
    return fn().then(onPromiseDone, onPromiseDone);
}
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer_1.Inquirer().then(function (results) {
                    var input = results.input, number = results.number, filename = results.filename;
                    if (filename) {
                        var file_contents = JSON.parse(fs_1.readFileSync(path_1.default.join('.', filename), 'utf8'));
                        if (!file_contents['images'] || !file_contents['images'].length) {
                            console.log("File must contain the required images.");
                        }
                        else {
                            file_contents['images'].map(function (item, id) { return (scraper_1.scrapeImages(item['keyword'].trim(), item['number'])); });
                        }
                    }
                    else {
                        input.split(',').map(function (keyword) { return (scraper_1.scrapeImages(keyword.trim(), number)); });
                    }
                }).catch(function (error) {
                    console.log("An unknown error occurred --> " + error);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
start();
