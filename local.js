/**
 * Lokalne przyciski opisu zmian.
 * 
 * loader: [[MediaWiki:Gadget-edit-summaries.js]]
 *   core: [[MediaWiki:Gadget-edit-summaries-core.js]]
 */
mw.hook('userjs.przyciskiOpis.gotowe').add(function (przyciski, opisBtns) {
	// przyciski.zmiana({tekst:'tł.', zmiana:'tłumaczenie', dlugie:'Tłumaczenie'});
	// przyciski.zmiana({tekst:'#Św2024', zmiana:'#ŚwiątecznaAkcjaEdycyjna2024', dlugie:'Zmiana w ramach akcji Święta2024'});
});
