// Constantes
const LIGNES = 4;
const COLONNES = 4;

// Variables globales
let _grilleJeu2D = [
    [],
    [],
    [],
    []
];
let _cartesChoisies = [];
let _cartesTrouvees = [];
let _sourceImg = ["/Images/carte_dos3.png", "/Images/boussole.png", "/Images/cadran.png", "/Images/casque-ecoute.png", "/Images/chapeau.png",
    "/Images/chat.png", "/Images/lampe.png", "/Images/loupe.png", "/Images/parapluie.png"];
let _tableValeurs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

let _commence = false;
let _coups = 0;
let _erreurs = 0;
let _gagnant = false;
let _recordCoups = 0;
let _recordTemps = 0;
let _temps;
let _tempsMinutes;
let _tempsSecondes;


//-----------------------------------------------------------
// Auteur: Mathieu Duval et Claudel D. Roy                  |
// Description: Remplit la grille de jeu avec les valeurs   |
//              aléatoires.                                 |
// Date: 2022-04-11                                         |
//-----------------------------------------------------------
function RemplirGrilleJeu() {

    for (var iLigne = 0; iLigne < LIGNES; iLigne++) {
        for (var iColonne = 0; iColonne < COLONNES; iColonne++) {

            let indexRandom = ChoisirHasard(0, _tableValeurs.length - 1);
            _grilleJeu2D[iLigne][iColonne] = _tableValeurs[indexRandom];

            _tableValeurs.splice(indexRandom, 1);
        }
    }
}

//-----------------------------------------------------------
// Auteur: Mathieu Duval et Claudel D. Roy                  |
// Description: Tirer au hasard un chiffre entre min et max |
//              inclusivement.                              |
// Date: 2022-04-11                                         |
//-----------------------------------------------------------
function ChoisirHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//-----------------------------------------------------------
// Auteur: Mathieu Duval et Claudel D. Roy                  |
// Description: Permet de vérifier si les deux cartes       |
//              sont de la même valeur.                     |
// Date: 2022-04-11                                         |
//-----------------------------------------------------------
function verifierMatch() {

    if (_cartesChoisies[1] == _cartesChoisies[3]) {

        return true;
    }
    else {
        return false;
    }
}

//-----------------------------------------------------------
// Auteur: Mathieu Duval et Claudel D. Roy                  |
// Description: Permet de déclencher ou interrompre le      |
//              comptage de secondes.                       |
// Date: 2022-04-11                                         |
//-----------------------------------------------------------
function commencerPartie() {
    // Variables locales
    let text_bouton = document.getElementById("Commencer");

    // Partir le décompte ou l'arrêter dépendant si le compteur est actif ou non
    // Changer le texte du bouton dépendant du dernier état.
    if (!_commence) {

        text_bouton.innerHTML = "Recommencer";
        _commence = true;
    }

}


//-----------------------------------------------------------
// Auteur: Mathieu Duval et Claudel D. Roy                  |
// Description: Portion jQuery, permet l'accès à la logique |
//              du jeux, les boutons, le temps,             |
//              les statistiques, les animations            |          
//              et la gestion des clicks.                   |
// Date: 2022-04-29                                         |
//-----------------------------------------------------------
//Variables globales pour le jQuery
let minuterie = new Date();
let tmr = null;

$(document).ready(function () {

    //Permet le hover des cartes
    $('.carte').mouseover(function () {
        if ($(this).hasClass('flipper')) {

            $(this).removeClass('agrandirElement');
            $(this).removeClass('rapetisserElement');

        }
        else if (_cartesChoisies == 0) {
            $('.carte').removeClass('flipper');
            $(this).addClass('agrandirElement');
            $(this).removeClass('rapetisserElement');
        }
        else {

            $(this).addClass('agrandirElement');
            $(this).removeClass('rapetisserElement');

        }
    });
    $('.carte').mouseout(function () {
        if ($(this).hasClass('flipper')) {

            $(this).removeClass('agrandirElement');
            $(this).removeClass('rapetisserElement');

        }
        else if (_cartesChoisies == 0) {
            $('.carte').removeClass('flipper');
            $(this).removeClass('agrandirElement');
            $(this).addClass('rapetisserElement');
        }
        else {

            $(this).removeClass('agrandirElement');
            $(this).addClass('rapetisserElement');

        }
    });




    // Section des click-souris sur les CARTES
    $('.carte').click(function () {
        let ligne = this.dataset.ligne;
        let colonne = this.dataset.colonne;


        $('#' + _cartesChoisies[0]).removeClass('flipper');
        $('#' + _cartesChoisies[2]).removeClass('flipper');


        //Ajout de l'ID des cartes choisies ainsi que leur valeur numérique dans un tableau
        _cartesChoisies.push($(this).attr('id'));
        _cartesChoisies.push(_grilleJeu2D[ligne][colonne]);
        


        //Animation/changements pour la carte choisie courante
        $(this).addClass('flipper');
        $(this).removeClass('agrandirElement');
        $(this).removeClass('rapetisserElement');
        $(this).css({
            'background-image': 'url("' + _sourceImg[_grilleJeu2D[ligne][colonne]] + '")',
            'background-color': 'white',
            'transition-delay': '250ms'
        });

        $(this).removeClass('agrandirElement');
        $(this).removeClass('rapetisserElement');

        //Vérification d'un paire de cartes gagnantes à chaque tour.
        if (_cartesChoisies.length == 4) {
            //Chaque passage ici incrémente la statistique "Coups"
            _coups++;
            $('#coups').text(_coups);

            setTimeout(function () {
            
                $('#' + _cartesChoisies[0]).removeClass('flipper');
                $('#' + _cartesChoisies[2]).removeClass('flipper');


                setTimeout(function () {
                    let valide = verifierMatch();


                    if (valide == false) {

                        _erreurs++;
                        $('#erreurs').text(_coups);

                        $(this).removeClass('agrandirElement');
                        $(this).removeClass('rapetisserElement');
                        $('#' + _cartesChoisies[0]).addClass('flipper');
                        $('#' + _cartesChoisies[0]).css({
                            'background-image': 'url("' + _sourceImg[0] + '")',
                            'background-color': 'highlight',
                            'transition-delay': '250ms'
                        });


                        $(this).removeClass('agrandirElement');
                        $(this).removeClass('rapetisserElement');
                        $('#' + _cartesChoisies[2]).addClass('flipper');
                        $('#' + _cartesChoisies[2]).css({
                            'background-image': 'url("' + _sourceImg[0] + '")',
                            'background-color': 'highlight',
                            'transition-delay': '250ms'
                        });

                    }
                    else {
                        _cartesTrouvees.push($(_cartesChoisies[0]).attr('id'));
                        _cartesTrouvees.push($(_cartesChoisies[2]).attr('id'));

                        if (_cartesTrouvees.length == 16) {
                            //Trouve le record pour le nombre de coup
                            if (_recordCoups > _coups) {
                                _recordCoups = _coups;
                                _coups = 0;
                            }
                            else if (_recordCoups == 0) {
                                _recordCoups = _coups;
                                _coups = 0;
                            }
                            else {
                                _recordCoups = _recordCoups;
                                _coups = 0;
                            }

                            $('#recordCoups').text(_recordCoups);
                            $('#Gagner').css({ 'font-size': '30px', 'color': 'green' }).text('Vous avez gagné!');

                            clearInterval(tmr);
                            _temps = (_tempsMinutes + ":" + _tempsSecondes);
                            //Trouve le record pour le temps
                            if (_recordTemps == 0) {
                                _recordTemps = (_tempsMinutes + ":" + _tempsSecondes);
                            }
                            else if (_recordTemps != 0) {
                                if (_recordTemps > _temps) {
                                    _recordTemps = (_tempsMinutes + ":" + _tempsSecondes);
                                }
                                else {
                                    _recordTemps = _recordTemps;
                                }
                            }

                            $('#recordTemps').text(_recordTemps);
                            $('.carte').css('pointer-events', 'none');
                        }

                        $('#' + _cartesChoisies[0]).css('pointer-events', 'none');
                        $('#' + _cartesChoisies[2]).css('pointer-events', 'none');

                    }
                    _cartesChoisies.length = 0;

                }, 600);

            }, 700);
        }
    });


    //Bouton commencer/recommencer
    $('#Commencer').click(function () {
        clearInterval(tmr);
        $('.carte').css('pointer-events', 'auto');

        //Permet d'afficher le temps dans la grille d'options
        function AfficherTemps() {

            let minutes = minuterie.getMinutes();
            let secondes = minuterie.getSeconds();

            minuterie.setSeconds(minuterie.getSeconds() + 1);

            if (minutes < 10) {

                minutes = "0" + minutes;
            }

            if (secondes < 10) {

                secondes = "0" + secondes;
            }

            $('#Temps').html(minutes + ":" + secondes);
            _tempsMinutes = minutes;
            _tempsSecondes = secondes;

        };


        minuterie.setMinutes(0);
        minuterie.setSeconds(0);

        clearInterval(tmr);

        tmr = setInterval(AfficherTemps, 1000);

        //Portion pour recommencer la partie
        $('.carte').load(location.href + ' .carte > *');
        _cartesTrouvees.length = 0;
        _tableValeurs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
        RemplirGrilleJeu();
        $('#coups').text(_coups);
        $('#erreurs').text(_coups);
        $('#Gagner').css({ 'font-size': '35px', 'color': 'green', 'text-align': 'center' }).text('');
        $('.carte').removeClass('agrandirElement');
        $('.carte').removeClass('rapetisserElement');
        $('.carte').removeClass('flipper');
        $('.carte').css({
            'background-image': 'url("' + _sourceImg[0] + '")',
            'background-color': 'highlight',
            'transition-delay': '250ms'
        });


    });


    //Permet de solutionner la partie
    $('#Solutionner').click(function () {
        $('.carte').removeClass('agrandirElement');
        $('.carte').removeClass('rapetisserElement');
        $('.carte').removeClass('flipper');
        for (var ligne = 0; ligne < LIGNES; ligne++) {
            for (var colonne = 0; colonne < COLONNES; colonne++) {
                $('[data-ligne="' + ligne + '"][data-colonne="' + colonne + '"]').addClass('flipper');
                $('[data-ligne="' + ligne + '"][data-colonne="' + colonne + '"]').css({

                    'background-image': 'url("' + _sourceImg[_grilleJeu2D[ligne][colonne]] + '")',
                    'background-color': 'white',
                    'transition-delay': '200ms'
                });
            }
        }
        $('.carte').css('pointer-events', 'none');

    });

});



