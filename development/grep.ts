'use strict';
/// <reference path="typings/tds.d.ts"/>

import os = require("os");

import chalk = require("chalk");

/** @todo or \n */
const NEWLINE_CHAR = os.EOL;
const REGEXP_LIKE = /^\/(.+)\/((g|m|i)*)$/i;


interface ParsedRegexp {
    pattern: string,
    flags: string
};

/** helps */
/**
 * Проверка похожа ли строка на регулярное выражение
 * @param  {string}  str
 * 
 * @return {boolean}
 */
function lookLikeRegexp(str: string): boolean {
    return REGEXP_LIKE.test(str);
}

/**
 * Разбор строки на регулярное выражение
 * @param  {string}       str
 * 
 * @return {RegExp}
 */
function parseRegexp(str: string): RegExp {
    if (!lookLikeRegexp(str)) {
        throw new Error("The string doesn't look like a RegExp");
    }

    const matches = str.match(REGEXP_LIKE);

    const pattern = matches[1] ? matches[1] : "";
    const flags = matches[2] ? matches[2] : "";

    return new RegExp(pattern, flags);
};

/**
 * Grep string
 * @param  {string}           data                   - input string
 * @param  {string}           pattern                - search pattern
 * @param  {string[]|boolean} [highlight=false]      - highlight results
 * 
 * @return {string}                                  - output string
 */
function grep(data: string, pattern: string, highlight: any = false): string {
    /** Нет патерна */
    if (pattern === "") { return data };

    let regexp;
    if (lookLikeRegexp(pattern)) {
        regexp = parseRegexp(pattern);
    } else {
        regexp = new RegExp(pattern, "g");
    }

    const lines = data.split(NEWLINE_CHAR);

    /** Собираем валидные строки */
    let validLines = [];
    for (let i = 0, len = lines.length; i < len; i++) {
        let line = lines[i];

        if (regexp.test(line)) {
            validLines.push({
                str: line
            });
        }
    }

    /** Подсветка найденых объектов */
    if (highlight && highlight.length) {
        const highlighter = highlight.reduce((res, item) => {
            return res[item];
        }, chalk);

        validLines = validLines.map((line) => {
            line.str = line.str.replace(regexp, (str) => {
                return highlighter(str);
            });

            return line;
        });
    }

    const outData = validLines.map(line => line.str)
        .join(NEWLINE_CHAR);

    return outData;
};

export = grep;
