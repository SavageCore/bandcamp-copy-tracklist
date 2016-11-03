// ==UserScript==
// @name         Bandcamp copy tracklist to clipboard
// @namespace    https://savagecore.eu
// @version      0.0.3
// @description  Userscript to copy bandcamp tracklist to clipboard
// @author       SavageCore
// @match        https://*.bandcamp.com/album/*
// @grant        GM_setClipboard
// @downloadURL  https://github.com/SavageCore/bandcamp-copy-tracklist/raw/master/src/bandcamp-copy-tracklist.user.js
// ==/UserScript==

/*	global document	*/
/* global GM_setClipboard */

(function () {
	'use strict';
	var table = document.getElementById('track_table');

	table.insertAdjacentHTML('afterend', '<p id="scCopyToClipboard" style="color:#0687F5;cursor:pointer">Copy tracklist</p>');

	var rowLength = table.rows.length;
	var lines = '';

	for (var i = 0; i < rowLength; i += 1) {
		var row = table.rows[i];
		var title = row.querySelectorAll('td.title-col > div > a > span');
		var duration = row.querySelectorAll('td.title-col > div > span.time');

		lines += `${i + 1}. ${title[0].innerText} ${duration[0].innerText}\n`;
	}

	var link = document.getElementById('scCopyToClipboard');

	link.onmouseover = function () {
		link.style['text-decoration'] = 'underline';
	};

	link.onmouseout = function () {
		link.style['text-decoration'] = 'none';
	};

	link.addEventListener('click', function () {
		GM_setClipboard(lines, 'text'); // eslint-disable-line new-cap
		var originalText = link.innerText;
		link.innerText = 'Copied!';
		setTimeout(function () {
			link.innerText = originalText;
		}, 2000);
	}, false);
})();
