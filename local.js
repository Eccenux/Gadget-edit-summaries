/* global mw */
/**
 * Lokalne przyciski opisu zmian.
 * 
 * loader: [[MediaWiki:Gadget-edit-summaries.js]]
 *   core: [[MediaWiki:Gadget-edit-summaries-core.js]]
 */
// Uwaga! Do własnych przycisków używaj:
// mw.hook('userjs.przyciskiOpis.gotowe').add(...)
// składania jest taka sama, ale `_baza` jest tylko dla bazowych przycisków
mw.hook('userjs.przyciskiOpis._baza').add(function (przyciski, opisBtns, isVe) {
	/*
	// konwersja: stare na nowe
	przyciskiDodaj\(opisBtns, '([^']+)', 'dodajOpis\("\1"\)', kl,\s*[\r\n]+\s*'([^']+)'
	przyciski.zmiana({tekst:'$1',\n\t\tdlugie:'$2'}

	przyciskiDodaj\(opisBtns, '([^']+)', 'dodajOpis\("([^"]+)"\)', kl,\s*[\r\n]+\s*'([^']+)'
	przyciski.zmiana({tekst:'$1', zmiana:'$2',\n\t\tdlugie:'$3'}
	*/

	// drobne różne
	przyciski.zmiana({tekst:'ort.',
		dlugie:'Poprawiono błąd ortograficzny'});
	przyciski.zmiana({tekst:'lit.',
		dlugie:'Poprawiono literówkę'});
	przyciski.zmiana({tekst:'int.',
		dlugie:'Poprawiono interpunkcję'});
	przyciski.zmiana({tekst:'jęz.',
		dlugie:'Poprawiono błędy językowe'});
	przyciski.zmiana({tekst:'akt.', zmiana:'aktualizacja',
		dlugie:'Zaktualizowano'});

	// opisBtns.appendChild(document.createTextNode(' ')); // odstęp

	// drobne około wikizacyjne
	przyciski.zmiana({tekst:'linki-zew', zmiana:'linki zewnętrzne',
		dlugie:'Poprawiono/dodano linki zewnętrzne'});
	przyciski.zmiana({tekst:'linki-popr', zmiana:'poprawa linków',
		dlugie:'Poprawiono linki zewnętrzne/wewnętrzne'});
	przyciski.zmiana({tekst:'kat.',
		dlugie:'Poprawiono/dodano kategorię'});
	przyciski.zmiana({tekst:'wikizacja', zmiana:'[[Pomoc:Słowniczek#W|wikizacja]]',
		dlugie:'Wikizacja artykułu (dodanie linków wewnętrznych, podział na sekcje itp.)'});
	przyciski.zmiana({tekst:'przypisy', zmiana:'źródła/przypisy',
		dlugie:'Dodanie/poprawienie przypisów lub źródeł'});

	opisBtns.appendChild(document.createTextNode(' ')); // odstęp

	// drobne około techniczne
	przyciski.zmiana({tekst:'ujedn.', zmiana:'ujednoznacznienie',
		dlugie:'Poprawiono/dodano stronę ujednoznaczniającą'});
	przyciski.zmiana({tekst:'ilustr.', zmiana:'ilustracja',
		dlugie:'Poprawiono/dodano ilustrację'});
	przyciski.zmiana({tekst:'szablon',
		dlugie:'Poprawiono/dodano szablon'});
	przyciski.zmiana({tekst:'infobox',
		dlugie:'Poprawiono/uzupełniono/dodano infobox'});

	if(isVe !== true)
		opisBtns.appendChild(document.createElement('br'));

	// drobne inne
	przyciski.zmiana({tekst:'dr. meryt.', zmiana:'drobne merytoryczne',
		dlugie:'Drobne zmiany merytoryczne'});
	przyciski.zmiana({tekst:'dr. red.', zmiana:'drobne redakcyjne',
		dlugie:'Drobne zmiany redakcyjne'});
	przyciski.zmiana({tekst:'dr. tech.', zmiana:'drobne techniczne',
		dlugie:'Drobne zmiany techniczne'});

	opisBtns.appendChild(document.createTextNode(' ')); // odstęp

	// do użytkownika i około administracyjne
	przyciski.zmiana({tekst:'test',
		dlugie:'Dodano ostrzeżenie dla użytkownika'});

	przyciski.zmiana({tekst:'npa', zmiana:'[[WP:NPA|NPA]]',
		dlugie:'Zgłoszono artykuł jako podejrzany o naruszenie praw autorskich'});
	przyciski.zmiana({tekst:'wer', zmiana:'[[WP:WER|Potrzebne źródło]]',
		dlugie:'Potrzebne wiarygodne źródło'});
	przyciski.zmiana({tekst:'dnu', zmiana:'[[Wikipedia:Poczekalnia|Poczekalnia DNU]]',
		dlugie:'Zgłoszono artykuł do usunięcia'});
	przyciski.zmiana({tekst:'ek', zmiana:'[[:Kategoria:Ekspresowe kasowanie|ek]]',
		dlugie:'Zgłoszono artykuł do ekspresowego (s)kasowania'});
	przyciski.zmiana({tekst:'rew.', zmiana:'przywrócenie poprzedniej wersji',
		dlugie:'przywrócenie poprzedniej wersji'});

	opisBtns.appendChild(document.createTextNode(' ')); // odstęp

	// insze do dyskusji i głosowań
	przyciski.zmiana({tekst:'głos',
		dlugie:'Oddano głos'});
	przyciski.zmiana({tekst:'komentarz',
		dlugie:'Dodano komentarz w dyskusji lub do głosu'});

	przyciski.zmiana({tekst:'pytanie',
		dlugie:'Zadano pytanie w dyskusji'});
	przyciski.zmiana({tekst:'odp.', zmiana:'odpowiedź',
		dlugie:'Dodano odpowiedź w dyskusji'});
	przyciski.zmiana({tekst:'spr.', zmiana:'sprawdzone',
		dlugie:'Sprawdzono artykuł'});

	// odstęp przed własnymi
	opisBtns.appendChild(document.createTextNode(' ')); // odstęp
	
	// czasowe, dla nie-świeżynek
	if (mw.config.get('wgUserGroups').includes('autoconfirmed')){
		const dt = new Date();
		// grudzień
		if (dt.getMonth()+1 == 12) {
			let year = dt.getFullYear();
			let yy = year.toString().substr(-2);
			przyciski.zmiana({tekst:`św'${yy}`, zmiana:`#ŚwiątecznaAkcjaEdycyjna${year}`,
				dlugie:`Świąteczna Akcja ${year}`});
		}
	}
});
