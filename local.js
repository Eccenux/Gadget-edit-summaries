/**
 * Lokalne przyciski opisu zmian.
 * 
 * loader: [[MediaWiki:Gadget-edit-summaries.js]]
 *   core: [[MediaWiki:Gadget-edit-summaries-core.js]]
 */
mw.hook('userjs.przyciskiOpis.gotowe').add(function (przyciski, opisBtns) {
	// przyciski.zmiana({tekst:'tł.', zmiana:'tłumaczenie', dlugie:'Tłumaczenie'});
	// przyciski.zmiana({tekst:'#Św2024', zmiana:'#ŚwiątecznaAkcjaEdycyjna2024', dlugie:'Zmiana w ramach akcji Święta2024'});
	var kl = '';	// klasa jest niepotrzebna (wszystkie <a> w #userSummaryButtons ustawione poprzez CSS)

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
});
