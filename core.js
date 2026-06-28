/* global ve, jQuery */
/* eslint-disable indent */

/**
Automatyczne opisy zmian.

Definicje lokalnych przycisków:
[[MediaWiki:Gadget-edit-summaries-local.js]]

Autor pierwotny (Author):
[[:pl:User:Adziura|Adam Dziura]]

Poprawki i zmiany (Contributors):
* [[:pl:User:Nux|Maciej Jaros]]
* [[:pl:User:Beau]]
* [[:pl:User:Matma Rex]]
* [[:pl:User:Holek]]
* [[:pl:User:Maire]]
* [[:pl:User:Msz2001]]

<nowiki>
**/
(function($) {

let isVe = false;
let opisBtns = null;

/** Funkcje pomocnicze do dodawania przycisków. */
var przyciski = {
	/**
	 * Uproszczona forma przyciskiDodaj.
	 * 
	 * @example Przykład własnego opisu zmian (tekst przycisku i opis zmian te same):
	 * <pre>
		przyciski.zmiana({tekst:'archiwizacja'})
	* </pre>
	* 
	* @example Przykład krótkiego opisu (porównanie starego i nowego formatu):
	* <pre>
		przyciskiDodaj(opisBtns, 'int.', 'dodajOpis("int.")', kl, 'Poprawiono interpunkcję');
		przyciski.zmiana({tekst:'int.', dlugie:'Poprawiono interpunkcję'})
	* </pre>
	* 
	* @example Pełne, typowe wywołanie:
	* <pre>
		przyciskiDodaj(opisBtns, 'linki-zew', 'dodajOpis("linki zewnętrzne")', kl, 'Poprawiono/dodano linki zewnętrzne');
		przyciski.zmiana({tekst:'linki-zew', zmiana:'linki zewnętrzne', dlugie:'Poprawiono/dodano linki zewnętrzne'})
	* <pre>
	* 
	* @param {Object} opcje Opcje.
	*/
	zmiana: function(opcje)
	{
		var defaults = {
			tekst: '',
			zmiana: '',
			dlugie: '',
			klasa: '',
		};
		var params = $.extend({}, defaults, opcje);
		if (params.zmiana.length < 1) {
			params.zmiana = params.tekst;
		}
		if (params.dlugie.length < 1) {
			params.dlugie = params.tekst;
		}
		var pAkcja = function () {
			dodajOpis(params.zmiana);
		};

		przyciskiDodaj(opisBtns, params.tekst, pAkcja, params.klasa, params.dlugie);
	}
};

/**
 * Inicjowanie przycisków.
 * 
 * @param {Boolean} useVe Jeśli prawda to przyjmujemy, że używany jest VE.
 */
function initBtns(useVe)
{
	opisBtns = document.createElement('span');
	opisBtns.id = 'userSummaryButtons';

	// export
	// zgodność z [[Wikipedysta:Skalee/dodatkowe przyciski opisu edycji.js]]
	window.przyciskiOpisBtns = opisBtns;

	if(useVe === true) {
		opisBtns.style.cssText = 'border: solid 1px #ccc; border-top: none; border-bottom: 0; display: block; overflow: hidden; z-index: 1; padding: 0.25em 0.5em;';
		isVe = true;
		// evil…
		let realInitialize = ve.ui.MWSaveDialog.prototype.initialize;
		if (typeof realInitialize !== 'function') {
			console.error('[edit-summaries]', 'MWSaveDialog init hook failed');
			return;
		}
		// console.debug('[edit-summaries]', 'MWSaveDialog init function:', realInitialize);
		ve.ui.MWSaveDialog.prototype.initialize = function () {
			realInitialize.call( this );
			this.editSummaryInput.$element.after( opisBtns );
			// console.debug('[edit-summaries]', 'editSummaryInput', this.editSummaryInput);
		};
	} else {
		var el_label = document.getElementById('wpSummaryLabel');
		if (!el_label) {
			return; // Nie ma pola na opis, przyciski nie mają sensu
		}
		
		// Na stronach "Dodaj nowy temat" `wpSummary` to pole na określenie nagłówka sekcji
		// Wtedy szybkie opisy nie mają sensu
		var section_input = document.getElementsByName('wpSection')[0]
		if (section_input && section_input.value == 'new') {
			return;
		}

		//
		// dodanie elementu okalającego przyciski bezpośrednio za opisem zmian
		// Wstawiamy po 'wpSummaryWidget' dla wersji z OOUI, po 'wpSummary' dla wersji bez
		var el_summary_wrapper;
		el_summary_wrapper = document.getElementById('wpSummaryWidget');
		if (!el_summary_wrapper) el_summary_wrapper = document.getElementById('wpSummary');
		$(el_summary_wrapper).after(opisBtns);
	}

	//
	// dodanie przycisku specjalnego - do rozwijania skrótów
	var btn = przyciskiDodaj(opisBtns, '+rozwiń skróty', rozwinSkrotyOpisowZm, '',
		'Rozwiń skróty opisów zmian');
	//btn.style.cssText = 'position:absolute; top:0; right:0;';
	btn.style.cssText = 'float:right;border-color:#dd0;background-color:#dea';
	btn.id = 'btn_opisy_zm_waxon_off';
	btn.wax_on = false;

	//
	// dodawanie przycisków
	mw.hook('userjs.przyciskiOpis._baza').fire(przyciski, opisBtns, isVe);	// private, avoid using this
	mw.hook('userjs.przyciskiOpis.gotowe').fire(przyciski, opisBtns, isVe);	// custom buttons book
}

/**
 * Dodaj przycisk zmian.
 * 
 * @param {Element} elUserBtns Element okalający, do którego dodać przycisk (zwykle: opisBtns).
 * @param {String} pTekst Tekst w środku przycisku.
 * @param {String|Function} pAkcja Akcja jaką wykonać przy naciśnięciu; może być ciągiem poleceń.
 * @param {String} pKlasa Dodatkowa klasa przycisku jeśli konieczna.
 * @param {String} pOpis Dłuższy/rozwinięty opis akcji.
 * @returns {Element} Zwraca dodany element.
 */
function przyciskiDodaj(elUserBtns, pTekst, pAkcja, pKlasa, pOpis)
{
	var nowyBtn = document.createElement('a');

	// atrybuty
	nowyBtn.appendChild(document.createTextNode(pTekst));
	nowyBtn.title = pOpis;
	if (pKlasa !== '') {
		nowyBtn.className = pKlasa;
	}
	nowyBtn.onclick = (typeof pAkcja === 'function') ? pAkcja : new Function(pAkcja);

	// dodanie przycisku
	elUserBtns.appendChild(nowyBtn);

	return nowyBtn;
}

/**
 * Funkcja do dodania opisu zmian.
 * 
 * @param {String} opis Opis zmian.
 */
function dodajOpis(opis)
{
	let wpS = null;
	if (isVe) wpS = document.querySelector('.ve-ui-mwSaveDialog-summary textarea');
	if (!wpS) wpS = document.getElementById('wpSummary');
	
	if (wpS.value.indexOf(opis) == -1)
	{
		if (wpS.value !== '' && wpS.value.charAt(wpS.value.length-2) != '/')
		{
			wpS.value += ', ' + opis;
		}
		else
		{
			wpS.value += opis;
		}
		$(wpS).trigger('change');
	}
}

var editActions = [
	"edit", "submit", "parsermigration-edit"
];
if (editActions.indexOf(mw.config.get('wgAction')) >= 0)
{
	if (mw.config.get('wgNamespaceNumber') > -1)
	{
		$(()=>{initBtns()});
	}
}

// broken on mobile, desktop only
if (mw.config.get('skin') !== 'minerva') {
	let initVeDone = false;
	// old way:
	// mw.loader.using( 'ext.visualEditor.desktopArticleTarget.init' ).done( function () {
		// mw.libs.ve.addPlugin( function () {

	// VE docs: https://www.mediawiki.org/wiki/VisualEditor/Gadgets/Add_a_tool#Create_and_register_tool
	mw.hook( 've.loadModules' ).add( function( addPlugin ) {
		if (initVeDone) return;
		// console.debug('[edit-summaries]', 've.loadModules; addPlugin', addPlugin);
		addPlugin( function () {
			return mw.loader.using( 'ext.visualEditor.mwcore' )
				.done( function () {
					if (initVeDone) return;
					// console.debug('[edit-summaries]', 'ext.visualEditor.mwcore');
					initBtns(true);
					initVeDone = true;
				} );
		} );
	} );
}

//
// rozwiajanie skrótów do pełnych opisów i z powrotem
function rozwinSkrotyOpisowZm()
{
	var els = opisBtns.getElementsByTagName('a');
	for (var i=0; i<els.length; i++)
	{
		var tit = els[i].title;
		els[i].title = els[i].innerHTML;
		els[i].innerHTML = tit;
	}
	var btn = document.getElementById('btn_opisy_zm_waxon_off');
	btn.innerHTML = (btn.wax_on === false) ? '&nbsp; -zwiń skróty' : '+rozwiń skróty';
	btn.wax_on = !btn.wax_on;
}

// ~export
window.przyciskiDodaj = przyciskiDodaj;
window.dodajOpis = dodajOpis;

})(jQuery);
// </nowiki>