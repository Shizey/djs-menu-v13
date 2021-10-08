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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var MenuButton = /** @class */ (function () {
    function MenuButton() {
        this.label = "";
        this.style = "PRIMARY";
        this.target = "";
        this.emoji = "";
        this.url = "";
        this.id = "";
    }
    MenuButton.prototype.setLabel = function (label) {
        this.label = label;
        return this;
    };
    MenuButton.prototype.setStyle = function (style) {
        this.style = style;
        return this;
    };
    MenuButton.prototype.setTarget = function (target) {
        this.target = target;
        return this;
    };
    MenuButton.prototype.setEmoji = function (emoji) {
        this.emoji = emoji;
        return this;
    };
    MenuButton.prototype.setURL = function (url) {
        this.url = url;
        return this;
    };
    MenuButton.prototype.setId = function (id) {
        this.id = id;
        return this;
    };
    return MenuButton;
}());
var Menu = /** @class */ (function () {
    function Menu(interaction) {
        this.pages = [];
        this.interaction = interaction;
        this.currentCollector = {};
    }
    Menu.prototype.addPage = function (page) {
        this.pages.push(page);
        return { pages: this.pages, interaction: this.interaction, currentCollector: this.currentCollector, start: this.start, stop: this.stop, addPage: this.addPage, doCollector: this.doCollector };
    };
    Menu.prototype.start = function (id) {
        var _this = this;
        var page = id ? this.pages.find(function (page) { return page.id === id; }) : this.pages[0];
        displayPage(this.interaction, page).then(function () {
            _this.doCollector(page);
        });
        return { stop: this.stop, currentCollector: this.currentCollector, doCollector: this.doCollector };
    };
    Menu.prototype.stop = function () {
        function isEmpty(obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    return false;
                }
            }
            return JSON.stringify(obj) === JSON.stringify({});
        }
        if (!isEmpty(this.currentCollector)) {
            this.currentCollector.stop();
            this.currentCollector = {};
            return;
        }
    };
    Menu.prototype.doCollector = function (page) {
        var _this = this;
        var _a;
        var filter = function (i) { return i.user.id === _this.interaction.user.id && i.customId.split('.')[1] === _this.interaction.user.id; };
        var collector = (_a = this.interaction.channel) === null || _a === void 0 ? void 0 : _a.createMessageComponentCollector({ filter: filter, time: 60000, max: 1 });
        this.currentCollector = collector;
        console.log(collector, this.currentCollector);
        collector === null || collector === void 0 ? void 0 : collector.on('collect', function (i) { return __awaiter(_this, void 0, void 0, function () {
            var id, target, newPage;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = i.customId.split('.')[0];
                        target = (_a = page === null || page === void 0 ? void 0 : page.buttons.find(function (button) { return button.id === id; })) === null || _a === void 0 ? void 0 : _a.target;
                        newPage = this.pages.find(function (page) { return page.id === target; });
                        return [4 /*yield*/, displayPage(this.interaction, newPage, i)];
                    case 1:
                        _b.sent();
                        this.currentCollector = {};
                        this.doCollector(newPage);
                        return [2 /*return*/];
                }
            });
        }); });
        return this;
    };
    return Menu;
}());
function displayPage(interaction, page, iButton) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var content, buttons, raw, i, newInteraction, newInteraction, newInteraction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = (page === null || page === void 0 ? void 0 : page.content) || ".";
                    buttons = (page === null || page === void 0 ? void 0 : page.buttons) || [];
                    raw = new discord_js_1.MessageActionRow();
                    for (i = 0; i < buttons.length; i++) {
                        raw.addComponents(new discord_js_1.MessageButton().setCustomId(buttons[i].id + "." + interaction.user.id).setLabel("" + buttons[i].label).setStyle(buttons[i].style).setEmoji(buttons[i].emoji).setURL("" + buttons[i].url));
                    }
                    if (!iButton) return [3 /*break*/, 1];
                    newInteraction = iButton.update({ embeds: page === null || page === void 0 ? void 0 : page.embeds, content: "" + content, components: [raw] });
                    resolve(newInteraction);
                    return [3 /*break*/, 5];
                case 1:
                    if (!interaction.replied) return [3 /*break*/, 3];
                    return [4 /*yield*/, interaction.editReply({ embeds: page === null || page === void 0 ? void 0 : page.embeds, content: "" + content, components: [raw] })];
                case 2:
                    newInteraction = _a.sent();
                    resolve(newInteraction);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, interaction.reply({ embeds: page === null || page === void 0 ? void 0 : page.embeds, content: "" + content, components: [raw] })];
                case 4:
                    newInteraction = _a.sent();
                    resolve(newInteraction);
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
var MenuPage = /** @class */ (function () {
    function MenuPage() {
        this.id = "";
        this.embeds = [];
        this.content = "";
        this.buttons = [];
    }
    MenuPage.prototype.setId = function (id) {
        this.id = id;
        return this;
    };
    MenuPage.prototype.addEmbed = function (embed) {
        this.embeds.push(embed);
        return this;
    };
    MenuPage.prototype.setContent = function (content) {
        this.content = content;
        return this;
    };
    MenuPage.prototype.addButton = function (button) {
        this.buttons.push(button);
        return this;
    };
    return MenuPage;
}());
module.exports = { MenuPage: MenuPage, MenuButton: MenuButton, Menu: Menu };
