/* global ve, mw, jQuery */
/* eslint-disable indent */

/**
Automatyczne opisy zmian

Autor pierwotny (Author): [[:pl:User:Adziura|Adam Dziura]]

Poprawki i zmiany (Contributors):
* [[:pl:User:Nux|Maciej Jaros]]
* [[:pl:User:Beau]]
* [[:pl:User:Matma Rex]]
* [[:pl:User:Holek]]
* [[:pl:User:Maire]]
* [[:pl:User:Msz2001]]

**/
(function($) {

var isVe = false;
var opisBtns = null;

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
		var realInitialize = ve.ui.MWSaveDialog.prototype.initialize;
		ve.ui.MWSaveDialog.prototype.initialize = function () {
			realInitialize.call( this );
			this.editSummaryInput.$element.after( opisBtns );
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
	addBtns();

	mw.hook('userjs.przyciskiOpis.gotowe').fire(przyciski, opisBtns);
}

function addBtns() {
	var kl = '';	// klasa jest niepotrzebna (wszystkie <a> w #userSummaryButtons ustawione poprzez CSS)
	if (opisBtns)
	{
		// drobne różne
		przyciskiDodaj(opisBtns, 'ort.', 'dodajOpis("ort.")', kl,
			'Poprawiono błąd ortograficzny');
		przyciskiDodaj(opisBtns, 'lit.', 'dodajOpis("lit.")', kl,
			'Poprawiono literówkę');
		przyciskiDodaj(opisBtns, 'int.', 'dodajOpis("int.")', kl,
			'Poprawiono interpunkcję');
		przyciskiDodaj(opisBtns, 'jęz.', 'dodajOpis("jęz.")', kl,
			'Poprawiono błędy językowe');
		przyciskiDodaj(opisBtns, 'akt.', 'dodajOpis("aktualizacja")', kl,
			'Zaktualizowano');

		// opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około wikizacyjne
		przyciskiDodaj(opisBtns, 'linki-zew', 'dodajOpis("linki zewnętrzne")', kl,
			'Poprawiono/dodano linki zewnętrzne');
		przyciskiDodaj(opisBtns, 'linki-popr', 'dodajOpis("poprawa linków")', kl,
			'Poprawiono linki zewnętrzne/wewnętrzne');
		przyciskiDodaj(opisBtns, 'kat.', 'dodajOpis("kat.")', kl,
			'Poprawiono/dodano kategorię');
		przyciskiDodaj(opisBtns, 'wikizacja', 'dodajOpis("[[Pomoc:Słowniczek#W|wikizacja]]")', kl,
			'Wikizacja artykułu (dodanie linków wewnętrznych, podział na sekcje itp.)');
		przyciskiDodaj(opisBtns, 'przypisy', 'dodajOpis("źródła/przypisy")', kl,
			'Dodanie/poprawienie przypisów lub źródeł');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// drobne około techniczne
		przyciskiDodaj(opisBtns, 'ujedn.', 'dodajOpis("ujednoznacznienie")', kl,
			'Poprawiono/dodano stronę ujednoznaczniającą');
		przyciskiDodaj(opisBtns, 'ilustr.', 'dodajOpis("ilustracja")', kl,
			'Poprawiono/dodano ilustrację');
		przyciskiDodaj(opisBtns, 'szablon', 'dodajOpis("szablon")', kl,
			'Poprawiono/dodano szablon');
		przyciskiDodaj(opisBtns, 'infobox', 'dodajOpis("infobox")', kl,
			'Poprawiono/uzupełniono/dodano infobox');

		if(isVe !== true)
			opisBtns.appendChild(document.createElement('br'));

		// drobne inne
		przyciskiDodaj(opisBtns, 'dr. meryt.', 'dodajOpis("drobne merytoryczne")', kl,
			'Drobne zmiany merytoryczne');
		przyciskiDodaj(opisBtns, 'dr. red.', 'dodajOpis("drobne redakcyjne")', kl,
			'Drobne zmiany redakcyjne');
		przyciskiDodaj(opisBtns, 'dr. tech.', 'dodajOpis("drobne techniczne")', kl,
			'Drobne zmiany techniczne');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// do użytkownika i około administracyjne
		przyciskiDodaj(opisBtns, 'test', 'dodajOpis("test")', kl,
			'Dodano ostrzeżenie dla użytkownika');

		przyciskiDodaj(opisBtns, 'npa', 'dodajOpis("[[WP:NPA|NPA]]")', kl,
			'Zgłoszono artykuł jako podejrzany o naruszenie praw autorskich');
		przyciskiDodaj(opisBtns, 'wer', 'dodajOpis("[[WP:WER|Potrzebne źródło]]")', kl,
			'Potrzebne wiarygodne źródło');
		przyciskiDodaj(opisBtns, 'dnu', 'dodajOpis("[[Wikipedia:Poczekalnia|Poczekalnia DNU]]")', kl,
			'Zgłoszono artykuł do usunięcia');
		przyciskiDodaj(opisBtns, 'ek', 'dodajOpis("[[:Kategoria:Ekspresowe kasowanie|ek]]")', kl,
			'Zgłoszono artykuł do ekspresowego (s)kasowania');
		przyciskiDodaj(opisBtns, 'rew.', 'dodajOpis("przywrócenie poprzedniej wersji")', kl,
			'przywrócenie poprzedniej wersji');

		opisBtns.appendChild(document.createTextNode(' ')); // odstęp

		// insze do dyskusji i głosowań
		przyciskiDodaj(opisBtns, 'głos', 'dodajOpis("głos")', kl,
			'Oddano głos');
		przyciskiDodaj(opisBtns, 'komentarz', 'dodajOpis("komentarz")', kl,
			'Dodano komentarz w dyskusji lub do głosu');

		przyciskiDodaj(opisBtns, 'pytanie', 'dodajOpis("pytanie")', kl,
			'Zadano pytanie w dyskusji');
		przyciskiDodaj(opisBtns, 'odp.', 'dodajOpis("odpowiedź")', kl,
			'Dodano odpowiedź w dyskusji');
		przyciskiDodaj(opisBtns, 'spr.', 'dodajOpis("sprawdzone")', kl,
			'Sprawdzono artykuł');

		// odstęp przed własnymi
		opisBtns.appendChild(document.createTextNode(' ')); // odstęp
		
		// czasowe, dla nie-świeżynek
		if (mw.config.get('wgUserGroups').includes('autoconfirmed')){
			const dt = new Date();
			// grudzień
			if (dt.getMonth()+1 == 12) {
				let year = dt.getFullYear();
				let yy = year.toString().substr(-2);
				przyciskiDodaj(opisBtns, `św'${yy}`, `dodajOpis("#ŚwiątecznaAkcjaEdycyjna${year}")`, kl,
					`Świąteczna Akcja ${year}`);
			}
		}
		
	}
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
	var wpS = (isVe) ? $( '.ve-ui-mwSaveDialog-summary textarea' )[0] : wpS = document.editform.wpSummary;
	
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
		jQuery(document).ready(initBtns);
	}
}

// broken on mobile, desktop only
if (mw.config.get('skin') !== 'minerva') {
mw.loader.using( 'ext.visualEditor.desktopArticleTarget.init' ).done( function () {
	mw.libs.ve.addPlugin( function () {
		return mw.loader.using( 'ext.visualEditor.mwcore' )
			.done( function () {
				initBtns(true);
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
