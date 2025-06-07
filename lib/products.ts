"use client"

import { useState, useEffect } from 'react';

export interface Product {
  id: string | number
  slug: string
  naziv: string
  cijena: number
  staraCijena?: number
  opis: string
  puniOpis: string
  kategorije: string[]
  slika: string
  slike: string[]
  ocjena: number
  brojRecenzija: number
  karakteristike: string[]
  dimenzije: { naziv: string; vrijednost: string }[]
  boje: { naziv: string; hex: string }[]
  materijali: string[]
  uputstvaZaNjegu: string
  recenzije: {
    autor: string
    ocjena: number
    datum: string
    sadrzaj: string
  }[]
  jeNov?: boolean
  istaknut?: boolean
}

// Sample product data
const products: Product[] = [
  // ----------------------------------------
  // Stolice
  // ----------------------------------------

  // Oslo Lounge Chair
  {
    id: 1,
    slug: 'oslo-stolica',
    naziv: "Oslo Stolica",
    cijena: 1299,
    staraCijena: 1499,
    opis: "Udobna stolica sa drvenom osnovom i kožnim materijalom.",
    puniOpis:
      "Oslo Stolica kombinira udobnost sa skandinavskim dizajnerskim principima. Drvena osnova pruža trajnost i stabilnost, dok kožni materijal pruža udobnost i stil. Stolica ima ergonomski dizajn koji osigurava pravilnu podršku za duže vremena sjedenja, čini je savršenom za čitanje, razgovor ili jednostavno odmor.",
    kategorije: ["stolica"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    ocjena: 4.8,
    brojRecenzija: 124,
    karakteristike: [
      "Drvena osnova za trajnost",
      "Premium kožni materijal",
      "Ergonomski dizajn za pravilnu podršku",
      "Mogućnost uklanjanja krovnih materijala za lako čišćenje",
      "Dostupna u više boja",
    ],
    dimenzije: [
      { naziv: "Širina", vrijednost: "75 cm" },
      { naziv: "Dubina", vrijednost: "82 cm" },
      { naziv: "Visina", vrijednost: "86 cm" },
      { naziv: "Visina sjedala", vrijednost: "42 cm" },
      { naziv: "Visina ruku", vrijednost: "60 cm" },
      { naziv: "Težina", vrijednost: "18 kg" },
    ],
    boje: [
      { naziv: "Svijetlo siva", hex: "#D3D3D3" },
    ],
    materijali: ["Drvena osnova"],
    uputstvaZaNjegu:
      "Vakuumirajte redovito koristeći nizak vakuum. Lokalno čistite s malim, vodotopivim rješenjem ili suhim čišćenjem. Izbjegavajte postavljanje u direktnu sunčevu svjetlost kako bi se spriječio pucanje. Fluff cushions regularly to maintain shape.",
    recenzije: [
      {
        autor: "Ema.",
        ocjena: 5,
        datum: "March 15, 2025",
        sadrzaj:
          "Ova stolica je apsolutno savršena! Kvaliteta je izvanredna, i još je udobnija od očekivanja. Savršeno se uklapa u moju dnevnu sobu i već brzo postala najdraža mjesta za sjedenje.",
      },
      {
        autor: "Mihajlo",
        ocjena: 4,
        datum: "February 28, 2025",
        sadrzaj:
          "Odlična stolica sa izvrsnom kvalitetom. Kožni materijal je prekrasan i osjeća se trajnim. Samo 4 zvjezdice jer je sastavljanje bilo malo komplicirano, ali rezultat je vrijedan.",
      },
      {
        autor: "Sara.",
        ocjena: 5,
        datum: "January 10, 2025",
        sadrzaj:
          "Imam ovo stolice već mjesec dana i volim je. Dizajn je vremenski nepromijenjen i udobnost je izvanredna. Preporučam!",
      },
    ],
    istaknut: true
  },

  // Copenhagen Armchair
  {
    id: 7,
    slug: 'kopenhagen-stolica',
    naziv: "Kopenhagen Stolica",
    cijena: 1099,
    opis: "Elegant stolica sa drvenim nogu i premium linijem materijalom.",
    puniOpis:
      "Kopenhagen Stolica predstavlja skandinavski dizajn sa svojim čistim linijama, organičnim oblicima i fokusom na obožavanje i funkcionalnost. Elegantno zakrivljeni oblik stolice stvara impresivan profil iz svakog kuta, dok premium linijski materijal dodaje teksturu i toplinu. Podržan solidnim drvenim nogu koje pružaju stabilnost i vizualnu lakost, ova stolica pruža izvanrednu udobnost bez kompromisa sa stilom. Savršena kao dodirna komada ili u paru sa Malmo Sofa, Kopenhagen Stolica donosi elegantnu eleganciju u bilo koji prostor.",
    kategorije: ["stolica"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    ocjena: 4.7,
    brojRecenzija: 83,
    karakteristike: [
      "Ergonomski zakrivljeni dizajn za maksimalnu udobnost",
      "Premium linijski materijal",
      "Solid drvene nogu sa prirodnim finish",
      "Visoka gustoća pene za udobnost",
      "Okvir za trajnost",
      "Neoznačiva podna ploča za zaštitu podova",
    ],
    dimenzije: [
      { naziv: "Širina", vrijednost: "75 cm" },
      { naziv: "Dubina", vrijednost: "80 cm" },
      { naziv: "Visina", vrijednost: "85 cm" },
      { naziv: "Visina sjedala", vrijednost: "45 cm" },
      { naziv: "Dubina sjedala", vrijednost: "55 cm" },
      { naziv: "Visina ruku", vrijednost: "65 cm" },
      { naziv: "Težina", vrijednost: "15 kg" },
    ],
    boje: [
      { naziv: "Linijski materijal", hex: "#F0E9E0" },
      { naziv: "Tamna siva", hex: "#36454F" },
      { naziv: "Svijetla siva", hex: "#8DA9C4" },
      { naziv: "Svijetla siva", hex: "#708238" },
    ],
    materijali: ["Drvena osnova", "Premium Linijski materijal", "Visoka gustoća pene", "Okvir"],
    uputstvaZaNjegu:
      "Vakuumirajte redovito koristeći nizak vakuum. Lokalno čistite s malim, vodotopivim rješenjem ili suhim čišćenjem. Professional cleaning recommended for overall soiling. Avoid placing in direct sunlight to prevent fabric fading. Treat any spills immediately by blotting (not rubbing) with a clean, dry cloth.",
    recenzije: [
      {
        autor: "Natalija.",
        ocjena: 5,
        datum: "March 20, 2025",
        sadrzaj:
          "Ova stolica je umjetnički rad! Vrlo udobna i linijski materijal je prekrasan. Drvena noga dodaje toplinu. Postala je moja omiljena mjesta za čitanje u kući.",
      },
      {
        autor: "Jovan.",
        ocjena: 4,
        datum: "February 15, 2025",
        sadrzaj:
          "Odlična stolica sa izvrsnom pažnjom za detalje. Zakrivljeni dizajn pruža odličnu podršku za natrag. Jedina razloga za 5 zvjezdice je da je sastavljanje bilo malo komplicirano.",
      },
      {
        autor: "Emilija.",
        ocjena: 5,
        datum: "January 28, 2025",
        sadrzaj:
          "Apsolutno volim ovu stolicu! Linijski materijal je prekrasan i osjeća se vrlo visoke kvalitete. Savršena veličina - dovoljno velika da bude udobna, ali ne i prevelika da preoptereti prostor.",
      },
    ],
    jeNov: true
  },

  // ----------------------------------------
  // Stolovi
  // ----------------------------------------

  // Bergen Dining Table
  {
    id: 2,
    slug: 'bergen-stol',
    naziv: "Bergen Stol",
    cijena: 1899,
    staraCijena: 2199,
    opis: "Prošireni stol sa drvenom osnovom i prirodnim finishom.",
    puniOpis:
      "Bergen Stolovl je izrađen od drvene osnove i ima prirodni finish koji istakne lepinu drveta. Stol ima glatke rubove i minimalistički dizajn koji ga čini fleksibilnim komadom koji se uklapa u različite interijske stile. Proširena funkcija omogućuje vam da primijenite dodatne goste kada je potrebno, čini ga savršenim za svakodnevnu jelovnicu i posebne prilike.",
    kategorije: ["stol"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    ocjena: 4.7,
    brojRecenzija: 89,
    karakteristike: [
      "Drvena osnova za trajnost",
      "Prirodni finish koji istakne lepinu drveta",
      "Glatki rubovi i minimalistički dizajn",
      "Proširena funkcija za dodatne goste",
      "Savršen za svakodnevnu jelovnicu i posebne prilike",
    ],
    dimenzije: [
      { naziv: "Širina", vrijednost: "180 cm" },
      { naziv: "Dubina", vrijednost: "90 cm" },
      { naziv: "Visina", vrijednost: "75 cm" },
      { naziv: "Težina", vrijednost: "45 kg" },
    ],
    boje: [
      { naziv: "Prirodno drvo", hex: "#8B4513" },
      { naziv: "Tamno drvo", hex: "#654321" },
    ],
    materijali: ["Drvena osnova", "Prirodni finish"],
    uputstvaZaNjegu:
      "Čistite površinu stola blagim, vlažnim krpom. Izbjegavajte postavljanje vrućih predmeta direktno na površinu. Koristite podloge za zaštitu površine. Redovno održavanje drvene površine sa odgovarajućim sredstvima za drvo.",
    recenzije: [
      {
        autor: "Marko.",
        ocjena: 5,
        datum: "March 10, 2025",
        sadrzaj:
          "Odličan stol! Kvaliteta je izvanredna, a prirodni finish je prekrasan. Proširena funkcija je odlična za porodične večere.",
      },
      {
        autor: "Ana.",
        ocjena: 4,
        datum: "February 5, 2025",
        sadrzaj:
          "Stol je prekrasan i savršeno se uklapa u našu trpezariju. Samo 4 zvjezdice jer je sastavljanje bilo malo komplicirano.",
      },
    ],
    istaknut: true
  },

  // Fjord Desk
  {
    id: 4,
    slug: 'fjord-stol',
    naziv: "Fjord Stol",
    cijena: 1199,
    opis: "Minimalistički stol sa kabelskim upravljanjem i prilagodljivom visinom.",
    puniOpis:
      "Fjord Stol kombinira funkcionalnost sa elegantnim dizajnom, čini ga savršenim radnim prostorom za modernu kuću ili uređaj. Minimalistički estetski dizajn ima čiste linije i elegantan profil, dok je pažljivi dizajn uključuje praktične elemente kao što je integrirani kabelski upravljački sistem kako bi se održao vaš radni prostor uređen. Funkcija prilagodljive visine omogućuje vam da prilagodite stol na svoju savršenu radnu poziciju, promovirajući bolju podršku i udobnost tijekom dugih radnih sesija.",
    kategorije: ["stol"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    ocjena: 4.6,
    brojRecenzija: 58,
    karakteristike: [
      "Električna prilagodljiva visina (70-120 cm)",
      "Integrirani kabelski upravljački sistem",
      "Drvena osnova sa prirodnim finish",
      "Memory settings for preferred heights",
      "Skrivena skočna ploča za male stavke",
      "Anti-collision tehnologija",
    ],
    dimenzije: [
      { naziv: "Širina", vrijednost: "140 cm" },
      { naziv: "Dubina", vrijednost: "70 cm" },
      { naziv: "Visina", vrijednost: "70-120 cm (prilagodljiva)" },
      { naziv: "Dimenzije skočne ploče", vrijednost: "30 cm x 40 cm x 5 cm" },
      { naziv: "Težina", vrijednost: "35 kg" },
    ],
    boje: [
      { naziv: "Drvena osnova - svijetla", hex: "#FFFFFF" },
      { naziv: "Drvena osnova - tamna", hex: "#000000" },
      { naziv: "Drvena osnova - tamna", hex: "#000000" },
    ],
    materijali: ["Drvena osnova", "Čelični okvir", "Premium elektronika"],
    uputstvaZaNjegu:
      "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Za čelični okvir, koristite mali količinu staklenog čističa. Izbjegavajte vodu i provjerite kabelske veze redovito.",
    recenzije: [
      {
        autor: "Marko.",
        ocjena: 5,
        datum: "April 10, 2025",
        sadrzaj:
          "Ovaj stol je potpuno transformirao moj kućni uređaj. Prilagodljiva visina je glatka i tiha, i kabelski upravljački sistem čuva sve uređene. Vrijedan svake marke!",
      },
      {
        autor: "Lara.",
        ocjena: 4,
        datum: "March 5, 2025",
        sadrzaj:
          "Prekrasan stol sa izvrsnom funkcionalnošću. Drvena osnova je prekrasna i prilagodljiva visina radi savršeno. Jedina razloga za 4 zvjezdice je da je sastavljanje bilo malo komplicirano.",
      },
      {
        autor: "Jovan.",
        ocjena: 5,
        datum: "February 20, 2025",
        sadrzaj:
          "Nakon korištenja ovog stola mjesec dana, mogu sigurno reći da je jedan od najboljih kupnji koje sam napravila. Mogućnost prebacivanja između sjedenja i stojećeg položaja pomoći mi je mnogo u smanjenju bolova u leđima.",
      },
    ],
  },

  // ----------------------------------------
  // BEDS
  // ----------------------------------------

  // Stockholm Bed Frame
  {
    id: 3,
    slug: 'stockholm-krevet',
    naziv: "Stockholm Krevet",
    cijena: 2499,
    opis: "King-size krevet sa integriranim noćnim stolovima i LED osvjetljenjem.",
    puniOpis:
      "Stockholm krevet redefiniše luksuz spavaće sobe svojim elegantnim dizajnom i pažljivo osmišljenim detaljima. Izrađen od vrhunskih materijala, ovaj bračni krevet sadrži integrisane noćne ormariće koji nude praktičan prostor za odlaganje, a istovremeno održavaju čist i skladan izgled. Suptilna LED rasvjeta stvara toplu atmosferu, idealnu za večernje čitanje ili opuštanje. Platformska konstrukcija eliminiše potrebu za boks oprugom, pružajući direktnu podršku dušeku za maksimalnu udobnost.",
    kategorije: ["krevet"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    ocjena: 4.9,
    brojRecenzija: 76,
    karakteristike: [
      "Integrirani noćni stolovi sa soft-close skočnim pločama",
      "Integrirano LED osvjetljenje sa dimmer upravljanjem",
      "Drvena osnova sa veneer finish",
      "Platforma dizajn - nema potrebe za boks oprugom",
      "Kabelski upravljački sistem za punjenje uređaja",
      "Prilagodljiva glava visina",
    ],
    dimenzije: [
      { naziv: "Širina", vrijednost: "200 cm" },
      { naziv: "Dužina", vrijednost: "220 cm" },
      { naziv: "Visina", vrijednost: "100 cm (glava)" },
      { naziv: "Širina noćnog stola", vrijednost: "40 cm (svaki)" },
      { naziv: "Visina platforme", vrijednost: "35 cm" },
    ],
    boje: [
      { naziv: "Drvena osnova - svijetla", hex: "#5C4033" },
      { naziv: "Drvena osnova - tamna", hex: "#D2B48C" },
      { naziv: "Drvena osnova - tamna", hex: "#292929" },
    ],
    materijali: ["Solid Oak", "Oak Veneer", "Premium Hardware"],
    uputstvaZaNjegu:
      "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    recenzije: [
      {
        autor: "Jelena.",
        ocjena: 5,
        datum: "March 30, 2025",
        sadrzaj:
          "Ovaj krevet je potpuno transformirao našu cijelu spavaću sobu! Integrirani noćni stolovi spašavaju mnogo prostora, i LED osvjetljenje stvara savršenu atmosferu za čitanje noću. Izvrsno zadovoljni sa ovom kupnjom.",
      },
      {
        autor: "Jovan.",
        ocjena: 5,
        datum: "February 12, 2025",
        sadrzaj:
          "Izvrsna kvaliteta i dizajn. Sastavljanje je trajalo neko vrijeme, ali instrukcije su bile jasne. Integrirano osvjetljenje je tako pametan detalj, i noćni stolovi su dovoljno prostori za sve moje noćne potrebe.",
      },
      {
        autor: "Lara.",
        ocjena: 4,
        datum: "January 25, 2025",
        sadrzaj:
          "Elegantan krevet koji se osjeća vrlo luksuzan. Jedina razloga za 4 zvjezdice je da je jedan od LED osvjetljenja imao problem, ali klijentska podrška je poslala zamjenski dio brzo.",
      },
    ],
  },

  // ----------------------------------------
  // SOFAS
  // ----------------------------------------

  // Malmo Sofa
  {
    id: 6,
    slug: 'malmo-ugaona-garnitura',
    naziv: "Malmo Ugaona garnitura",
    cijena: 2999,
    opis: "Tri-seater ugaona garnitura sa dubokim sjedalima i pufnim kancelijama za maksimalnu udobnost.",
    puniOpis:
      "Malmo Ugaona garnitura kombinira savremeni dizajn sa izvrsnom udobnošću, stvarajući savršeni centar za vaš životni prostor. Njegove generozne proporcije i duboke sjedala pozivaju na odmor, dok pufne kancelije nude savršenu ravnotežu između podrške i mekšine. Čiste linije i podignute noge daju ovom ugaonici svjetlu, vazdušnu izgled iako je velika. Obojena u premium materijal, Malmo je i lep i trajna, dizajnirana da održava svoj izgled i udobnost godinama.",
    kategorije: ["ugaona-garnitura"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    ocjena: 4.8,
    brojRecenzija: 115,
    karakteristike: [
      "Ugaona garnitura sa generoznim proporcijama",
      "Duboka sjedala (65 cm) za maksimalnu udobnost",
      "Pufne kancelije sa visokom elastičnošću",
      "Drvena osnova za trajnost",
      "Mijenjajuća i obrnuta sjedala",
      "Stain-resistant tkanina",
      "Podignute noge za lako čišćenje ispod",
    ],
    dimenzije: [
      { naziv: "Širina", vrijednost: "220 cm" },
      { naziv: "Dubina", vrijednost: "95 cm" },
      { naziv: "Visina", vrijednost: "85 cm" },
      { naziv: "Visina sjedala", vrijednost: "45 cm" },
      { naziv: "Dubina sjedala", vrijednost: "65 cm" },
      { naziv: "Visina ruku", vrijednost: "65 cm" },
      { naziv: "Visina noge", vrijednost: "15 cm" },
    ],
    boje: [
      { naziv: "Svetlo siva", hex: "#D3D3D3" },
      { naziv: "Tamna siva", hex: "#696969" },
      { naziv: "Navy plava", hex: "#000080" },
      { naziv: "Bež", hex: "#F5F5DC" },
      { naziv: "Siva", hex: "#9CAF88" }, 
    ],
    materijali: ["Drvena osnova", "Pufna osnova", "Pufna kancelija", "Premium tkanina"],
    uputstvaZaNjegu:
      "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    recenzije: [
      {
        autor: "Tomaš.",
        ocjena: 5,
        datum: "April 5, 2025",
        sadrzaj:
          "Ova ugaona garnitura je apsolutno izvrsna! Savršena je kombinacija stila i udobnosti. Duboka sjedala su savršena za odmor s knjigom, i tkanina se osjeća luksuzna i trajna. Svi koji posjećuju komentiraju kako je lep.",
      },
      {
        autor: "Lara.",
        ocjena: 4,
        datum: "March 12, 2025",
        sadrzaj:
          "Vrlo udobna ugaona garnitura sa izvrsnom kvalitetom. Pufne kancelije su savršena ravnoteža između mekšine i podrške. Jedina razloga za 4 zvjezdice umjesto 5 je da je boja malo drugačija nego što je bila na slikama.",
      },
      {
        autor: "Jovan.",
        ocjena: 5,
        datum: "February 28, 2025",
        sadrzaj:
          "Vrijedan svake marke! Ova ugaona garnitura je potpuno transformirala naš životni prostor i postala svima najdraži mjesto. Tkanina je održava lep i čak i sa dječjima i psima. Nije moguće bolje zadovoljstvo sa ovom kupnjom.",
      },
    ],
  },

  // ----------------------------------------
  // PANEL FURNITURE
  // ----------------------------------------

  {
    id: 8,
    slug: 'gothenburg-ugaona-garnitura',
    naziv: "Gothenburg Ugaona garnitura",
    cijena: 3499,
    opis: "Vremenski otporni ugaoni namještaj za vanjski odmor.",
    puniOpis:
      "Gothenburg Ugaona garnitura donosi eleganciju i kvalitetu unutarnjeg namještaja na vaš vanjski prostor. Ovaj kompletan ugaoni namještaj uključuje stol, i šest stolica, sve izrađene od vremenski otpornih materijala dizajniranih da izdrže elemente dok održavaju svoju ljepotu. Minimalistički skandinavski dizajn ima čiste linije i neutralnu paletu boja koja se uklapa u bilo koji vanjski prostor. Savršen za alfresco jelo, zabavu, ili jednostavno uživanje u jutarnjem kafiću u svježem zraku, ova garnitura kombinira stil, udobnost i trajnost.",
    kategorije: ["ugaona-garnitura"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    ocjena: 4.5,
    brojRecenzija: 67,
    karakteristike: [
      "Vremenski otporni materijali",
      "Kompletan set uključuje stol i šest stolica",
      "Minimalistički skandinavski dizajn",
      "Čiste linije i neutralna paleta boja",
      "Savršen za vanjski odmor",
    ],
    dimenzije: [
      { naziv: "Širina garniture", vrijednost: "180 cm" },
      { naziv: "Dubina garniture", vrijednost: "90 cm" },
      { naziv: "Visina garniture", vrijednost: "75 cm" },
      { naziv: "Širina garniture", vrijednost: "75 cm" },
      { naziv: "Dubina garniture", vrijednost: "80 cm" },
      { naziv: "Visina garniture", vrijednost: "85 cm" },
      { naziv: "Težina", vrijednost: "120 kg" },
    ],
    boje: [
      { naziv: "Natural Oak", hex: "#D2B48C" },
      { naziv: "Smoked Oak", hex: "#8B4513" },
      { naziv: "White Oak", hex: "#F5F5F5" },
    ],
    materijali: ["Vremenski otporni drvo", "Vremenski otporni tkanina"],
    uputstvaZaNjegu:
      "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    recenzije: [
      {
        autor: "Tomaš.",
        ocjena: 5,
        datum: "April 15, 2025",
        sadrzaj:
          "Ova vanjska garnitura je promjena! Izvrsna je udobnost i materijali su izvrsni. Savršen za naše ljetne sastanke.",
      },
      {
        autor: "Jovan.",
        ocjena: 4,
        datum: "March 22, 2025",
        sadrzaj:
          "Lep garnitura sa izvrsnom kvalitetom. Vremenski otporni materijali su ogroman plus. Samo 4 zvjezdice jer sastavljanje nije bilo baš jednostavno.",
      },
      {
        autor: "Lara.",
        ocjena: 5,
        datum: "February 17, 2025",
        sadrzaj:
          "Vrijedan svake marke! Ova vanjska garnitura je postala naša najdraža mjesta za ljetne barbecue. Dizajn je elegantan i materijali su trajni.",
      },
    ],
  },
  {
    id: 9,
    slug: 'helsingborg-kafe-stol',
    naziv: "Helsingborg Kafe stol",
    cijena: 799,
    opis: "Minimalistički kafe stol sa maram površinom i drvenim nogu.",
    puniOpis: "Helsingborg Kafe stol kombinira luksuz i minimalizam sa svojom stolovnom površinom od marama i drvenim nogu. Stolovi su čisti i kombiniraju različite materijale, stvarajući sofisticirani centar za bilo koju dnevnu sobu. Posebno odabrana marama površina ima jedinstvene prirodne uzorke, dok drvene nogu pružaju stabilnu podršku i topli kontrast.",
    kategorije: ["stol"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    ocjena: 4.6,
    brojRecenzija: 45,
    karakteristike: [
      "Prirodna maram površina",
      "Drvena osnova",
      "Zaštitni felt pads",
      "Jednostavan sastavljanje",
      "Stain-resistant marble coating"
    ],
    dimenzije: [
      { naziv: "Širina", vrijednost: "120 cm" },
      { naziv: "Dubina", vrijednost: "60 cm" },
      { naziv: "Visina", vrijednost: "45 cm" },
      { naziv: "Težina", vrijednost: "35 kg" }
    ],
    boje: [
      { naziv: "White Marble/Natural Oak", hex: "#FFFFFF" },
      { naziv: "Black Marble/Natural Oak", hex: "#000000" }
    ],
    materijali: ["Marble", "Solid Oak"],
    uputstvaZaNjegu: "Očistite maram površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    recenzije: [
      {
        autor: "Sofija N.",
        ocjena: 5,
        datum: "March 28, 2025",
        sadrzaj: "Lep kafe stol! Maram površina je impresivan i drvena osnova ga savršeno dopunjuje. Vrlo stabilan i dobro izrađen."
      },
      {
        autor: "Jovan.",
        ocjena: 4,
        datum: "February 15, 2025",
        sadrzaj: "Izvrsna kvaliteta i izgleda upravo kao na slici. Sastavljanje je bilo jednostavno. Samo 4 zvjezdice jer je teži nego što sam očekivao."
      }
    ]
  },
  {
    id: 10,
    slug: 'kiruna-stol-s-lampom',
    naziv: "Kiruna stol s lampom",
    cijena: 349,
    staraCijena: 449,
    opis: "Prilagodljivi stol sa lampom sa brončanim detaljima i tkanom šeširom.",
    puniOpis: "Kiruna stol s lampom kombinira funkcionalnost sa elegantnim dizajnom. Prilagodljiva ruka i visina omogućuju savršenu poziciju, dok su brončani detalji dodaju dodir luksuzu. Prirodna tkanina šešira raspršuje svjetlost savršeno, stvarajući topli i upijajući atmosferu u bilo kojoj sobi.",
    kategorije: ["stol"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    ocjena: 4.8,
    brojRecenzija: 56,
    karakteristike: [
      "Prilagodljiva ruka i visina",
      "Brončani detalji",
      "LED kompatibilan",
      "Integrirana dimmerska sklopka"
    ],
    dimenzije: [
      { naziv: "Širina osnove", vrijednost: "30 cm" },
      { naziv: "Širina šešira", vrijednost: "45 cm" },
      { naziv: "Maksimalna visina", vrijednost: "180 cm" },
      { naziv: "Dužina kabela", vrijednost: "200 cm" }
    ],
    boje: [
      { naziv: "Prirodna boja drveta/Brončani", hex: "#F5F5DC" },
      { naziv: "Siva boja drveta/Brončani", hex: "#808080" }
    ],
    materijali: ["Brončani", "Drvena osnova", "Čelična osnova"],
    uputstvaZaNjegu: "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    recenzije: [
      {
        autor: "Sofija N.",
        ocjena: 5,
        datum: "April 1, 2025",
        sadrzaj: "Ova lampa je i lepa i funkcionalna. Prilagodljiva ruka je savršena za čitanje, i dimmerska sklopka dodaje odličnu atmosferu."
      },
      {
        autor: "Jovan.",
        ocjena: 4,
        datum: "March 10, 2025",
        sadrzaj: "Izvrsna kvaliteta i dizajn. Brončani detalji su impresivan. Sastavljanje je bilo malo komplicirano, ali vrijedno."
      }
    ]
  },
  {
    id: 11,
    slug: 'luleå-strana-stol',
    naziv: "Luleå strana stol",
    cijena: 399,
    opis: "Stol sa skrivenim skladištenjem",
    puniOpis: "Luleå strana stol je pametan rješenje za modernu život, kombinirajući stil sa funkcionalnošću. Skriveni prostor za skladištenje je savršen za održavanje uređaja u životnom prostoru, dok su čiste linije i kombinacija materijala stvaraju kontemporistični dizajn koji radi u bilo kojoj sobi.",
    kategorije: ["stol"],
    slika: "/placeholder.svg?height=600&width=600",
    slike: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    ocjena: 4.7,
    brojRecenzija: 38,
    karakteristike: [
      "Skriveni prostor za skladištenje",
      "Mehanički zatvori",
      "Anti-tip dizajn",
      "Felt-lined storage",
      "Ne-markirajuće noge"
    ],
    dimenzije: [
      { naziv: "Širina", vrijednost: "45 cm" },
      { naziv: "Visina", vrijednost: "55 cm" },
      { naziv: "Dubina skladištenja", vrijednost: "15 cm" },
      { naziv: "Težina", vrijednost: "8 kg" }
    ],
    boje: [
      { naziv: "Bijela/Prirodna drvena osnova", hex: "#FFFFFF" },
      { naziv: "Crna/Prirodna drvena osnova", hex: "#000000" },
      { naziv: "Siva/Prirodna drvena osnova", hex: "#9CAF88" }
    ],
    materijali: ["Drvena osnova", "Površinsko obojena čelična osnova", "Felt"],
    uputstvaZaNjegu: "Očistite drvenu površinu s malim, vodotopivim rješenjem ili suhim čišćenjem ako je potrebno. Sušite odmah s malim, tvrdim čističem. Izbjegavajte postavljanje kreveta direktno na sunce kako bi se spriječio pucavost. Provjerite i zategnite hardware redovito.",
    recenzije: [
      {
        autor: "Sofija N.",
        ocjena: 5,
        datum: "March 20, 2025",
        sadrzaj: "Savršena veličina i skriveni prostor je super koristan! Soft-close mehanizam je lijep dodir. Veoma zadovoljan sa ovom kupnjom."
      },
      {
        autor: "Jovan.",
        ocjena: 4,
        datum: "February 5, 2025",
        sadrzaj: "Odličan mali stol sa pametnim skladištenjem. Sastavljanje je bilo jednostavno i kvaliteta je izvrsna."
      }
    ]
  },

]

export const getAllProducts = (): Product[] => {
  return products
}

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id)
}

export const getRelatedProducts = (id: number): Product[] => {
  const product = getProductById(id)
  if (!product) return []
  return products.filter((p) => p.kategorije[0] === product.kategorije[0] && p.id !== id).slice(0, 4)
}

export async function fetchProductJsonFiles(): Promise<string[]> {
  // Hardcoded list of product JSON files
  return ["garniture.json", "kreveti.json", "stolice.json", "tdf.json"];
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function normalizeProductData(product: any): Product {
  return {
    id: product.id,
    slug: product.slug || slugify(product.naziv),
    naziv: product.naziv,
    cijena: product.cijena,
    staraCijena: product.staraCijena,
    opis: product.opis,
    puniOpis: product.puniOpis || product.opis,
    kategorije: product.kategorije || [],
    slika: product.slike?.[0] || "",
    slike: product.slike || [],
    ocjena: product.ocjena || 0,
    brojRecenzija: product.brojRecenzija || 0,
    karakteristike: product.karakteristike || [
      product.materijal,
      product.funkcijaRazvlacenja,
      product.prostorZaOdlaganje,
      product.stranaGarniture,
      product.dostava,
      product.napomena
    ].filter(Boolean),
    dimenzije: product.dimenzije ? (
      typeof product.dimenzije === 'string' 
        ? [{ naziv: "Dimenzije", vrijednost: product.dimenzije }]
        : product.dimenzije
    ) : [],
    boje: product.boje || [],
    materijali: product.materijali || [product.materijal].filter(Boolean),
    uputstvaZaNjegu: product.uputstvaZaNjegu || "",
    recenzije: product.recenzije || [],
    jeNov: product.novi || product.jeNov || false,
    istaknut: product.istaknut || false
  };
}

export async function fetchAllProducts(): Promise<any[]> {
  try {
    const files = await fetchProductJsonFiles()
    const products = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(`/products/${file}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch product file: ${file}`)
        }
        const data = await response.json()
        return Array.isArray(data) ? data.map(normalizeProductData) : []
      })
    )
    return products.flat()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts()
        setProducts(data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return { products, loading, error }
}
