// ================= MÉMOIRE DU CIEL =================

let ciel = JSON.parse(localStorage.getItem("naos-ciel"));

if (!ciel) {
    ciel = {
        fond: [],
        poemes: [],
        lus: []
    };
}


// ================= ÉTOILES DE FOND =================

for (let i = 0; i < 90; i++) {

    let star = document.createElement("div");
    star.classList.add("etoile", "normal");

    // Première visite : création des positions
    if (!ciel.fond[i]) {

        ciel.fond[i] = {

            top: Math.random() * 100,
            left: Math.random() * 100,

            duree: 2 + Math.random() * 4,
            delai: Math.random() * 5

        };

    }

    star.style.top = ciel.fond[i].top + "vh";
    star.style.left = ciel.fond[i].left + "vw";

    star.style.animationDuration = ciel.fond[i].duree + "s";
    star.style.animationDelay = ciel.fond[i].delai + "s";

    document.body.appendChild(star);

}


// ================= ÉTOILES DES POÈMES =================

const nombreEtoiles = poemes.length;

for (let i = 0; i < nombreEtoiles; i++) {

    let star = document.createElement("div");
    star.classList.add("etoile", "poeme");

    // Première visite : création des positions
    if (!ciel.poemes[i]) {

        let top;
        let left;

        do {

            top = 10 + Math.random() * 80;
            left = 10 + Math.random() * 80;

        } while (left > 70 && top < 30);

        ciel.poemes[i] = {
            top: top,
            left: left
        };

    }

    star.style.top = ciel.poemes[i].top + "vh";
    star.style.left = ciel.poemes[i].left + "vw";

    // Si le poème a déjà été lu
    if (ciel.lus[i]) {
        star.classList.add("lu");
    }

    star.addEventListener("click", function () {

        document.getElementById("titre-poeme").textContent = poemes[i].titre;
        document.getElementById("texte-poeme").textContent = poemes[i].texte;
        document.getElementById("date-poeme").textContent = poemes[i].date;
        
        document.getElementById("popup").style.display = "block";
        document.getElementById("voile").style.opacity = "1";

        star.classList.add("lu");

        // On mémorise que ce poème a été lu
        ciel.lus[i] = true;

        // Sauvegarde immédiate
        localStorage.setItem(
            "naos-ciel",
            JSON.stringify(ciel)
        );

    });

    document.body.appendChild(star);

}


// ================= SAUVEGARDE DU CIEL =================

localStorage.setItem(
    "naos-ciel",
    JSON.stringify(ciel)
);


// ================= FERMETURE =================

function fermer() {

    document.getElementById("popup").style.display = "none";
    document.getElementById("voile").style.opacity = "0";

}