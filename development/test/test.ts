'use strict';
/// <reference path="typings/tds.d.ts"/>

import assert = require("assert");

import * as g from "../grep";

const NOT_REGEXP_ERROR = new Error("The string doesn't look like a RegExp");

describe("lookLikeRegexp(str)", () => {
    it("should returns valid results", function() {
        assert.equal(g.lookLikeRegexp("/a/"), true);
        assert.equal(g.lookLikeRegexp("/[a-z]/"), true);
        assert.equal(g.lookLikeRegexp("/^\/(.+)\/((g|m|i)*)$/i"), true);

        assert.equal(g.lookLikeRegexp("/a"), false);
        assert.equal(g.lookLikeRegexp("[a-z]/"), false);
        assert.equal(g.lookLikeRegexp("test"), false);
    });
});

describe("parseRegexp(str)", () => {
    it("should returns valid RegExp", function() {
        assert.deepEqual(g.parseRegexp("/a/"), /a/);
        assert.deepEqual(g.parseRegexp("/[a-z]/"), /[a-z]/);
        assert.deepEqual(g.parseRegexp("/^\\/(.+)\\/((g|m|i)*)$/i")
            , /^\/(.+)\/((g|m|i)*)$/i);
    });

    it("shoild throw error when pattern not a RegExp like", function() {
        assert.throws(() => { 
            // throw new Error("www");
            g.parseRegexp("/a");
        }, (err) => {
            if (err.message == NOT_REGEXP_ERROR.message) {
                return true;
            }
        });
        assert.throws(() => {
            g.parseRegexp("[a-z]/");
        }, (err) => {
            if (err.message == NOT_REGEXP_ERROR.message) {
                return true;
            }
        });
        assert.throws(() => {
            g.parseRegexp("test");
        }, (err) => {
            if (err.message == NOT_REGEXP_ERROR.message) {
                return true;
            }
        });
    });
});

describe("parseRegexp(str, flags)", () => {
    it("should returns valid RegExp", function() {
        assert.deepEqual(g.parseRegexp("/a/", "g"), /a/g);
        assert.deepEqual(g.parseRegexp("/[a-z]/", "gi"), /[a-z]/gi);
        assert.deepEqual(g.parseRegexp("/^\\/(.+)\\/((g|m|i)*)$/i", "g")
            , /^\/(.+)\/((g|m|i)*)$/g);

        assert.deepEqual(g.parseRegexp(""+(/a/), "g"), /a/g);
        assert.deepEqual(g.parseRegexp(""+(/[a-z]/), "gi"), /[a-z]/gi);
        assert.deepEqual(g.parseRegexp(""+(/^(.+)((g|m|i)*)$/i), "g")
            , /^(.+)((g|m|i)*)$/g);
    });
});

describe("grep(data, pattern)", () => {
    it("should searching plain-text", function() {
        const pattern = 'apple';
        const inData =
            'apple\n'
            + 'apples\n'
            + 'pineapple\n'
            + 'apple -\n'
            + 'apple - fruit\n'
            + 'fruit - apple\n'
            + 'banana\n'
            + 'pear\n'
            + 'peach\n'
            + 'orange'
            ;
        const expectedOutData =
            'apple\n'
            + 'apples\n'
            + 'pineapple\n'
            + 'apple -\n'
            + 'apple - fruit\n'
            + 'fruit - apple'
            ;

        assert.equal(g.default(inData, pattern), expectedOutData);
    });

    it("should searching RegExp", function() {
        const pattern = '/^(a|p)/';
        const inData =
            'apple\n'
            + 'apples\n'
            + 'pineapple\n'
            + 'apple -\n'
            + 'apple - fruit\n'
            + 'fruit - apple\n'
            + 'banana\n'
            + 'pear\n'
            + 'peach\n'
            + 'orange'
            ;
        const expectedOutData =
            'apple\n'
            + 'apples\n'
            + 'pineapple\n'
            + 'apple -\n'
            + 'apple - fruit\n'
            + 'pear\n'
            + 'peach'
            ;

        assert.equal(g.default(inData, pattern), expectedOutData);
    });
});
