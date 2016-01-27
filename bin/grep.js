'use strict';
/// <reference path="typings/tds.d.ts"/>
var os = require("os");
var chalk = require("chalk");
/** @todo or \n */
var NEWLINE_CHAR = os.EOL;
var REGEXP_LIKE = /^\/(.+)\/((g|m|i)*)$/i;
;
/** helps */
/**
 * Проверка похожа ли строка на регулярное выражение
 * @param  {string}  str
 *
 * @return {boolean}
 */
function lookLikeRegexp(str) {
    return REGEXP_LIKE.test(str);
}
/**
 * Разбор строки на регулярное выражение
 * @param  {string}       str
 *
 * @return {RegExp}
 */
function parseRegexp(str) {
    if (!lookLikeRegexp(str)) {
        throw new Error("The string doesn't look like a RegExp");
    }
    var matches = str.match(REGEXP_LIKE);
    var pattern = matches[1] ? matches[1] : "";
    var flags = matches[2] ? matches[2] : "";
    return new RegExp(pattern, flags);
}
;
/**
 * Grep string
 * @param  {string}           data                   - input string
 * @param  {string}           pattern                - search pattern
 * @param  {string[]|boolean} [highlight=false]      - highlight results
 *
 * @return {string}                                  - output string
 */
function grep(data, pattern, highlight) {
    if (highlight === void 0) { highlight = false; }
    /** Нет патерна */
    if (pattern === "") {
        return data;
    }
    ;
    var regexp;
    if (lookLikeRegexp(pattern)) {
        regexp = parseRegexp(pattern);
    }
    else {
        regexp = new RegExp(pattern, "g");
    }
    var lines = data.split(NEWLINE_CHAR);
    /** Собираем валидные строки */
    var validLines = [];
    for (var i = 0, len = lines.length; i < len; i++) {
        var line = lines[i];
        if (regexp.test(line)) {
            validLines.push({
                str: line
            });
        }
    }
    /** Подсветка найденых объектов */
    if (highlight && highlight.length) {
        var highlighter = highlight.reduce(function (res, item) {
            return res[item];
        }, chalk);
        validLines = validLines.map(function (line) {
            line.str = line.str.replace(regexp, function (str) {
                return highlighter(str);
            });
            return line;
        });
    }
    var outData = validLines.map(function (line) { return line.str; })
        .join(NEWLINE_CHAR);
    return outData;
}
;
module.exports = grep;
