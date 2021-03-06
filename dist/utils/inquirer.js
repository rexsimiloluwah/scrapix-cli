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
exports.Inquirer = exports.Mode = void 0;
/**
 * @author [Similoluwa Okunowo (The Caveman)]
 * @email [rexsimiloluwa@gmail.com]
 * @create date 2020-12-16 20:13:17
 * @modify date 2020-12-21 08:14:27
 * @desc [description]
 */
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var inquirer_1 = __importDefault(require("inquirer"));
var Mode;
(function (Mode) {
    Mode["FILE"] = "file";
    Mode["DEFAULT"] = "default";
})(Mode = exports.Mode || (exports.Mode = {}));
function Inquirer() {
    return __awaiter(this, void 0, void 0, function () {
        var modes, prompts;
        var _this = this;
        return __generator(this, function (_a) {
            modes = [
                { name: 'default', value: 'default' },
                { name: 'file', value: 'file' }
            ];
            prompts = [
                {
                    name: 'mode',
                    type: 'list',
                    message: 'Select mode to load search queries: - ',
                    choices: modes
                },
                {
                    name: 'input',
                    type: 'input',
                    message: 'Enter the names of images you want to download i.e. Cat,Dog: - ',
                    validate: function (input) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (input.length) {
                                return [2 /*return*/, true];
                            }
                            return [2 /*return*/, "Empty or Invalid input, seperate the names with commas."];
                        });
                    }); },
                    when: function (answers) { return answers.mode == 'default'; }
                },
                {
                    name: 'number',
                    type: 'input',
                    message: 'Enter the number of images to scrape: -',
                    validate: function (input) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!Number(input) || input < 0) {
                                return [2 /*return*/, "Input must be a number and greater than 0"];
                            }
                            return [2 /*return*/, true];
                        });
                    }); },
                    when: function (answers) { return answers.mode == 'default'; }
                },
                {
                    name: 'filename',
                    type: 'input',
                    message: 'Enter the name of the .json file: -',
                    validate: function (input) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!input.length) {
                                return [2 /*return*/, "Invalid filename, filename cannot be empty."];
                            }
                            if (path_1.default.extname(input) != '.json') {
                                return [2 /*return*/, "File must be a .json file."];
                            }
                            if (!fs_1.existsSync(path_1.default.join('.', input))) {
                                return [2 /*return*/, "File does not exist in the base path."];
                            }
                            if (!fs_1.readFileSync(path_1.default.join('.', input))) {
                                return [2 /*return*/, "File is empty, Kindly follow the specified format."];
                            }
                            return [2 /*return*/, true];
                        });
                    }); },
                    when: function (answers) { return answers.mode == 'file'; }
                }
            ];
            return [2 /*return*/, inquirer_1.default.prompt(prompts)];
        });
    });
}
exports.Inquirer = Inquirer;
