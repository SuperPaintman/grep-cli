'use strict';
/// <reference path="typings/tds.d.ts"/>

// import os = require("os");

import chalk = require("chalk");

/** @todo \n of os.EOL*/
const NEWLINE_CHAR = "\n";
const REGEXP_LIKE = /^\/(.+)\/((g|m|i)*)$/i;

/** helps */
/**
 * Проверка похожа ли строка на регулярное выражение
 * @param  {string}  str
 * 
 * @return {boolean}
 */
export function lookLikeRegexp(str: string): boolean {
    return REGEXP_LIKE.test(str);
}

/**
 * Разбор строки на регулярное выражение
 * @param  {string}       str
 * @param  {string}       flags
 * 
 * @return {RegExp}
 */
export function parseRegexp(str: string, flags?: string): RegExp {
    if (!lookLikeRegexp(str)) {
        throw new Error("The string doesn't look like a RegExp");
    }

    const matches = str.match(REGEXP_LIKE);

    let curPattern = matches[1] ? matches[1] : "";
    let curFlags;
    if (flags) {
        curFlags = flags;
    } else {
        curFlags = matches[2] ? matches[2] : "";
    }

    return new RegExp(curPattern, curFlags);
};

/**
 * Grep string
 * @param  {string}           data               - input string
 * @param  {string}           pattern            - search pattern
 * @param  {string[]|boolean} [highlight=false]  - highlight options for `chalk`
 * 
 * @return {string}                              - output string
 */
export default function grep(data: string, pattern: string, highlight: any = false): string {
    /** Нет паттерна */
    if (pattern === "") { return data };

    let regexp;
    if (lookLikeRegexp(pattern)) {
        regexp = parseRegexp(pattern);
    } else {
        regexp = new RegExp(pattern);
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
            let replaceRegexp = parseRegexp(""+regexp, 'g');
            line.str = line.str.replace(replaceRegexp, (str) => {
                return highlighter(str);
            });

            return line;
        });
    }

    const outData = validLines.map(line => line.str)
        .join(NEWLINE_CHAR);

    return outData;
};
